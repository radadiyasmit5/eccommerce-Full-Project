import axios from "axios"
import React, {useState, useEffect} from "react"
import ProductCard from "../../componant/cards/ProductCard"
import { DashboardPageHeading } from "../../componant/DashboardPageHeading"
import DashboardPageWrapper from "../../componant/DashboardPageWrapper"
import {AdminNav} from "../../componant/nav/AdminNav"
import SliderCompoment from "../../componant/nav/SliderCompoment"
export const Admindashboard = () => {
  return (
    <>
      <DashboardPageWrapper>
        {/* <div > */}
        {/* <AdminNav /> */}
        <SliderCompoment isAdmin={true}/>
        {/* </div> */}
        <div className="col-md-6 slider-rightSide-container">
         <DashboardPageHeading  heading={'Admin Dashboard'}/>

          <div className="col"></div>
        </div>
      </DashboardPageWrapper>
    </>
  )
}
