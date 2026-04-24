import React from 'react'
import "../Style/Card.css"
import { Link } from 'react-router-dom'
const Card = (props) => {
    return (
        <>
            <img style={{width:"350px",height:"400px"}} src={`http://localhost:8000/uploads/${props.data.image}`} className="card-img-top rounded-4" alt={props.data.name} />
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{props.data.name}</h5>
                    <p className="card-text">{props.data.description.slice(0,50)}...</p>
                    <p className="card-text">Price: ${props.data.price}</p>
                    {/* <p className="card-text">Category: {props.data.category}</p> */}
                    <Link to={`/detail/${props.data._id}`} className="btn btn-primary">View Details</Link>
                </div>
            </div>
        </>
    )
}

export default Card
