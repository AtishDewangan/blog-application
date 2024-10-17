import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
  },
});
export const { add } = commentSlice.actions;
export default commentSlice.reducer;
