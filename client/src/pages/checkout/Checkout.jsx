import {Card, Checkbox, ConfigProvider, Form, Input, Radio} from "antd"
import React, {useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {toast} from "react-toastify"
import {
  deleteProductsinCart,
  getProductsinCart,
  setuserAddress,
} from "../../functions/Cart"
import {validatCoupon} from "../../functions/coupon"
import {emptyCart, selectCart} from "../../reducers/CartReducer"
import {currencyFormat, getFullAddress} from "../../utils/utils"
// import confetti from "canvas-confetti"
import {Tooltip} from "antd"
import {useHistory} from "react-router-dom"
import {currentuser} from "../../functions/Axios"
const Checkout = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    town: "",
    state: "",
    country: "",
    postalcode: "",
  }
  const [userDetails, setuserDetails] = useState(initialState)
  const [totalPrice, settotalPrice] = useState(0)
  const [ProductsinCart, setProductsinCart] = useState([])
  const {user} = useSelector((state) => ({...state}))
  const [userLoginInfo, setuserLoginInfo] = useState(user)
  const [fullAddress, setfullAddress] = useState(null)
  const [coupon, setcoupon] = useState("")
  const [totalAfterDiscount, settotalAfterDiscount] = useState(0)
  const [istooltipVisible, setistooltipVisible] = useState(false)
  const [suggestrdAddress, setsuggestrdAddress] = useState({})
  const [isradioAddressSelected, setisradioAddressSelected] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }
  const handleInputChange = (e) => {
    setuserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const tooltipref = useRef(null)
  useEffect(() => {
    if (user && user?.token) {
      getProductsinCart(user?.token)
        .then((res) => {
          setProductsinCart(res.data.products)
          settotalPrice(res.data.totalPrice)
          res.data.totalPriceAfterDiscount > 0 &&
            settotalAfterDiscount(res.data?.totalPriceAfterDiscount)
        })
        .catch((err) => {
          console.log(err)
          toast.error("Error fetching products from cart")
        })
      currentuser(user.token).then((res) => {
   
        setsuggestrdAddress(res.data?.address)
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
        settotalAfterDiscount(0)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Error while deleting products in cart")
      })
  }

  const handleSaveAddress = () => {
    setfullAddress(
      getFullAddress(
        userDetails.address,
        userDetails.town,
        userDetails.state,
        userDetails.country
      )
    )
    setuserAddress(
      user?.token,
      getFullAddress(
        userDetails.address,
        userDetails.town,
        userDetails.state,
        userDetails.country
      ).toString()
    )
      .then((res) => {
        toast.success("Address Updated Successfully")
        setuserDetails(initialState)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Issue While Updating/Adding Addredd")
      })
  }
  const handleCouponApply = (e) => {
    validatCoupon(coupon, user.token)
      .then((res) => {
        settotalAfterDiscount(res.data.totalPriceAfterDiscount)
        toast.success("Coupon Applied SuccessFully")
        dispatch({
          type: "TOGGLE_COUPON_APPLIED",
          payload: {coupon: coupon, isCouponApplied: true},
        })
        // confetti({
        //   spread: 180,
        //   particleCount: 150,
        //   ticks: 100,
        // })
        setcoupon("")
      })
      .catch((err) => {
        if (err.msg) {
          toast.error(err.msg)
        }
        console.log(err)
        return toast.error("There is some issue while validating the coupon")
      })
  }

  const onCouponChage = (e) => {
    setcoupon(e.target.value)
  }

  const handlePlaceOrder = () => {
    history.push("/payment")
  }

  const handleRadioAddress = () => {
    setisradioAddressSelected(!isradioAddressSelected)
    setfullAddress(suggestrdAddress)
  }

  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <h3 className="m-4 text-center">Delivery Address</h3>
          <br />
          <br />
          <hr />
          <br />
          <div className="w-50 d-inline-block pl-3 bg-black ml-4">
            {suggestrdAddress && suggestrdAddress.length && (
              <>
                <h5 className="text mb-3 d-block ml-5 ">Select Address</h5>
                <Card style={{width: "300px"}} className="mb-3">
                  <Checkbox
                    onChange={handleRadioAddress}
                    checked={isradioAddressSelected}
                  >
                    {<p className="text">{suggestrdAddress}</p>}
                  </Checkbox>
                </Card>
              </>
            )}
            <br />

            <br />
            <h5 className="text mb-3 d-block ml-5">Add A New Address</h5>
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
                  <span className="mr-1 text-danger">*</span>State
                </h6>
              </lable>
              <input
                className="form form-control mb-3 p-2"
                // placeholder="First Name"
                required={true}
                value={userDetails.state}
                name="state"
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

              <button
                className="btn btn-raised btn-info"
                type="submit"
                onClick={handleSaveAddress}
              >
                {" "}
                Save{" "}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-5">
          <h3 className="m-4">Order Summary</h3>
          <hr />
          <h5 className="ml-4">
            {" "}
            {ProductsinCart && ProductsinCart?.length > 1 ? (
              <span>{ProductsinCart?.length} Products</span>
            ) : (
              <span>{ProductsinCart?.length} Product</span>
            )}
          </h5>
          <hr />
          {ProductsinCart && ProductsinCart?.length ? (
            ProductsinCart.map((c) => (
              <h6 className="mt-3 ml-4 text text-info bg-light w-75 p-2">
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
          <h6 className="text text-success ml-4 mt-3">
            {totalAfterDiscount > 0 &&
              `Coupon Code ${coupon} Applied - TotalPriceAfterDiscount - ${currencyFormat(
                totalAfterDiscount
              )}`}
          </h6>
          <div className="row ml-2">
            <div className="col ">
              <button
                className="btn btn-raised btn-success mt-3"
                disabled={!fullAddress}
                onClick={handlePlaceOrder}
              >
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
          <div className="mt-4 ml-4 w-75">
            <h5>Got Coupon ?</h5>
            <Tooltip
              title="Coupon Already Applied"
              placement={"left"}
              visible={totalAfterDiscount > 0 && istooltipVisible}
              defaultVisible={false}
              ref={tooltipref}
              onMouseEnter={() => setistooltipVisible(true)}
              onMouseLeave={() => setistooltipVisible(false)}
            >
              <input
                className="form form-control"
                onChange={onCouponChage}
                value={coupon}
                disabled={totalAfterDiscount > 0}
              />
              <button
                className="btn btn-raised mt-3 btn-success"
                onClick={handleCouponApply}
                disabled={totalAfterDiscount > 0}
              >
                Apply
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
