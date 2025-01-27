import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../state';

const initialState = {
  cart: {
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
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer
  },
  preloadedState: initialState
});

// export default store;

export default store;