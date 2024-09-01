import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
    totalQuantity: JSON.parse(localStorage.getItem('cartTotalQuantity')) || 0,
    totalPrice: JSON.parse(localStorage.getItem('cartTotalPrice')) ||  0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += action.payload.price;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.totalQuantity++;
            state.totalPrice += action.payload.price;

            localStorage.setItem('cartItems', JSON.stringify(state.items));
            localStorage.setItem('cartTotalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('cartTotalPrice', JSON.stringify(state.totalPrice));            
        },
        removeItemFromCart(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity--;
                    existingItem.totalPrice -= existingItem.price;
                    state.totalQuantity--;
                    state.totalPrice -= existingItem.price;
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload);
                    state.totalQuantity--;
                    state.totalPrice -= existingItem.price; 
                }

                localStorage.setItem('cartItems', JSON.stringify(state.items));
                localStorage.setItem('cartTotalQuantity', JSON.stringify(state.totalQuantity));
                localStorage.setItem('cartTotalPrice', JSON.stringify(state.totalPrice)); 
            }
        },
        deleteItemFromCart(state, action) { 
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                state.items = state.items.filter(item => item.id !== action.payload);
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;

                localStorage.setItem('cartItems', JSON.stringify(state.items));
                localStorage.setItem('cartTotalQuantity', JSON.stringify(state.totalQuantity));
                localStorage.setItem('cartTotalPrice', JSON.stringify(state.totalPrice)); 
            }
        },
        updateItemQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                state.totalQuantity += action.payload.quantity - item.quantity;
                state.totalPrice += (action.payload.quantity - item.quantity) * item.price;
                item.quantity = action.payload.quantity;

                localStorage.setItem('cartItems', JSON.stringify(state.items));
                localStorage.setItem('cartTotalQuantity', JSON.stringify(state.totalQuantity));
                localStorage.setItem('cartTotalPrice', JSON.stringify(state.totalPrice)); 
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;

            localStorage.setItem('cartItems', JSON.stringify(state.items));
            localStorage.setItem('cartTotalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('cartTotalPrice', JSON.stringify(state.totalPrice)); 
        },
    },
});

export const { addItemToCart, removeItemFromCart, deleteItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;