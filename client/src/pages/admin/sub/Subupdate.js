import React, {useEffect} from "react"
import {AdminNav} from "../../../componant/nav/AdminNav"
import {useState} from "react"
import {catagoryupdate, catagorieslist} from "../../../functions/Catagory"

import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"
import {Catagoryform} from "../../../componant/forms/Catagoryform"
import {
  subcatagoryupdate,
  subcatagorybyslug,
  subcatagoryfindbyid,
} from "../../../functions/Sub"
import SliderCompoment from "../../../componant/nav/SliderCompoment"
import DashboardPageWrapper from "../../../componant/DashboardPageWrapper"
import { DashboardPageHeading } from "../../../componant/DashboardPageHeading"
export const Subupdate = ({history, match}) => {
  const [name, setname] = useState("")
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState([])
  const [id, setid] = useState("")
  const [catagory, setcatagory] = useState([])
  const [parent, setparent] = useState("")
  const {user} = useSelector((state) => ({...state}))

  useEffect(() => {
    setname(match.params.slug)
    loadcatagory()
    subcatagorybyslug(match.params.slug, user.token)
      .then((res) => {
        setparent(res.data.parent)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const loadcatagory = () =>
    catagorieslist().then((res) => {
      setdata(res.data)
    })

  const handlesubmit = (e) => {
    e.preventDefault()
    if (id == "") {
      toast.error("catagory name shouldn't be empty")
    } else {
      setloading(true)
      subcatagoryupdate(name, id, match.params.slug, user.token)
        .then((result) => {
          setloading(false)
          setname("")
          toast.success(result.data.message)
          history.push("/admin/subcatagory")
        })
        .catch((err) => {
          setloading(false)
          setname("")
          toast.error(err.message)
        })
    }
  }

  return (
    <DashboardPageWrapper>
      {/* <AdminNav /> */}
      <SliderCompoment isAdmin={true}/>

      <div className="col slider-rightSide-container">
        <div className="col alert alert-secondary">
          {" "}
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
           <DashboardPageHeading heading={'Update subCatagory'} />
          )}
        </div>

        <select
          className="form-control"
          onChange={(e) => setid(e.target.value)}
        >
          <option value="">Select Catagory</option>
          {data.map((c) => (
            <option value={c._id} selected={c._id === parent}>
              {c.name}
            </option>
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
      </div>
    </DashboardPageWrapper>
  )
}
