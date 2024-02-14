import React, {useEffect} from "react"
import {AdminNav} from "../../../componant/nav/AdminNav"
import {useState} from "react"
import {catagorieslist} from "../../../functions/Catagory"
import {
  subcatagorycreate,
  subcatagorieslist,
  subcatagoryremove,
  subcatagoryfindbyid,
} from "../../../functions/Sub"
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import {DeleteOutlined, EditOutlined, WindowsFilled} from "@ant-design/icons"
import {Link} from "react-router-dom"
import {Localsearch} from "../../../componant/functions/Localsearch"
import {Catagoryform} from "../../../componant/forms/Catagoryform"
import SliderCompoment from "../../../componant/nav/SliderCompoment"
import DashboardPageWrapper from "../../../componant/DashboardPageWrapper"
export const Subcreate = () => {
  const [name, setname] = useState("")
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState([])
  const [subcatagorydata, setsubcatagorydata] = useState([])
  const [id, setid] = useState("")
  const [subcatagorydatasortedbycatagory, setsubcatagorydatasortedbycatagory] =
    useState([])
  const [keyword, setkeyword] = useState("")

  const {user} = useSelector((state) => ({...state}))

  useEffect(() => {
    loadcatagories()
  }, [])

  useEffect(() => {
    if (id == "") {
      loadsubcatagory()
    } else {
      loadsubcatagorybyid(id)
    }
  }, [id])
  const loadcatagories = () =>
    catagorieslist().then((res) => {
      setdata(res.data)
    })

  const loadsubcatagory = () =>
    subcatagorieslist().then((res) => {
      setsubcatagorydata(res.data)
    })

  const loadsubcatagorybyid = (id) => {
    subcatagoryfindbyid(id).then((res) => {
      setsubcatagorydatasortedbycatagory(res.data)
    })
  }

  let subdata
  if (id == "") {
    subdata = subcatagorydata
  } else {
    subdata = subcatagorydatasortedbycatagory
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    setloading(true)
    subcatagorycreate(name, user.token, id)
      .then((result) => {
        setloading(false)

        if (result.data.message === "subcatagory created successfully") {
          toast.success(result.data.message)
        } else {
          toast.error(result.data.message)
        }
        if (id == "") {
          loadsubcatagory()
        } else {
          loadsubcatagorybyid(id)
        }

        setname("")
      })
      .catch((err) => {
        setloading(false)
        setname("")
        toast.error(err.message)
      })
  }

  const searched = (keyword) => (c) => {
    return c.name.toLowerCase().includes(keyword.toLowerCase())
  }

  const handleremove = (slug) => {
    if (window.confirm("Are you sure you want to delet this subcatagory ?")) {
      setloading(true)
      subcatagoryremove(slug, user.token, id)
        .then((res) => {
          setloading(false)
          toast.success(
            "Subcatagory " + res.data.name + " " + "successfully deleted"
          )
          if (id == "") {
            loadsubcatagory()
          } else {
            loadsubcatagorybyid(id)
          }
          setname("")
        })
        .catch((err) => {
          setloading(false)
          toast.error(err.message)
        })
    }
  }
  return (
    <DashboardPageWrapper>
      {/* <AdminNav /> */}
      <SliderCompoment />

      <div className="col">
        <div className="col alert alert-secondary">
          {" "}
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create new SubCatagory</h4>
          )}
        </div>

        <select
          className="form-control"
          onChange={(e) => setid(e.target.value)}
        >
          <option value="">Select Catagory</option>
          {data.map((c) => (
            <option value={c._id}>{c.name}</option>
          ))}
        </select>

        <br />

        {
          <Catagoryform
            handlesubmit={handlesubmit}
            setname={setname}
            name={name}
          />
        }

        <Localsearch keyword={keyword} setkeyword={setkeyword} />

        {subdata.filter(searched(keyword)).map((c) => (
          <div
            className="alert alert-primary"
            style={{color: "black"}}
            key={c.slug}
          >
            {c.name}
            <span
              className="btn btn-small float-end"
              onClick={() => handleremove(c.slug)}
            >
              <DeleteOutlined className="text-danger" />
            </span>
            <Link to={`/admin/subcatagory/${c.slug}`}>
              <span className="btn btn-small float-end">
                <EditOutlined className="text-warning" />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </DashboardPageWrapper>
  )
}
