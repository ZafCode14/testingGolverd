import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, Vendor } from "@/lib/types";

interface DataState {
  vendors: Vendor[];
  products: Product[];
}

const initialState: DataState = {
  vendors: [],
  products: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setVendorsR(state, action: PayloadAction<Vendor[]>) {
      state.vendors = action.payload;
    },
    setProductsR(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
});

export const { setVendorsR, setProductsR } = dataSlice.actions;
export default dataSlice.reducer;