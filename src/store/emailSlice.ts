import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmailState {
  email: string;
}

const initialState: EmailState = {
  email: "",
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearEmail: (state) => {
      state.email = "";
    },
  },
});

export const { setEmail, clearEmail } = emailSlice.actions;
export default emailSlice.reducer;