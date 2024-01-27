import React from 'react'
import { Link } from 'react-router-dom'

const Listofproduct = ({ product }) => {
    const {
        price,
        category,
        subs,
        shipping,
        color,
        brand,
        quantity,
        sold,
        slug
    } = product
    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price {" "}
                <span className='label label-default label-pill float-end'>$ {price}</span>

            </li>
            {category && (<li className="list-group-item">
                category {" "}
                <Link key={category._id} to={`/categoty/${slug}`} className='label label-default label-pill float-end'> {category.name}</Link>

            </li>)}
            {subs && <li className="list-group-item">
                subcategory {" "}
                {subs && subs.map((s) => <Link key={s._id} to={`/subcategory/${slug}`} className='label label-default label-pill float-end ' style={{ paddingLeft: "13px" }}> {s.name}</Link>)
                }
            </li>}
            <li className="list-group-item">
                Color {" "}
                <span className='label label-default label-pill float-end'> {color}</span>

            </li>
            <li className="list-group-item">
                Available {" "}
                <span className='label label-default label-pill float-end'> {quantity}</span>

            </li>
            <li className="list-group-item">
                Shipping {" "}
                <span className='label label-default label-pill float-end'>{shipping}</span>

            </li>
            <li className="list-group-item">
                Brand {" "}
                <span className='label label-default label-pill float-end'>{brand}</span>

            </li>
            <li className="list-group-item">
                sold {" "}
                <span className='label label-default label-pill float-end'>{sold}</span>

            </li>
        </ul >
    )
}

export default Listofproduct