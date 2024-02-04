import React from "react"
import {Drawer} from "antd"
import "react-modern-drawer/dist/index.css"
import {useDispatch, useSelector} from "react-redux"
import {selectCart} from "../reducers/CartReducer"
import {
  selectDrawerVisibility,
  setDrawerVisibility,
} from "../reducers/SlideDrawerReducer"
import imageurl from "../images/hpdesktop.jpg"
import {Link} from "react-router-dom"
import {currencyFormat} from "../utils/utils"

const SlideDrawer = () => {
  const dispatch = useDispatch()
  const drawerVisibility = useSelector(selectDrawerVisibility)
  const cart = useSelector(selectCart)
  const {user} = useSelector((state) => state)

  const handleDrawerClose = () => {
    dispatch(setDrawerVisibility(false))
  }
  return (
    <Drawer
      visible={drawerVisibility}
      onClose={handleDrawerClose}
      width={"20%"}
    >
      <h5 className="text-center mt-4">Cart / {cart.length} Products</h5>
      <hr />
      {/* <div className="container"> */}
      <div className="row">
        <div className="col">
          {cart.map((p) => (
            <div className="border my-2 mx-2">
              {p?.images.length && p.images[0] ? (
                <img
                  src={p.images[0].url}
                  style={{width: "100%", height: "100px", objectFit: "contain"}}
                  className="text-center"
                />
              ) : (
                <img src={imageurl} />
              )}
              <p className="text-center bg-dark text-white">
                {p?.title} - {p?.count} x {currencyFormat(p?.price)}
              </p>
            </div>
          ))}
          <div className="text-center">
            <Link to={"/cart"}>
              <button
                className="btn btn-raised btn btn-info mt-3"
                onClick={() => dispatch(setDrawerVisibility(false))}
              >
                Go to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* </div> */}
    </Drawer>
  )
}

export default SlideDrawer
