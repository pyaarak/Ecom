import { combineReducers } from "@reduxjs/toolkit";
import CategoryReducer from './Slice'

const rootReducer = combineReducers({
    CategoryDetails: CategoryReducer.CategoryDetails,
    CategoriesItems: CategoryReducer.CategoriesItems,
    SelectedItems: CategoryReducer.SelectedItems,
    CartItems: CategoryReducer.CartItems,
    OrderItems: CategoryReducer.OrderItems,
    FullDetails: CategoryReducer.FullDetails
})

export default rootReducer;