import {
	Autocomplete,
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
	AutocompleteRenderInputParams,
	TextField,
	Typography,
} from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import {
	UseSearchBoxProps,
	useInfiniteHits,
	useSearchBox,
} from 'react-instantsearch-hooks';

import { Box } from '@mui/system';
import { addToCart } from 'store/checkout/checkout.slice';
import { useAppDispatch } from 'store/hooks';
import useDebounce from 'hooks/useDebounce';

interface AutocompleteSearchBoxProps extends UseSearchBoxProps {
	placeholder?: string;
	className?: string;
}

const AutocompleteSearchBox: FunctionComponent<AutocompleteSearchBoxProps> = (
	props
) => {
	const { query, refine, isSearchStalled } = useSearchBox(props);
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState(query);
	const { hits } = useInfiniteHits();
	const debouncedValue = useDebounce(inputValue);
	const dispatch = useAppDispatch();
	const handleChange = (
		event: React.SyntheticEvent<Element, Event>,
		value: any | null,
		reason: AutocompleteChangeReason,
		details?: AutocompleteChangeDetails<any> | undefined
	) => {
		console.log('handleChange', event, value, reason, details);
		if (
			event.type === 'keydown' &&
			(event as React.KeyboardEvent).key === 'Backspace' &&
			reason === 'removeOption'
		) {
			return;
		}
		dispatch(addToCart(value));
		setValue(null);
	};

	useEffect(() => {
		if (query !== debouncedValue) {
			refine(debouncedValue);
		}
	}, [debouncedValue, refine]);

	return (
		<Autocomplete
			fullWidth
			autoHighlight
			clearOnBlur
			size='small'
			value={value}
			noOptionsText='No products found'
			onChange={handleChange}
			options={
				hits.sort((a, b) =>
					(a.category as string).localeCompare(b.category as string)
				) || []
			}
			groupBy={(option) => option.category}
			renderOption={(props, option, { selected }) => (
				<li {...props}>
					<Box>
						<Box>
							<Typography>{option.name}</Typography>
						</Box>
					</Box>
				</li>
			)}
			getOptionLabel={(option) => option.name}
			renderInput={(params: AutocompleteRenderInputParams) => (
				<TextField
					{...params}
					inputProps={{
						...params.inputProps,
						autoComplete: 'off',
						autoCorrect: 'off',
						autoCapitalize: 'off',
						spellCheck: false,
					}}
					value={inputValue}
					onChange={(event) => setInputValue(event.currentTarget.value)}
					placeholder='Producto'
				/>
			)}
		/>
	);
};

export default AutocompleteSearchBox;
