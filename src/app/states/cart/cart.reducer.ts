import { createReducer, on } from "@ngrx/store"
import { IProduct } from "../../shared/models/product.interface"
import * as CartActions from './cart.action';


export interface CartState {
    products: IProduct[];
}

export const initialCartState: CartState = {
    products: []
}

export const cartReducer = createReducer(
    initialCartState,
    on(CartActions.addToCart, (state, { product }) => {
        const updatedProduct = [...state.products, product]
        return {
            ...state,
            products: updatedProduct
        }
    }),
    on(CartActions.removeItem, (state, { productId }) => {
        const updatedProducts = state.products.filter(
            (product) => product.id !== productId
        )
        return {
            ...state,
            products: updatedProducts
        }
    }),
    on(CartActions.incrementProduct, (state, { productId }) => {
        const updatedProducts = state.products.map((product) =>
            product.id === productId
                ? { ...product, quantity: product.quantity + 1 }
                : product
        );
        return {
            ...state,
            products: updatedProducts
        }
    }),
    on(CartActions.decrementProduct, (state, { productId }) => {
        const updatedProducts = state.products.map((product) =>
            product.id === productId
                ? { ...product, quantity: product.quantity - 1 }
                : product
        );
        return {
            ...state,
            products: updatedProducts
        }
    })
)