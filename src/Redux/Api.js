import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
    return res?.json();
})


export const fetchCategoriesItems = createAsyncThunk("fetchCategoriesItems", async (items) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${items}`);
    return res?.json();
})


export const fetchFullDetails = createAsyncThunk("fetchFullDetails", async (items) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${items}`);
    return res?.json();
})