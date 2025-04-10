import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, CartState } from "@/types/CartTypes"
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { UserAddress } from "@/types/UserTypes"

interface Signup {
    isSigningUp: boolean
}

const initialSignup: Signup = {
    isSigningUp: false
}

const initialCartState: CartState = {
    items: [],
    total: 0
}

const cartPersistConfig = {
    key: "cart",
    storage
}

const signupSlice = createSlice({
    name: "signup",
    initialState: initialSignup,
    reducers: {
        setIsSigningUp(state, action: PayloadAction<boolean>) {
            state.isSigningUp = action.payload
        }
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find((item) => item.id === action.payload.id)
            if(existingItem) {
                existingItem.quantity++
            } else {
                state.items.push({...action.payload, quantity: 1})
            }
            state.total = (state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100) / 100
        },
        removeItem(state, action: PayloadAction<{id: string}>) {
            state.items = state.items.filter((item) => item.id !== action.payload.id)
            state.total = (state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100) / 100
        },
        updateQuantity(state, action: PayloadAction<{id: string, quantity: number}>) {
            const item = state.items.find((item) => item.id === action.payload.id)
            if(item) {
                item.quantity += action.payload.quantity

                if(item.quantity <= 0) {
                    state.items = state.items.filter((i) => i.id != item.id)
                }

                state.total = (state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100) / 100
            }
        },
        clearCart(state) {
            state.items = []
            state.total = 0
        }
    }
})

export const { setIsSigningUp } = signupSlice.actions
export const signupReducer = signupSlice.reducer

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export const cartReducer = persistReducer(cartPersistConfig, cartSlice.reducer)