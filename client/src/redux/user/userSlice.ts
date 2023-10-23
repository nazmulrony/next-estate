import { RootState } from "./../store";
import { createSlice } from "@reduxjs/toolkit";

type userState = {
    currentUser: any;
    error: string | null;
    isLoading: boolean;
};

const initialState: userState = {
    currentUser: null,
    error: null,
    isLoading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.isLoading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
