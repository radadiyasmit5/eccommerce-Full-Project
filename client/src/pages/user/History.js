import React from "react"
import {DashboardPageHeading} from "../../componant/DashboardPageHeading"
import DashboardPageWrapper from "../../componant/DashboardPageWrapper"
import SliderCompoment from "../../componant/nav/SliderCompoment"
import UserNav from "../../componant/nav/UserNav"

const History = () => {
  return (
    <>
      <DashboardPageWrapper>
        {/* <div > */}
        {/* <AdminNav /> */}
        <SliderCompoment isAdmin={false}/>
        {/* </div> */}
        <div className="col slider-rightSide-container">
          <DashboardPageHeading heading={"History"} />

          <div className="col"></div>
        </div>
      </DashboardPageWrapper>
    </>
  )
}

export default History
