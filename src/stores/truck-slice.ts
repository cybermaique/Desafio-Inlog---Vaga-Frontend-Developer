import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TruckNormalized } from "../interfaces/truck-normalized";

interface TrucksState {
  trucks: TruckNormalized[];
}

const initialState: TrucksState = {
  trucks: [],
};

const trucksSlice = createSlice({
  name: "trucks",
  initialState,
  reducers: {
    setTrucks: (state, action: PayloadAction<TruckNormalized[]>) => {
      state.trucks = action.payload;
    },
  },
});

export const { setTrucks } = trucksSlice.actions;
export default trucksSlice.reducer;
