import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BondInput, BondOutput, CashFlowRow } from "@/interfaces/bond";

interface BondState {
  lastInput: BondInput | null;
  lastResults: BondOutput | null;
  cashFlow: CashFlowRow[];
}

const initialState: BondState = {
  lastInput: null,
  lastResults: null,
  cashFlow: [],
};

interface SetBondDataPayload {
  input: BondInput;
  results: BondOutput;
  cashFlow: CashFlowRow[];
}

const bondSlice = createSlice({
  name: "bond",
  initialState,
  reducers: {
    setBondData(state, action: PayloadAction<SetBondDataPayload>) {
      state.lastInput = action.payload.input;
      state.lastResults = action.payload.results;
      state.cashFlow = action.payload.cashFlow;
    },
    clearBondData(state) {
      state.lastInput = null;
      state.lastResults = null;
      state.cashFlow = [];
    },
  },
});

export const { setBondData, clearBondData } = bondSlice.actions;
export default bondSlice.reducer;

