import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import OrderHistoryCards from "../../componant/cards/OrderHistoryCards"
import {DashboardPageHeading} from "../../componant/DashboardPageHeading"
import DashboardPageWrapper from "../../componant/DashboardPageWrapper"
import SliderCompoment from "../../componant/nav/SliderCompoment"
import UserNav from "../../componant/nav/UserNav"
import {getOrders} from "../../functions/Orders"

const History = () => {
  const {user} = useSelector((state) => state)
  const [orders, setorders] = useState([])
  const listallOrders = (authtoken) => {
    getOrders(authtoken)
      .then((res) => {
        if (res.data) {
          setorders(res.data)
        }
      })
      .catch((err) => {})
  }

  useEffect(() => {
    if (user && user.token) {
      listallOrders(user.token)
    }
  }, [user])

  return (
    <>
      <DashboardPageWrapper>
        {/* <div > */}
        {/* <AdminNav /> */}
        <SliderCompoment isAdmin={false} />
        {/* </div> */}
        <div className="col slider-rightSide-container">
          <DashboardPageHeading
            heading={
              orders.length > 0
                ? `You have placed ${orders.length} orders so far`
                : "No order history"
            }
          />
          <h5 className="text text-center m-3 bg-light p-4">Orders Summary</h5>
          <OrderHistoryCards orders={orders} />
          <div className="col"></div>
        </div>
      </DashboardPageWrapper>
    </>
  )
}

export default History
