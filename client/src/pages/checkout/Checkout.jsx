import {ConfigProvider, Form, Input} from "antd"
import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"
import {deleteProductsinCart, getProductsinCart} from "../../functions/Cart"
import {emptyCart, selectCart} from "../../reducers/CartReducer"
import {currencyFormat} from "../../utils/utils"

const Checkout = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    town: "",
    country: "",
    postalcode: "",
  }
  const [userDetails, setuserDetails] = useState(initialState)
  const [totalPrice, settotalPrice] = useState(0)
  const [ProductsinCart, setProductsinCart] = useState([])
  const {user} = useSelector((state) => ({...state}))
  const [userLoginInfo, setuserLoginInfo] = useState(user)
  const dispatch = useDispatch()
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }
  const handleInputChange = (e) => {
    setuserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if (user && user?.token) {
      getProductsinCart(user?.token)
        .then((res) => {
          setProductsinCart(res.data.products)
          settotalPrice(res.data.totalPrice)
        })
        .catch((err) => {
          console.log(err)
          toast.error("Error fetching products from cart")
        })
    }
  }, [user])

  const handleEmptyCart = (e) => {
    e.preventDefault()
    if (typeof window !== undefined) {
      localStorage.removeItem("cart")
    }

    dispatch(emptyCart())

    deleteProductsinCart(user?.token)
      .then((res) => {
        if (res.data.ok) {
          toast.success("Deleted Products in the cart")
        }
        setProductsinCart([])
        settotalPrice(0)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Error while deleting products in cart")
      })
  }
  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <h3 className="m-4">Delivery Address</h3>
          <div className="w-50 d-inline-block pl-3 bg-black ml-4">
            <form onSubmit={handleFormSubmit}>
              <lable className="font-weight-bold text-capitalize text-truncate">
                <h6>First Name</h6>
              </lable>
              <input
                className="form form-control mb-3 p-2"
                // placeholder="First Name"
                value={userDetails.firstname}
                name="firstname"
                onChange={(e) => handleInputChange(e)}
              ></input>

              <lable className="font-weight-bold text-capitalize text-truncate">
                <h6>Last Name</h6>
              </lable>
              <input
                className="form form-control mb-3 p-2"
                // placeholder="First Name"
                value={userDetails.lastname}
                name="lastname"
                onChange={(e) => handleInputChange(e)}
              ></input>

              <lable className="font-weight-bold text-capitalize text-truncate">
                <h6>
                  <span className="mr-1 text-danger">*</span>Email
                </h6>
              </lable>
              <input
                className="form form-control mb-3 p-2"
                // placeholder="First Name"
                type="email"
                required={true}
                value={userDetails.email}
                name="email"
                onChange={(e) => handleInputChange(e)}
              ></input>

              <lable className="font-weight-bold text-capitalize text-truncate">
                <h6>
                  <span className="mr-1 text-danger">*</span>Address
                </h6>
              </lable>
              <input
                className="form form-control mb-3 p-2"
                // placeholder="First Name"
                type="text"
                placeholder="eg. unit 123, ABC street"
                required={true}
                value={userDetails.address}
                name="address"
                onChange={(e) => handleInputChange(e)}
              ></input>

              <lable className="font-weight-bold text-capitalize text-truncate">
                <h6>
                  <span className="mr-1 text-danger">*</span>Town
                </h6>
              </lable>
              <input
                className="form form-control mb-3 p-2"
                // placeholder="First Name"
                required={true}
                value={userDetails.town}
                name="town"
                onChange={(e) => handleInputChange(e)}
              ></input>

              <lable className="font-weight-bold text-capitalize text-truncate">
                <h6>
                  <span className="mr-1 text-danger">*</span>Country
                </h6>
              </lable>
              <input
                className="form form-control mb-3 p-2"
                // placeholder="First Name"
                required={true}
                value={userDetails.country}
                name="country"
                onChange={(e) => handleInputChange(e)}
              ></input>

              <lable className="font-weight-bold text-capitalize text-truncate">
                <h6>
                  <span className="mr-1 text-danger">*</span>Postal Code
                </h6>
              </lable>
              <input
                className="form form-control mb-3 p-2"
                // placeholder="First Name"
                required={true}
                value={userDetails.postalcode}
                name="postalcode"
                onChange={(e) => handleInputChange(e)}
              ></input>

              <button className="btn btn-raised btn-info" type="submit">
                {" "}
                Save{" "}
              </button>
            </form>
            <div>
              <h5>Got Coupon ?</h5>
              <input className="form form-control" />
              <button className="btn btn-raised mt-3 btn-success">Apply</button>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <h3 className="m-4">Order Summary</h3>
          <hr />
          <h5 className="ml-4">
            {" "}
            {ProductsinCart && ProductsinCart?.length} Products
          </h5>
          <hr />
          {ProductsinCart && ProductsinCart?.length ? (
            ProductsinCart.map((c) => (
              <h6 className="mt-3 ml-4">
                {c.product.title} X {c.count} ={" "}
                {currencyFormat(c.count * c.price)}
              </h6>
            ))
          ) : (
            <h5 className="ml-4">No Product in the Cart</h5>
          )}
          <hr />
          <h5 className="ml-4">
            {" "}
            Total = {totalPrice ? currencyFormat(totalPrice) : 0}
          </h5>
          <div className="row">
            <div className="col ">
              <button className="btn btn-raised btn-success mt-3">
                Place Order
              </button>
            </div>
            <div className="col ">
              {/* {ProductsinCart.product} */}
              <button
                className="btn btn-raised btn-info mt-3"
                disabled={!ProductsinCart?.length}
                onClick={handleEmptyCart}
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
