import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ProductList from './ProductList';
import { useSelector, useDispatch } from "react-redux";
import { addProduct, getProduct, updateProduct } from '../store/ProductSlice';
import { Button } from '@mui/material';

const ProductForm = () => {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product);

    const [isVisible, toggles] = useState(false);
    const [productData, setProductData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [handler, setHandler] = useState(true)

    const { register, handleSubmit, setValue, formState: { errors, isSubmitSuccessful }, reset } = useForm({
        defaultValues: {
            name: "",
            price: "",
            category: "",
            company: ""
        }
    });

    //Flag for Modal call
    const toggleModal = (id) => {
        toggles((state) => !state);
        setHandler(true);

    }

    //Flag for add and updtae api call
    const isHandler = (id) => {
        setHandler(false);
    }

    // const getProductList = async () => {
    //     try {
    //         const productData = await dispatch(getProduct()).unwrap();
    //         setProductData(productData)
    //     }
    //     catch (error) {
    //         console.log(" GetList error", error);
    //     }
    // };

    // useEffect(() => {
    //     getProductList();
    // }, [])

    const onSubmit = async (data) => {
        try {
            if (handler) {
                let addProductInfo = await dispatch(addProduct(data)).unwrap();
                setNewData(addProductInfo);
                reset();
            } else {
                let editProductInfo = await dispatch(updateProduct(data)).unwrap();
                setNewData(editProductInfo);
                reset();
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    const editInfoHandler = (item) => {
        // console.log("editInfoHandler....", item)
        // setValue("productDetails", {
        //     id: item._id,
        //     name: item.name,
        //     price: item.price,
        //     category: item.category,
        //     company: item.company
        // })
        // setNewData(item)
        setValue("id", item._id)
        setValue("name", item.name);
        setValue("price", item.price);
        setValue("category", item.category);
        setValue("company", item.company);
    }

    // const updateHandler = async (newData) => {
    //     // console.log("id....", newData)
    //     try {
    //         // let editProductInfo = await dispatch(updateProduct(newData)).unwrap();
    //     } catch (error) {
    //         console.log("Update Error", error);
    //     }
    // }
    // console.log("handler....", handler)
    return (
        <div>
            <div style={{ display: isVisible ? "block" : "none", opacity: isVisible ? 1 : 0 }} className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Product Details</h5>
                            <button type="button" onClick={() => toggles(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="row g-3 align-items-center mb-4">
                                    <div className="col-auto">
                                        <label className="col-form-label" >Model Name :</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control" style={{ marginLeft: "64px" }} {...register('name', { required: true })} />
                                    </div>
                                    {errors.name && <p style={{ color: "red" }}>Modal name is required.</p>}
                                </div>
                                <div className="row g-3 align-items-center mb-4 ">
                                    <div className="col-auto">
                                        <label className="form-label"  > Price :</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control" style={{ marginLeft: "121px", width: "270px" }}  {...register('price', { required: true, pattern: /\d+/, maxLength: 4 })} />
                                    </div>
                                    {errors.price && <p style={{ color: "red" }}>Price is number and not more than 4 digits.</p>}
                                </div>
                                <div className="row g-3 align-items-center mb-4 ">
                                    <div className="col-auto">
                                        <label className="form-label" >   Enter Category :</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control" style={{ marginLeft: "50px", width: "270px" }} {...register('category', { required: true })} />
                                    </div>
                                    {errors.category && <p style={{ color: "red" }}>Category is required.</p>}
                                </div>
                                <div className="row g-3 align-items-center mb-4 ">
                                    <div className="col-auto">
                                        <label className="form-label"  >   Enter Company :</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control" style={{ marginLeft: "46px", width: "270px" }} {...register('company', { required: true })} />
                                    </div>
                                    {errors.company && <p style={{ color: "red" }}>Company is required.</p>}
                                </div>
                                <div className="mb-4">
                                    <Button variant="contained" type='submit' onClick={() => toggles(false)}>Save</Button>
                                    {/* <button type='submit' className='btn btn-primary btn-sm' onClick={() => toggles(false)}>Save</button> */}
                                    {/* <button type='button' className='btn btn-success btn-sm' onClick={() => updateHandler(newData)} >Update Product</button> */}
                                </div>
                            </form>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Save</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <Button variant="contained" type='button' data-bs-toggle="modal" aria-expanded="false" onClick={() => toggleModal()}>Add Product</Button>
            {/* <button type='button' className='btn btn-primary btn-sm' data-bs-toggle="modal" aria-expanded="false" onClick={() => toggleModal()}>Add Product </button> */}
            <ProductList toggleModal={toggleModal} editForm={editInfoHandler} isHandler={isHandler} newData={newData} />
        </div>
    )
}

export default ProductForm