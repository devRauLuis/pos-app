import { Box, Button, Skeleton, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';

import FormikTextField from 'components/common/FormikTextField';
import { IProduct } from 'models';
import { ProductSchema } from 'schemas';
import { css } from '@emotion/react';
import { db } from 'firebase-config';
import { formatProduct } from 'utils';
import { toast } from 'react-toastify';
import ProductFormFields from './ProductFormFields';

export default function AddProduct() {
	const handleSubmit = async (
		values: IProduct,
		{ setSubmitting, resetForm }: FormikHelpers<IProduct>
	) => {
		try {
			const docRef = await addDoc(
				collection(db, 'products'),
				formatProduct({ ...values, createdAt: serverTimestamp() })
			);
			console.log('docRef:', docRef);
			toast.success('Se guardo el producto correctamente');
			resetForm();
		} catch (e) {
			console.log(e);
			resetForm();
			toast.error('Error guardando el producto');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Box sx={{ p: 5 }}>
			<Typography variant='h2' noWrap>
				Agregar producto
			</Typography>
			<Box sx={{ mt: 3 }}>
				<Formik
					initialValues={{} as IProduct}
					onSubmit={handleSubmit}
					validationSchema={ProductSchema}>
					{({ isValid, submitForm, isSubmitting }) => (
						<Form
							css={css`
								display: flex;
								flex-direction: column;
								gap: 20px;
								width: 50%;
							`}>
							<ProductFormFields />
							<Button
								disabled={!isValid || isSubmitting}
								variant='contained'
								size='large'
								onClick={submitForm}>
								Agregar
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);
}

