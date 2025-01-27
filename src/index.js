import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider} from "@mui/material/styles"
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import {Provider} from 'react-redux';
import cartReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from "@reduxjs/toolkit";
import store from './store/store';

// const store= configureStore({
//   reducer: {cart:cartReducer}
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
  auth: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    error: null
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    // New Auth Reducers
    loginStart: (state) => {
      state.auth.loading = true;
      state.auth.error = null;
    },

    loginSuccess: (state, action) => {
      state.auth.loading = false;
      state.auth.user = action.payload.user;
      state.auth.token = action.payload.token;
      state.auth.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },

    loginFailure: (state, action) => {
      state.auth.loading = false;
      state.auth.error = action.payload;
      state.auth.isAuthenticated = false;
    },

    logout: (state) => {
      state.auth.user = null;
      state.auth.token = null;
      state.auth.isAuthenticated = false;
      localStorage.removeItem('token');
    },

    registerStart: (state) => {
      state.auth.loading = true;
      state.auth.error = null;
    },

    registerSuccess: (state, action) => {
      state.auth.loading = false;
      state.auth.user = action.payload.user;
      state.auth.token = action.payload.token;
      state.auth.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },

    registerFailure: (state, action) => {
      state.auth.loading = false;
      state.auth.error = action.payload;
      state.auth.isAuthenticated = false;
    },

    updateUserProfile: (state, action) => {
      state.auth.user = { ...state.auth.user, ...action.payload };
    }
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  updateUserProfile
} = cartSlice.actions;

export default cartSlice.reducer;
