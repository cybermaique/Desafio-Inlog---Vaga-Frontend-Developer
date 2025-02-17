import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TruckApiResponse } from "../interfaces/truck";

interface TrucksState {
  trucks: TruckApiResponse[];
}

const initialState: TrucksState = {
  trucks: [],
};

const trucksSlice = createSlice({
  name: "trucks",
  initialState,
  reducers: {
    setTrucks: (state, action: PayloadAction<TruckApiResponse[]>) => {
      state.trucks = action.payload;
    },
  },
});

export const { setTrucks } = trucksSlice.actions;
export default trucksSlice.reducer;
