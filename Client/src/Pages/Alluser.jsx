import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaTrash } from "react-icons/fa";
const Alluser = () => {
  let token = localStorage.getItem('token')
  console.log(token)
  const [data, setData] = useState([])
  const fetchUsers = async () => {
    try {
      let result = await axios.get(`http://localhost:8000/api/user/getallusers`, { headers: { Authorization: `Bearer ${token}` } })
      setData(result.data)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(data)
  useEffect(() => {
    fetchUsers()
  }, [])
  const DeleteUser = (id) => {
    alert(id)
  }
  return (
    <div className='container'>

      <h1 className='text-center mt-5'>All Users</h1>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item._id}>
                <th scope="row">{item._id}</th>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.password.slice(0, 20)}</td>
                <td>{item.role}</td>
                <td><span onClick={() => DeleteUser(item._id)} className='btn btn-danger'><FaTrash /></span></td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  )
}


export default Alluser;
