import React from "react"
import PropagateLoader from "react-spinners/PropagateLoader"

const Loading = () => {
  return (
    <div
    className="bg-opacity-10"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "70vh",
        width:'60vw'
      }}
    >
      <PropagateLoader
        color={"green"}
        size={10}
        // cssOverride={{position: "absolute", left:'200px'}}
      />
    </div>
  )
}

export default Loading
