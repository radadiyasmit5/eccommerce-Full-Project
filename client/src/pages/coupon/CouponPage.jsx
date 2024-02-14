import React, {useState, useEffect} from "react"
import {AdminNav} from "../../componant/nav/AdminNav"
import DatePicker from "react-date-picker"
import {DateTime} from "luxon"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import "./coupon.css"
import {createCoupons, deleteCoupons, listCoupons} from "../../functions/coupon"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import {DeleteOutlined} from "@ant-design/icons"
import SliderCompoment from "../../componant/nav/SliderCompoment"
import DashboardPageWrapper from "../../componant/DashboardPageWrapper"
const CouponPage = () => {
  const [name, setname] = useState("")
  const [discount, setprice] = useState(null)
  const [expiryDate, setdate] = useState(null)
  const {user} = useSelector((state) => state)
  const [coupons, setcoupons] = useState(null)

  useEffect(() => {
    listallCoupons()
  }, [])

  const handleNameChage = (e) => {
    setname(e.target.value)
  }
  const handlePriceChage = (e) => {
    setprice(e.target.value)
  }
  const handleDateChange = (expiryDate) => {
    setdate(expiryDate)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    createCoupons({name, expiryDate, discount}, user.token)
      .then((res) => {
        toast.success(`${name}  is created`)
        listallCoupons()
      })
      .catch((err) => {
        toast.error("There is some issue while creating token")
      })
  }

  const listallCoupons = () => {
    listCoupons()
      .then((res) => {
        setcoupons(res.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Error While fetching the Coupons")
      })
  }

  const handleDelete = (e) => {
    deleteCoupons(e._id, user.token)
      .then((res) => {
        if (res.data.ok)
          toast.success(<p>coupon {e.name} deleted successfully</p>)
        listallCoupons()
      })
      .catch((err) => {
        toast.error("Error deleting the coupon")
        console.log(err.message)
      })
  }
  return (
    <DashboardPageWrapper>
      {/* <AdminNav /> */}
      <SliderCompoment />

      <div className="col-md-8">
        <h1>Create A New Coupon</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h6>Name</h6>
          </label>
          <input
            className="form form-control"
            value={name}
            onChange={handleNameChage}
          />
          <label className="mt-3">
            <h6>Discount %</h6>
          </label>
          <input
            className="form form-control"
            value={discount}
            onChange={handlePriceChage}
          />
          <label className="mt-3">
            <h6>Expiry Date</h6>
          </label>
          <div>
            <DatePicker
              value={expiryDate}
              format={"yyyy-MM-dd"}
              onChange={handleDateChange}
              clearIcon={false}
              dayPlaceholder={"dd"}
              yearPlaceholder={"yyyy"}
              monthPlaceholder={"mm"}
              yearAriaLabel={"Year"}
            ></DatePicker>
          </div>
          <button className="btn btn-raised  mt-4 btn-outline-success">
            Save
          </button>
        </form>
        {coupons && coupons.length ? (
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Discount</th>
                <th scope="col">expiryDate</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => {
                return (
                  <tr>
                    <td>{c.name}</td>
                    <td>{c.discount}</td>
                    <td>{new Date(c.expiryDate).toLocaleDateString()}</td>
                    <td>
                      <DeleteOutlined
                        className="text-danger"
                        style={{cursor: "pointer"}}
                        onClick={(e) => handleDelete(c)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="text text-center">
            <h3> No Coupon Found </h3>
          </div>
        )}
      </div>
    </DashboardPageWrapper>
  )
}

export default CouponPage
