import {Card, Select} from "antd"
import axios from "axios"
import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import {toast} from "react-toastify"
import OrderHistoryCards from "../../componant/cards/OrderHistoryCards"
import ProductCard from "../../componant/cards/ProductCard"
import {DashboardPageHeading} from "../../componant/DashboardPageHeading"
import DashboardPageWrapper from "../../componant/DashboardPageWrapper"
import {AdminNav} from "../../componant/nav/AdminNav"
import SliderCompoment from "../../componant/nav/SliderCompoment"
import OrderTable from "../../componant/tables/OrderTable"
import {getAllOrders, updateOrder} from "../../functions/Orders"
export const Admindashboard = () => {
  const {user} = useSelector((state) => state)
  const [orders, setorders] = useState({})
  const [saveOriginalStatus, setsaveOriginalStatus] = useState(new Map())
  const [orderStatuses, setorderStatuses] = useState(new Map())
  const [isEditOpenforOrder, setisEditOpenforOrder] = useState(new Map())
  const orderStatusOptions = [
    {value: "Not Processed", label: "Not Processed"},
    {value: "Cash On Delivery", label: "Cash On Delivery"},
    {value: "processing", label: "processing"},
    {value: "Dispatched", label: "Dispatched"},
    {value: "Cancelled", label: "Cancelled"},
    {value: "Completed", label: "Completed"},
  ]
  useEffect(() => {
    let iscomponentStillther = true
    const fetchallorders = async () => {
      if (user && user.token) {
        const orders = await getAllOrders(user.token)
        if (iscomponentStillther) {
          const orderResponse = await orders.data
          setorders(orderResponse)
          const statusMap = new Map()
          const editbarMap = new Map()
          orderResponse.forEach((order) => {
            statusMap.set(order?._id, order?.orderStatus)
            editbarMap.set(order?._id, false)
          })
          setorderStatuses(statusMap)
          setisEditOpenforOrder(editbarMap)
          setsaveOriginalStatus(statusMap)
        }
      }
    }
    fetchallorders()
    return () => {
      iscomponentStillther = false
    }
  }, [user])

  const onStatusOptionChange = (value, order) => {
    if (value) {
      const newMap = new Map(orderStatuses)
      const neweditMap = new Map(isEditOpenforOrder)
      newMap.set(order._id, value)
      neweditMap.set(order._id, true)
      setorderStatuses(newMap)
      setisEditOpenforOrder(neweditMap)
    }
  }
  const handleCancel = (order) => {
    const neweditbarMap = new Map(isEditOpenforOrder)
    const newStatusMap = new Map(orderStatuses)
    neweditbarMap.set(order._id, !neweditbarMap.get(order._id))
    newStatusMap.set(order._id, saveOriginalStatus.get(order._id))
    setorderStatuses(newStatusMap)
    setisEditOpenforOrder(neweditbarMap)
  }

  const handleSaveStatus = (order) => {
    const newStatusMap = new Map(saveOriginalStatus)
    const neweditbarMap = new Map(isEditOpenforOrder)
    newStatusMap.set(order._id, orderStatuses.get(order._id))
    neweditbarMap.set(order._id, !isEditOpenforOrder.get(order._id))
    setsaveOriginalStatus(newStatusMap)
    setisEditOpenforOrder(neweditbarMap)

    updateOrder(
      {orderId: order._id, orderStatus: orderStatuses.get(order._id)},
      user.token
    ).then((res) => {
      toast.success("Order Status Updated SuccessFully")
    }).catch((err)=>{
      toast.error('There is some issue while updating Order Status')
    })
  }
  return (
    <>
      <DashboardPageWrapper>
        {/* <div > */}
        {/* <AdminNav /> */}
        <SliderCompoment isAdmin={true} />
        {/* </div> */}
        <div className="col slider-rightSide-container">
          <DashboardPageHeading heading={"Admin Dashboard"} />
          {Object.keys(orders).length &&
            orders.map((order) => (
              <Card className="m-3" hoverable>
                <OrderTable order={order} />
                <div className="text text-center">
                  <h5 className="d-inline-block m-2 text bg-light p-2">
                    {" "}
                    Update The Order Status{" "}
                  </h5>
                  <span className="m-32">:</span>
                  {"   "}
                  <Select
                    value={orderStatuses.get(order._id)}
                    onChange={(value) => onStatusOptionChange(value, order)}
                    options={orderStatusOptions}
                  >
                    {/* {orderStatusOptions?.map((option) => {
                    return <Select.Option>{option}</Select.Option>
                  })} */}
                  </Select>
                </div>
                {isEditOpenforOrder.get(order._id) && (
                  <div
                    className="w-100 h-25 d-flex  justify-content-between border border-info rounded mt-3 p-2"
                    style={{transition: "all 2s ease-in-out"}}
                  >
                    <button
                      className="btn btn-raised btn-danger mx-3"
                      onClick={() => handleCancel(order)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-raised mx-3 btn-success"
                      onClick={() => handleSaveStatus(order)}
                    >
                      Save
                    </button>
                  </div>
                )}
              </Card>
            ))}
        </div>
      </DashboardPageWrapper>
    </>
  )
}
