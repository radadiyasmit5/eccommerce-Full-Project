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
        <ul class="list-group">
            <li class="list-group-item">
                Price {" "}
                <span className='label label-default label-pill float-end'>$ {price}</span>

            </li>
            {category && (<li class="list-group-item">
                category {" "}
                <Link to={`/categoty/${slug}`} className='label label-default label-pill float-end'> {category.name}</Link>

            </li>)}
            {subs && <li class="list-group-item">
                subcategory {" "}
                {subs && subs.map((s) => <Link to={`/subcategory/${slug}`} className='label label-default label-pill float-end px-4'> {s.name}</Link>)
                }
            </li>}
            <li class="list-group-item">
                Color {" "}
                <span className='label label-default label-pill float-end'> {color}</span>

            </li>
            <li class="list-group-item">
                Available {" "}
                <span className='label label-default label-pill float-end'> {quantity}</span>

            </li>
            <li class="list-group-item">
                Shipping {" "}
                <span className='label label-default label-pill float-end'>{shipping}</span>

            </li>
            <li class="list-group-item">
                Brand {" "}
                <span className='label label-default label-pill float-end'>{brand}</span>

            </li>
            <li class="list-group-item">
                sold {" "}
                <span className='label label-default label-pill float-end'>{sold}</span>

            </li>
        </ul >
    )
}

export default Listofproduct