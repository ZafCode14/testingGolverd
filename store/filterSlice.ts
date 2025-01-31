// store/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  showFilter: boolean;
  show: string;
  search: string;
  categories: string[];
  price: number[];
  floor: string;
}

const initialState: FilterState = {
  showFilter: false,
  search: "",
  categories: [],
  price: [0, 300000],
  floor: "",
  show: "brand"
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setShowFilterR(state, action: PayloadAction<boolean>) {
      state.showFilter = action.payload;
    },
    setShowR(state, action: PayloadAction<string>) {
      state.show = action.payload;
    },
    setSearchR(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategoriesR(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    setPriceR(state, action: PayloadAction<number[]>) {
      state.price = action.payload;
    },
    setFloorR(state, action: PayloadAction<string>) {
      state.floor = action.payload;
    },
    resetFiltersR(state) {
      state.showFilter = initialState.showFilter;
      state.search = initialState.search;
      state.categories = initialState.categories;
      state.price = initialState.price;
      state.floor = initialState.floor;
    },
  },
});

export const {
  setShowFilterR,
  setShowR,
  setSearchR,
  setCategoriesR,
  setPriceR,
  setFloorR,
  resetFiltersR,
} = filterSlice.actions;

export default filterSlice.reducer;