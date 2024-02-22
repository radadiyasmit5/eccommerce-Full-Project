import {CheckCircleFilled, StopOutlined} from "@ant-design/icons"
import React from "react"
import {currencyFormat} from "../../utils/utils"

const OrderTable = ({order}) => {
  const products = order.products
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="text m-3">
          <div className="m-3 ">
            <label className="text font-weight-bold">Order ID: </label>{" "}
            <span className="text text-dark" style={{fontSize: "1rem"}}>
              {order?.paymentIntent?.id}
            </span>
          </div>
          <div className="m-3 ">
            <label className="text font-weight-bold">Order Status: </label>{" "}
            <span className="text text-dark" style={{fontSize: "1rem"}}>
              {order?.orderStatus}
            </span>
          </div>
          <div className="m-3 ">
            <label className="text font-weight-bold">Order Date: </label>{" "}
            <span className="text text-dark" style={{fontSize: "1rem"}}>
              {new Date(order?.orderDate).toDateString()} (UTC)
            </span>
          </div>
        </div>
        <div className="text m-3">
          <div className="m-3 ">
            <label className="text font-weight-bold">Total Amount: </label>{" "}
            <span className="text text-dark" style={{fontSize: "1rem"}}>
              {currencyFormat(order.paymentIntent.amount / 100)}
            </span>
          </div>
          <div className="m-3 ">
            <label className="text font-weight-bold">Currency: </label>{" "}
            <span
              className="text text-dark text-uppercase"
              style={{fontSize: "1rem"}}
            >
              {order?.paymentIntent?.currency}
            </span>
          </div>
          <div className="m-3 ">
            <label className="text font-weight-bold">Expected Delivery: </label>{" "}
            <span className="text text-dark" style={{fontSize: "1rem"}}>
              -
            </span>
          </div>
        </div>
      </div>
      <table className="table table-bordered">
        <thead className="table-active">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
        {products &&
          products.map((p) => (
            <tbody>
              <tr>
                <td>{p.product.title}</td>
                <td>{p.product.price}</td>
                <td>{p.product.brand}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td className="text-center">
                  {p.product.shipping ? (
                    <CheckCircleFilled className="text text-success text-center" />
                  ) : (
                    <StopOutlined className="text text-danger" />
                  )}
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </>
  )
}

export default OrderTable
