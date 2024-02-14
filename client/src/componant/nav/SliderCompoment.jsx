import React from "react"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {AdminNav} from "./AdminNav"
import "./AdminNav.css"
const SliderCompoment = () => {
  const {layout} = useSelector((state) => state)
  return (
    <div
      className={`sideBarContainer mr-2 ${
        layout?.isSideBarOpen ? "openSidebar" : ""
      }`}
    >
      <AdminNav />
    </div>
  )
}

export default SliderCompoment
