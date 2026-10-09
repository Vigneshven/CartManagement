import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
    cart:[],
}

const shopSlice = createSlice({
    name:"shop",
    initialState,
    reducers:{
        setProduct:(state,action)=>{
            state.products=action.payload
        },

        setCart:(state,action)=>{
            state.cart=action.payload
        },

        addProduct:(state,action)=>{
            state.products.push(action.payload)
        },

        addCartItem:(state,action)=>{
            state.cart.push(action.payload)
        },

        updateCartItem:(state,action)=>{
            const index = state.cart.findIndex((item)=>item.id===action.payload.id)
            if(index!==-1){
                state.cart[index]=action.payload
            }
        },

        removeCartItem:(state,action)=>{
            state.cart = state.cart.filter((item)=>item.id!==action.payload)
        },

        clearCart:(state)=>{
            state.cart=[]
        },
    }
})

export const {
    setProduct,
    addProduct,
    addCartItem,
    setCart,
    updateCartItem,
    removeCartItem,
    clearCart
}=shopSlice.actions;

export default shopSlice.reducer