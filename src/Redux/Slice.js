import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchCategoriesItems, fetchFullDetails } from "./Api";


const CategoryDetails = createSlice({
    name: "Categories",
    initialState: {
        isLoading: false,
        data: [],
        error: ""
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = true;
            state.error = action.message;
        })
    }
})


const CategoriesItems = createSlice({
    name: "CategoriesItems",
    initialState: {
        isLoading: false,
        data: [],
        error: ""
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategoriesItems.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCategoriesItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchCategoriesItems.rejected, (state, action) => {
            state.isLoading = true;
            state.error = action.message;
        })
    }
})


const CartItems = createSlice({
    name: "CartItems",
    initialState: {
        isLoading: false,
        Cartdata: {},
        CartDetails: {},
        totalItems: 0,
        error: ""
    },
    reducers: {
        setAddtoCart: (state, action) => {
            console.log(action.payload)
            if (state.Cartdata[action.payload.idMeal]) {
                state.Cartdata[action.payload.idMeal] = state.Cartdata[action.payload.idMeal] + 1
                state.totalItems = state.totalItems + 1
            }
            else {
                state.Cartdata[action.payload.idMeal] = 1
                state.totalItems = state.totalItems + 1
                state.CartDetails[action.payload.idMeal] = action.payload
            }
        },
        removeFromCart: (state, action) => {
            if (state.Cartdata[action.payload.idMeal] > 1) {
                state.Cartdata[action.payload.idMeal] = state.Cartdata[action.payload.idMeal] - 1
                state.totalItems = state.totalItems - 1
            }
            else {
                delete state.Cartdata[action.payload.idMeal]
                delete state.CartDetails[action.payload.idMeal]
                state.totalItems = state.totalItems - 1
            }
        },
        emptyFromCart: (state, action) => {
            state.Cartdata = {}
            state.CartDetails = {}
        }
    }
})


const OrderItems = createSlice({
    name: "OrderItems",
    initialState: {
        isLoading: false,
        Orderdata: [],
        error: ""
    },
    reducers: {
        setAddOrders: (state, action) => {
            state.Orderdata = [...state.Orderdata, action.payload]
        },
    }
})

const SelectedItems = createSlice({
    name: "SelectedItems",
    initialState: {
        selectedCategory: ""
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        }
    }
})


const FullDetails = createSlice({
    name: "FullDetails",
    initialState: {
        isLoading: false,
        data: [],
        error: ""
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFullDetails.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchFullDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchFullDetails.rejected, (state, action) => {
            state.isLoading = true;
            state.error = action.message;
        })
    }
})

export const {
    setSelectedCategory
} = SelectedItems.actions

export const {
    setAddtoCart,
    removeFromCart,
    emptyFromCart
} = CartItems.actions

export const {
    setAddOrders
} = OrderItems.actions


export default {
    CategoryDetails: CategoryDetails.reducer,
    CategoriesItems: CategoriesItems.reducer,
    SelectedItems: SelectedItems.reducer,
    CartItems: CartItems.reducer,
    OrderItems: OrderItems.reducer,
    FullDetails: FullDetails.reducer
}