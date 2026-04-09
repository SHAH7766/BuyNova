import React,{useState} from 'react'
import axios from 'axios'
import "../Style/RegisterProduct.css"
export const RegisterProduct = () => {
  const [name,setname]=useState('')
  const [description,setdescription]=useState('')
  const [price,setprice]=useState('')
  const [category,setcategory]=useState('')
  const [image,setimage]=useState('')
  async function FormHandler(e){
    e.preventDefault()
    const formData = new FormData();
    formData.append('name',name)
    formData.append('description',description)
    formData.append('price',price)
    formData.append('category',category)
    formData.append('image',image)
    try {
        await axios.post('http://localhost:8000/api/product/registerproduct',formData) 
        alert('Product registered successfully!')
    } catch (error) {
        console.error('Error registering product:', error);
        alert('Error registering product. Please try again.');
    }
  }
  return (
      <div className="maindiv-registerproduct">
        <h1>Register Product</h1>
        <form onSubmit={FormHandler}>
            <input type='text' placeholder='Product name' onChange={(e)=>setname(e.target.value)} value={name}/>
            <br/>
            <br/>
            <input type='text' placeholder='Product description' onChange={(e)=>setdescription(e.target.value)} value={description}/>
            <br/>
            <br/>
            <input type='number' placeholder='Product price' onChange={(e)=>setprice(e.target.value)} value={price}/>
            <br/>
            <br/>
            <input type='text' placeholder='Product category' onChange={(e)=>setcategory(e.target.value)} value={category}/>
            <br/>
            <br/>
            <input type='file' placeholder='Product image URL' onChange={(e)=>setimage(e.target.files[0])} />
            <br/>
            <br/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}


