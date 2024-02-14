import axios from "axios"
import React, {useState, useEffect} from "react"
import ProductCard from "../../componant/cards/ProductCard"
import DashboardPageWrapper from "../../componant/DashboardPageWrapper"
import {AdminNav} from "../../componant/nav/AdminNav"
import SliderCompoment from "../../componant/nav/SliderCompoment"
export const Admindashboard = () => {
  return (
    <>
      <DashboardPageWrapper>
        {/* <div > */}
        {/* <AdminNav /> */}
        <SliderCompoment />
        {/* </div> */}
        <div className="col-md-6">
          <h1>Admin Dashboard</h1>

          <div className="col"></div>
        </div>
      </DashboardPageWrapper>
    </>
  )
}
