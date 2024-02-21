import { createSlice } from "@reduxjs/toolkit";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
  deleteDataFromLocalStorage,
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
      const { accessToken, refreshToken, user } = action.payload;
      state.isAuth = true;
      // Save data in local storage if it exists
      if (accessToken !== undefined && accessToken !== undefined && user !== undefined) {
        saveDataToLocalStorage("accessToken", accessToken);
        saveDataToLocalStorage("refreshToken", refreshToken);
        saveDataToLocalStorage("id", user._id);
        saveDataToLocalStorage("email", user.email);
        saveDataToLocalStorage("fullName", user.fullName ? user.fullName : user.companyName);
        saveDataToLocalStorage("role", user.role);
      }
    },
    logOut: (state, action) => {
      state.isAuth = false;
      deleteDataFromLocalStorage("accessToken");
      deleteDataFromLocalStorage("refreshToken");
      deleteDataFromLocalStorage("id");
      deleteDataFromLocalStorage("email");
      deleteDataFromLocalStorage("fullName");
      deleteDataFromLocalStorage("role");
    },
  },
});

export const { setIsAuth, logOut } = isAuthSlice.actions;
export default isAuthSlice.reducer;
