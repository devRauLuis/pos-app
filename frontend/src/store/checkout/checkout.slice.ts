import { Client, Product } from 'models';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ProductState = { count: number } & Product;

interface CheckoutState {
	products: ProductState[];
	client?: Client;
}
const initialState: CheckoutState = {
	products: [],
	client: undefined,
};
export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ProductState>) => {
			const index = state.products.findIndex(
				(item) => item.objectID === action.payload.objectID
			);
			if (index !== -1) state.products[index].count += 1;
			else state.products.push({ ...action.payload, count: 1 });
		},
		removeOneFromCart: (state, action: PayloadAction<ProductState>) => {
			const index = state.products.findIndex(
				(item) => item.objectID === action.payload.objectID
			);
			if (index !== -1) state.products[index].count -= 1;
		},
		removeFromCart: (state, action: PayloadAction<ProductState>) => {
			const index = state.products.findIndex(
				(item) => item.objectID === action.payload.objectID
			);
			if (index !== -1) state.products.splice(index, 1);
		},
		resetCart: (state) => {
			state.products = [];
			state.client = undefined;
		},
		setClient: (state, action: PayloadAction<Client>) => {
			state.client = action.payload;
		},
	},
});

export const { addToCart, removeOneFromCart, removeFromCart, setClient } =
	checkoutSlice.actions;

export default checkoutSlice.reducer;
