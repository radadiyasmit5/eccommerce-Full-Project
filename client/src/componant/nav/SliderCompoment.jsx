import React from "react"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {AdminNav} from "./AdminNav"
import "./AdminNav.css"
import UserNav from "./UserNav"
const SliderCompoment = ({isAdmin}) => {
  const {layout} = useSelector((state) => state)
  return (
    <div className={` ${layout?.isSideBarOpen ? "slider-container" : ""}`}>
      <div
        className={`sideBarContainer mr-2 ${
          layout?.isSideBarOpen ? "openSidebar" : ""
        }`}
      >
        {isAdmin ? <AdminNav /> : <UserNav />}
      </div>
    </div>
  )
}

export default SliderCompoment
