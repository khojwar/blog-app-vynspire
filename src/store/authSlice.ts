import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { id: number; name: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: any; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isInitialized = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
      localStorage.removeItem('token');
    },
    setInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload;
    },
  },
});


export const { loginSuccess, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;
