import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    token: string | null;
    username: string | null;
    firstName: string | null;
    email: string | null;
}

const initialState: { value: UserState } = {
    value: { token: null, username: null, firstName: null, email: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.value = action.payload; // Assuming you send the entire user object
        },
        logout: (state) => {
            state.value = { token: null, username: null, firstName: null, email: null };
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
