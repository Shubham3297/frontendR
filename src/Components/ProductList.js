import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getProduct, singleProductInfo } from '../store/ProductSlice';

const ProductList = (props) => {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        getProductList();
    }, []);

    useEffect(() => {
        getProductList();
    }, [props.newData]);

    const getProductList = async () => {
        try {
            const productData = await dispatch(getProduct()).unwrap();
            setProductData(productData)
        }
        catch (error) {
            console.log(" GetList error", error);
        }
    };

    const deleteHandler = async (_id) => {
        try {
            const productData = await dispatch(deleteProduct(_id)).unwrap();
            getProductList();
        }
        catch (error) {
            console.log("Delete error", error);
        }
    }

    const editHandler = async (item) => {
        props.toggleModal();
        props.editForm(item);
        props.isHandler();
        // console.log("edit...", item);

        // try {
        //     const productData = await dispatch(singleProductInfo(item)).unwrap();
        // }
        // catch (error) {
        //     console.log("edit error", error);
        // }
    }

    return (
        <div>
            {/* BootStrap Table */}
            {/* <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Company</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productData.map((item, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td>
                                    <button type='button' className='btn btn-success btn-sm' onClick={() => editHandler(item)} >
                                        <i className="fa fa-pencil-square-o" aria-hidden="true">Edit</i>
                                    </button>
                                    ||
                                    <button type='button' className='btn btn-danger btn-sm' onClick={() => deleteHandler(item._id)} >
                                        <i className="fa fa-trash-o" aria-hidden="true">Delete</i>
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table> */}

            {/* Material Ui Table */}
            <div style={{ marginLeft: '350px', backgroundColor: blue }}>
                <TableContainer component={Paper} sx={{ maxWidth: "900px" }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Sr. No.</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Company</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productData.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">{item.price}</TableCell>
                                    <TableCell align="center">{item.category}</TableCell>
                                    <TableCell align="center">{item.company}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="success" type='button' onClick={() => editHandler(item)} >
                                            Edit
                                        </Button>
                                        {/* <button type='button' className='btn btn-success btn-sm' onClick={() => editHandler(item)} >
                                            <i className="fa fa-pencil-square-o" aria-hidden="true">Edit</i>
                                        </button> */}
                                        ||
                                        <Button variant="contained" color="error" type='button' onClick={() => deleteHandler(item._id)} >
                                            Delete
                                        </Button>
                                        {/* <button type='button' className='btn btn-danger btn-sm' onClick={() => deleteHandler(item._id)} >
                                            <i className="fa fa-trash-o" aria-hidden="true">Delete</i>
                                        </button> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ProductList