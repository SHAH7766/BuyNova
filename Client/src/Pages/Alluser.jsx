import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Alluser = () => {
  const fetchUsers = async () => {
    let token = localStorage.getItem('token')
    console.log(token)
    try {
      let result = await axios.get(`http://localhost:8000/api/user/getallusers`, { headers: { Authorization: `Bearer ${token}` } })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div>

    </div>
  )
}

export default Alluser;
