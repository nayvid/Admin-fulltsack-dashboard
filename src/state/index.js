import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isCartOpen: false,
    cart:[],
    items:[],
}

//Redux state component to control and manipulate the information in the product cart
export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        setItems:(state,action) => {
            state.items = action.payload;
        },

        addToCart:(state,action) => {
            state.cart=[...state.cart,action.payload.item];
        },

        removeFromCart:(state,action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state,action) => {
            state.cart = state.cart.map((item) => {
                if(item.id === action.payload.id) {
                    item.count++;
                }
                return item;
            })
        },

        decreaseCount:(state,action) => {
            state.cart= state.cart.map((item) => {
                if(item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item;
            });
        },
        
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },

         // Auth reducers
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

            // New auth reducers
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
        },
});

//function to carry out CRUD operation for cart items
export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    registerStart,
    registerSuccess, 
    registerFailure,
    setIsCartOpen,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
} = cartSlice.actions;

export default cartSlice.reducer;