import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import axios from 'axios'
import { motion } from "motion/react"

const Products = () => {
  const [data, setData] = useState([]) // Stores the products array
  const [totalPages, setTotalPages] = useState(1) // To disable "Next" at the end
  const [page, setPage] = useState(1)

  const fetchProducts = async () => {
    try {
      // Note: If your backend returns { data: [...], totalPages: 5 }, handle accordingly
      const res = await axios.get(`http://localhost:8000/api/product/getallproducts?limit=4&page=${page}`)
      
      // If using the advanced controller from before:
      setData(res.data.data) 
      setTotalPages(res.data.totalPages)
      
      // If your backend still returns just an array:
      // setData(res.data) 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  // ONLY re-run when 'page' changes
  useEffect(() => {
    fetchProducts()
  }, [page]) 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className='container'
    >
      <div className='row mt-5'>
        {data && data.map((item) => (
          <div className='col-md-4 mb-4' key={item._id}>
            <Card data={item} />
          </div>
        ))}
      </div>

      {/* Pagination moved OUTSIDE the map loop */}
      <div className="d-flex justify-content-center align-items-center my-4">
        <button 
          className="btn btn-primary mx-2"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
          disabled={page === 1}
        >
          Previous
        </button>
        
        <span className="fw-bold"> Page {page} of {totalPages} </span>
        
        <button 
          className="btn btn-primary mx-2"
          onClick={() => setPage(prev => prev + 1)}
          disabled={page >= totalPages} // Disable if we reach the last page
        >
          Next
        </button>
      </div>
    </motion.div>
  )
}

export default Products