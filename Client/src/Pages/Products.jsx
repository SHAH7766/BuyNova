import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import axios from 'axios'
const Products = () => {
  const [data, setData] = useState([])
  const fetchProducts = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/product/getallproducts')
      setData(res.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  console.log(data);
  useEffect(() => {
    fetchProducts()
  }, [data])
  return (
    <div className='container'>
      <div className='row mt-5'>
        {data.map((item) => {
          return (
            /* The key must be on the outermost element of the map return */
            <div className='col-md-4 mb-4' key={item._id}>
              <Card data={item} />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Products
