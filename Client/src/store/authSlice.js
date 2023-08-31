import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	auth: JSON.parse(localStorage.getItem("user")) ? true : false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(state.user));
		},
		setAuth: (state, action) => {
			const { auth } = action.payload;
			state.auth = auth;
		},
	},
});

export const { setUser, setAuth } = authSlice.actions;

export default authSlice.reducer;
