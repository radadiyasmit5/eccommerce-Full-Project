import {CloseOutlined} from "@ant-design/icons"
import {Select, Table} from "antd"
import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useHistory} from "react-router-dom"
import {
  removeSingleItemfromCart,
  selectCart,
  updateCart,
} from "../../reducers/CartReducer"
import ModalImage from "react-modal-image"
import imageurl from "../../images/hplaptop.jpg"

import "./cart.css"
import {currencyFormat} from "../../utils/utils"
import {toast} from "react-toastify"
import {saveCartToDB} from "../../functions/Cart"
export const Cart = () => {
  const [colors, setcolors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ])
  const dispatch = useDispatch()
  const history = useHistory()
  const {user} = useSelector((state) => state)
  const cart = useSelector(selectCart)

  const [productcount, setproductcount] = useState(() => {
    let tempMap = new Map()
    cart.map((c) => {
      tempMap.set(c?._id, c?.count)
    })

    return tempMap
  })

  const [color, setcolor] = useState(() => {
    let tempMap = new Map()
    cart.map((c) => {
      tempMap.set(c?._id, c?.color)
    })

    return tempMap
  })

  const displayColors = () => {
    let colorstoDisplay = []
    colors.map((c) => {
      colorstoDisplay.push({value: c, lable: <div>{c}</div>})
    })
    return colorstoDisplay
  }

  const totalPrice = () => {
    let total = cart.reduce((acc, ele) => {
      return acc + ele?.price * ele?.count
    }, 0)

    return currencyFormat(total)
  }

  const handleLogintocheckout = () => {
    history.push({
      pathname: "/login",
      state: "/cart",
    })
  }

  const handleProceedToCheckout = () => {
    //save this Cart in to DB
    saveCartToDB(user.token, cart).then((res) => {
      if (res.data == "ok") {
        history.push("/checkout")
      }
    })
  }
  const handleColorchange = (id, newcolor) => {
    let tempColor = new Map(color)
    let currentProducts = JSON.parse(localStorage.getItem("cart"))
    tempColor.set(id, newcolor)
    setcolor(tempColor)
    const product = cart.find((p) => {
      return p._id == id
    })
    currentProducts.map((p) => {
      if (p._id == id) {
        p.color = newcolor
      }
    })
    localStorage.setItem("cart", JSON.stringify(currentProducts))

    dispatch(updateCart(product, "color", newcolor))
  }
  const handleCountChange = (id, e) => {
    let count = e.target.value
    if (count < 0) {
      count = 1
    }
    let tempcount = new Map(productcount)
    let currentProducts = JSON.parse(localStorage.getItem("cart"))
    tempcount.set(id, count)
    setproductcount(tempcount)
    const product = cart.find((p) => {
      return p._id == id
    })
    currentProducts.map((p) => {
      if (p._id == id) {
        p.count = count
      }
    })
    localStorage.setItem("cart", JSON.stringify(currentProducts))
    dispatch(updateCart(product, "count", count))
  }

  const handleremove = (product) => {
    dispatch(removeSingleItemfromCart(product._id))
    const productsfromLocalstrg = JSON.parse(localStorage.getItem("cart"))
    const currentProduct = productsfromLocalstrg.find(
      (e) => e._id == product._id
    )
    const indexOfProduct = productsfromLocalstrg.findIndex(
      (e) => e._id == product._id
    )
    if (indexOfProduct >= 0) {
      productsfromLocalstrg.splice(indexOfProduct, 1)
    } else if (indexOfProduct < 0) {
      toast.error("Product not fount in the Cart")
      return
    }
    localStorage.setItem("cart", JSON.stringify(productsfromLocalstrg))
  }
  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (images) => (
        <>
          {images?.length ? (
            <ModalImage
              small={images[0].url}
              large={images[0].url}
              showRotate
              className="table-img"
            />
          ) : (
            <ModalImage small={imageurl} large={imageurl} />
          )}

          {/* <img src={images[0].url} className="border rounded table-img" /> */}
        </>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => (
        <>
          <p>{title}</p>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <>
          <p>{currencyFormat(price)}</p>
        </>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => (
        <>
          <p>{brand}</p>
        </>
      ),
    },
    {
      title: "Color",
      // dataIndex: ['_id', 'color','title'],
      key: "color",
      render: (_, p) => (
        <>
          <Select
            options={displayColors()}
            onChange={(color) => handleColorchange(p._id, color)}
            value={color?.get(p?._id)}
          />
        </>
      ),
    },
    {
      title: "count",
      dataIndex: ["count"],
      key: "count",
      render: (_, p) => (
        <>
          <input
            type="number"
            className="form-control"
            value={productcount.get(p?._id)}
            onChange={(e) => handleCountChange(p._id, e)}
            min={0}
          />
        </>
      ),
    },
    {
      title: "Remove",
      // dataIndex: ['_id', 'color','title'],
      key: "remove",
      render: (_, p) => (
        <span>
          <button
            onClick={() => handleremove(p)}
            className="btn btn-outline-danger btn-sm mt-2"
          >
            Remove
          </button>
        </span>
      ),
    },
  ]
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <h2 className="m-3">Cart /{cart.length} Products</h2>
            {cart?.length == 0 ? (
              <h4 className="m-3">
                No Products in Cart, <Link to="/shop">Continue Shopping</Link>.
              </h4>
            ) : (
              <>
                <Table
                  dataSource={cart}
                  columns={columns}
                  bordered
                  pagination={{position: ["none", "bottomCenter"]}}
                >
                  {" "}
                </Table>
              </>
            )}
          </div>

          <div className="col-md-4">
            {" "}
            <h3 className="m-3">
              Order Summary <hr />
            </h3>
            <h5 className="m-3">Products</h5>
            {cart &&
              cart.map((c) => (
                <p className="m-3">
                  {c?.title} x{c?.count} = {currencyFormat(c?.price * c?.count)}
                </p>
              ))}
            <hr />
            <div className="m-3">
              <h6 className="d-inline">Total</h6> : {totalPrice()}
            </div>
            {user && user?.name ? (
              <button
                className="text-uppercase btn btn-outline-success m-2"
                disabled={!cart?.length}
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                className="text-uppercase btn btn-outline-warning m-2"
                onClick={handleLogintocheckout}
              >
                Login to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
