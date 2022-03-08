import { checkoutSlice } from './checkout/checkout.slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({ checkout: checkoutSlice.reducer });
