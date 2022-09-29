import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../store/ProductSlice";

const Store = configureStore({
    reducer: {
        product: ProductSlice.reducer,
    }

});

export default Store;