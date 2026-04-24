import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Components/Card'

const Detail = () => {
    const [data, setData] = useState({})
    const { id } = useParams()
    useEffect(() => {
        FetchProductById()
    }, [])
    const FetchProductById = async () => {
        try {
            let result = await axios.get(`http://localhost:8000/api/product/getproductbyid/${id}`)
            setData(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(data)
    return (
        <>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-lg-6'>
                        <img className='img-fluid w-75 rounded-5 h-75' src={`http://localhost:8000/uploads/${data.image}`} />
                    </div>
                    <div className='col-lg-6'>
                        <h2 className='text-warning  fs-2 fw-bold'>{data.name}</h2>
                        <p className='fs-6'>{data.description}...</p>
                        <p className='fw-bold fs-3'>{data.price}$</p>
                        <div>
                            <button className='btn btn-success w-50'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail
