import React from 'react'
import { Link } from 'react-router-dom'
export const AdminNav = () => {
    return (
        <nav>
            <ul className='nav flex-column'>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin/dashboard">dashboard</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin/product">Product</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin/products">Products</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin/catagory">Catagory</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin/subcatagory"> Sub Catagory</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin/coupon">Coupon</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to="/admin/password">Password</Link>
                </li>

            </ul>

        </nav>
    )
}
