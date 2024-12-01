import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentActiveModule: 0,
  isOpen: true,
};
export const SidebarSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setActiveModule: (state, action) => {
      state.currentActiveModule = action.payload.currentActiveModule;
    },
    setSidebarStatus: (state, action) => {
      state.isOpen = action.payload.status;
    },
  },
});
export const { setActiveModule, setSidebarStatus } = SidebarSlice.actions;

export default SidebarSlice.reducer;
