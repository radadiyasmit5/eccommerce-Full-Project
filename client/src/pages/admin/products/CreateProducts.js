import React, {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import {toast} from "react-toastify"
import ProductsForm from "../../../componant/forms/ProductsCreateForm"
import {AdminNav} from "../../../componant/nav/AdminNav"
import {createproduct} from "../../../functions/product"
import {catagorieslist} from "../../../functions/Catagory"
import {subcatagoryfindbyid} from "../../../functions/Sub"
import {FileUpload} from "../../../componant/forms/FileUpload"
import {LoadingOutlined} from "@ant-design/icons"
import SliderCompoment from "../../../componant/nav/SliderCompoment"
import DashboardPageWrapper from "../../../componant/DashboardPageWrapper"
import { DashboardPageHeading } from "../../../componant/DashboardPageHeading"
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  catagories: [],
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  color: "",
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  brand: "",
}
export const CreateProducts = () => {
  const {user} = useSelector((state) => ({...state}))
  const [value, setvalue] = useState(initialState)
  const [loading, setloading] = useState(false)
  const [sub, setsub] = useState([])
  const [showsub, setshowsub] = useState(false)

  useEffect(() => {
    loadcatagories()
  }, [])

  const loadcatagories = () => {
    catagorieslist()
      .then((res) => {
        setvalue({...value, catagories: res.data})
      })
      .catch((err) => {})
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    setloading(true)

    createproduct(value, user.token)
      .then((res) => {
        // toast.success("product created successfully")
        setloading(false)

        window.alert(`${res.data.title} is created `)
        window.location.reload()
      })
      .catch((err) => {
        toast.error(err.response.data.err)
        setloading(false)
      })
  }
  const handlechange = (e) => {
    e.preventDefault()
    setvalue({...value, [e.target.name]: e.target.value})
  }

  const handlecatagories = (e) => {
    e.preventDefault()
    setvalue({...value, subs: [], category: e.target.value})
    subcatagoryfindbyid(e.target.value).then((res) => {
      setsub(res.data)
    })

    setshowsub(true)
  }

  return (
    <DashboardPageWrapper>
      {/* <AdminNav /> */}
      <SliderCompoment isAdmin={true}/>
      <div className="col slider-rightSide-container">
        <div className="lable">
          {" "}
          {loading ? (
            <LoadingOutlined className="text-danger X-large" />
          ) : (
           <DashboardPageHeading heading={'Product Create'} />
          )}{" "}
        </div>
        <div className="p-3">
          <FileUpload
            value={value}
            setvalue={setvalue}
            setloading={setloading}
          />
        </div>
        <br />
        {loading ? <h4 className="text text-danger"> Loading... </h4> : ""}
        <ProductsForm
          handlechange={handlechange}
          handlesubmit={handlesubmit}
          value={value}
          handlecatagories={handlecatagories}
          sub={sub}
          setvalue={setvalue}
          showsub={showsub}
        />
      </div>
    </DashboardPageWrapper>
  )
}
