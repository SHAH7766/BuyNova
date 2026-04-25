import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { motion } from "motion/react";

const Allproducts = () => {
    // 1. Keep data as an empty array initially
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const result = await axios.get(`http://localhost:8000/api/product/getallproducts?page=${page}&limit=5`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 2. CRITICAL FIX: Access the 'data' property inside the response
            // If your backend returns { data: [...], totalPages: X }, use result.data.data
            if (result.data && Array.isArray(result.data.data)) {
                setData(result.data.data);
                setTotalPages(result.data.totalPages);
                setLoading(false);
            } else {
                // Fallback if your backend still returns a plain array
                setData(result.data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [page]); // Re-fetch when page changes

    const DeleteProduct = (id) => {
        alert(id);
    }
    if (loading) return <div className="text-center mt-5">Loading...</div>;
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='container'
        >
            <h1 className='text-center mt-5'>All Products</h1>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 3. Safety check: Ensure data is an array before mapping */}
                    {Array.isArray(data) && data.map((item) => (
                        <tr key={item._id}>
                            <th scope="row">{item._id.slice(-5)}</th>
                            <td>{item.name}</td>
                            <td>{item.description?.slice(0, 20)}...</td>
                            <td>
                                <img
                                    src={`http://localhost:8000/uploads/${item.image}`}
                                    alt={item.name}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <span onClick={() => DeleteProduct(item._id)} className='btn btn-danger btn-sm'>
                                    <FaTrash />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 4. Simple Pagination UI */}
            <div className="d-flex justify-content-center gap-3 mt-4">
                <button
                    className="btn btn-secondary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    className="btn btn-secondary"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
}

export default Allproducts;