import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//-------------------------------------------Product Thunk code--------------------------------------
//-------------------------------------------Get Product details--------------------------------------
export const getProduct = createAsyncThunk(
    "product/getProduct",
    async (model, thunkApi) => {
        try {
            let res = await axios.get('http://localhost:5000/product-list');
            // console.log("...", res.data)
            const productData = res.data;
            return productData;
        } catch (error) {
            return thunkApi.rejectWithValue("error");
        }
    }
);

//-------------------------------------------Delete Product details--------------------------------------
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (_id, thunkApi) => {
        try {
            let res = await axios.delete(`http://localhost:5000/product/${_id}`);
            // console.log("thunk...", res.data)
            const productData = res.data;
            return productData;
        } catch (error) {
            return thunkApi.rejectWithValue("error");
        }
    }
);

//-------------------------------------------Add Product details--------------------------------------
export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data, thunkApi) => {
        try {
            // let res = await axios().post("http://localhost:5000/add-product", {
            //     data,
            // });
            let res = await axios.post('http://localhost:5000/add-product', data);
            const productData = res;
            return productData;
        } catch (error) {
            return thunkApi.rejectWithValue("error");
        }
    }
);

//-------------------------------------------Single Product details--------------------------------------
export const singleProductInfo = createAsyncThunk(
    "product/singleProduct",
    async (data, thunkApi) => {
        try {
            let id = data._id
            let res = await axios().get(`http://localhost:5000/product/${id}`);
            const productData = res.data;
            return productData;
        } catch (error) {
            return thunkApi.rejectWithValue("error", error);
        }
    }
);

//-------------------------------------------Update Product details--------------------------------------
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data, thunkApi) => {
        try {
            // Working 1st and 2nd  method (Also use put word insted of post  for 1st and 2nd method)
            // let res = await axios.post('http://localhost:5000/product', data);
            // Working 3rd method (Also use post word insted of put  for  3rd method)
            let res = await axios.put(`http://localhost:5000/product/${data._id}`, data);
            const productData = res.data
            console.log("productData", productData);
            return productData;
        } catch (error) {
            return thunkApi.rejectWithValue("error");
        }
    }
);



//-------------------------------------------Product Slice code--------------------------------------
const initState = {
    loading: false,
    productData: [],
    productDetails: null,
    isSuccess: false,
    message: ""
};

const productSlice = createSlice({
    name: "Product",
    initialState: initState,
    reducers: {},
    extraReducers: {

        //-------------------------------------------Get Product details--------------------------------------

        [getProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            let productInfo = action.payload;
        },
        [getProduct.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },

        //-------------------------------------------Delete Product details--------------------------------------

        [deleteProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            let productInfo = action.payload;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },

        //-------------------------------------------Add Product details--------------------------------------

        [addProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [addProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            let productInfo = action.payload;
        },
        [addProduct.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },

        //-------------------------------------------Single Product details--------------------------------------

        [singleProductInfo.pending]: (state, action) => {
            state.loading = true;
        },
        [singleProductInfo.fulfilled]: (state, action) => {
            state.loading = false;
            let productInfo = action.payload.asset;
        },
        [singleProductInfo.rejected]: (state, action) => {
            state.loading = false;
        },

        //-------------------------------------------Updated Product details--------------------------------------

        [updateProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            let productInfo = action.payload.asset;
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
        },
    }
});

export default productSlice;