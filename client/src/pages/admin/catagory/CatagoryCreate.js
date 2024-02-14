import React, {useEffect} from "react"
import {AdminNav} from "../../../componant/nav/AdminNav"
import {useState} from "react"
import {
  catagorycreate,
  catagorieslist,
  catagoryremove,
} from "../../../functions/Catagory"
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import {DeleteOutlined, EditOutlined, WindowsFilled} from "@ant-design/icons"
import {Link} from "react-router-dom"
import {Localsearch} from "../../../componant/functions/Localsearch"
import SliderCompoment from "../../../componant/nav/SliderCompoment"
import DashboardPageWrapper from "../../../componant/DashboardPageWrapper"
export const CatagoryCreate = () => {
  const [name, setname] = useState("")
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState([])
  const [keyword, setkeyword] = useState("")
  const {user} = useSelector((state) => ({...state}))

  useEffect(() => {
    loadcatagories()
  }, [])

  const loadcatagories = () =>
    catagorieslist().then((res) => {
      setdata(res.data)
    })
  const handlesubmit = (e) => {
    e.preventDefault()
    setloading(true)
    catagorycreate(name, user.token)
      .then((result) => {
        setloading(false)

        if (result.data.message === "duplicate catagory") {
          toast.error(result.data.message)
        } else {
          toast.success(result.data.message)
        }

        loadcatagories()
        setname("")
      })
      .catch((err) => {
        setloading(false)
        setname("")
        toast.error(err.message)
      })
  }

  const handleremove = (slug) => {
    if (window.confirm(`${slug} will be deleted`)) {
      setloading(true)

      catagoryremove(slug, user.token)
        .then((res) => {
          setloading(false)
          toast.success(
            "Catagory " + res.data.name + " " + "successfully deleted"
          )
          loadcatagories()
          setname("")
        })
        .catch((err) => {
          setloading(false)
          console.log("there is some problem while deleteing catagory")
        })
    }
  }

  const catagoryform = () => {
    return (
      <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label className="mb-3" style={{fontSize: "large"}}>
            Catagory Name
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="enter catagory name"
            autoFocus
            required
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
          <br />
          <button type="submit" className="btn btn-success mb-3">
            Save
          </button>
        </div>
      </form>
    )
  }

  const searched = (keyword) => (c) => {
    return c.name.toLowerCase().includes(keyword.toLowerCase())
  }

  return (
    <DashboardPageWrapper>
      {/* <div className='col-md-2'> */}
      {/* <AdminNav /> */}
      <SliderCompoment />
      {/* </div> */}
      <div className="col">
        <div className="col alert alert-secondary">
          {" "}
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create new Catagory</h4>
          )}
        </div>
        {catagoryform()}

        <Localsearch keyword={keyword} setkeyword={setkeyword} />
        {data.filter(searched(keyword)).map((data) => (
          <div
            className="alert alert-primary"
            style={{color: "black"}}
            key={data.slug}
          >
            {data.name}
            <span
              className="btn btn-small float-end"
              onClick={() => handleremove(data.slug)}
            >
              <DeleteOutlined className="text-danger" />
            </span>
            <Link to={`/admin/catagory/${data.slug}`}>
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
