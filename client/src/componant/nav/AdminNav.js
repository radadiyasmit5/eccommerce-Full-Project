import React from "react"
import {Link} from "react-router-dom"
import "./AdminNav.css"
export const AdminNav = () => {
  return (
    <>
      <nav className="navContainer">
        <ul className="nav flex-column">
          {/* <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              dashboard
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/admin/product">
              Create Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/catagory">
              Create Catagory
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/subcatagory">
              Create Sub Catagory
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/coupon">
              Coupon
            </Link>
          </li>
         
        </ul>
      </nav>
    </>
  )
}
