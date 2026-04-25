import React from 'react'
import "../Style/Login.css"
import { useState } from 'react'
import axios from 'axios'
const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const LoginHandler = async (e) => {
        e.preventDefault()
        try {
            let result = await axios.post('http://localhost:8000/api/user/login', { email, password })
            alert('Login successful')
            localStorage.setItem('token',result.data.token)
            localStorage.setItem('role',result.data.role)
            window.location.href='/show-products'
           
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <div className="container">
                <div style={{ marginTop: '8rem' }} className="row justify-content-center ">
                    <div className="col-md-8">
                        <div className="card-group mb-0">
                            <div className="card p-4">
                                <div className="card-body">
                                    <h1>Login</h1>
                                    <p className="text-muted">Sign In to your account</p>
                                    <div className="input-group mb-3">
                                        <span className="input-group-addon"><i className="fa fa-user" /></span>
                                        <input type="text" onChange={(e)=>setEmail(e.target.value)}  value={email} className="form-control" placeholder="Email address" />
                                    </div>
                                    <div className="input-group mb-4">
                                        <span className="input-group-addon"><i className="fa fa-lock" /></span>
                                        <input type="password" onChange={(e)=>setPassword(e.target.value)}  value={password} className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <button onClick={LoginHandler} type="button" className="btn btn-primary px-4">Login</button>
                                        </div>
                                        <div className="col-6 text-right">
                                            <button className="btn btn-link px-0">Forgot password?</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
                                <div className="card-body text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <button className="btn btn-primary active mt-3">Register Now!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
