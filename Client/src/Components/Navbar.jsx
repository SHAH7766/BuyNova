import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#">BuyNova</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/show-products' className="nav-link active" aria-current="page" >Products</Link>
                            </li>
                            {role === 'admin' && (
                                <>
                                    <li className="nav-item">
                                        <Link to='/activeusers' className="nav-link active" aria-current="page" >Active Users</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/allproducts' className="nav-link active" aria-current="page" >Active Products</Link>
                                    </li>
                                </>

                            )}
                        </ul>
                        <form className="d-flex" role="search">
                            {role === 'admin' && (
                                <Link to='/register-product' className="btn btn-outline-success" type="submit">Add Product</Link>
                            )}
                            {!token ? (
                                <Link to='/login' className="btn btn-success" type="submit">Login</Link>
                            ) : (
                                <button  onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('role');
                                    window.location.reload();
                                }} className="btn btn-danger mx-3" type="submit">Logout</button>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
