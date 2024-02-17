import React from "react"

const DashboardPageWrapper = ({children}) => {
  return (
    <div className="container-fluid h-100 ">
      <div className="row h-100">{children}</div>
    </div>
  )
}

export default DashboardPageWrapper
