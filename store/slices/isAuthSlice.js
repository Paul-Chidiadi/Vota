import { createSlice } from "@reduxjs/toolkit";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isAuth: checkAuthStatus(),
  accessToken: null,
  refreshToken: null,
};

// Function to check authentication status based on the presence of access and refresh tokens
function checkAuthStatus() {
  const accessToken = getDataFromLocalStorage("accessToken");
  const refreshToken = getDataFromLocalStorage("refreshToken");

  return !!accessToken && !!refreshToken;
}
export const isAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      const { isAuth, accessToken, refreshToken } = action.payload;
      console.log(state.isAuth);
      // state.isAuth = isAuth;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      // Save data in local storage if it exists
      if (accessToken !== undefined && accessToken !== undefined) {
        state.isAuth = true;
        console.log(state.isAuth);
      }
    },
    logOut: (state, action) => {
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setIsAuth, logOut } = isAuthSlice.actions;
export default isAuthSlice.reducer;
