import React from "react"
import {Result} from "antd"
import {useHistory} from "react-router-dom"
const Error = () => {
  const history = useHistory()

  return (
    <Result
      status="500"
      title="There are some problems with your operation."
      extra={
        <button
          className="btn btn-raised btn-danger"
          onClick={() => history.push(history?.location?.state?.to)}
        >
          Try Again
        </button>
      }
    />
  )
}

export default Error
