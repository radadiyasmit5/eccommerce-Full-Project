import React, { useEffect } from 'react'
import { AdminNav } from '../../../componant/nav/AdminNav'
import { useState } from 'react';
import { catagoryupdate } from '../../../functions/Catagory';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { Link } from 'react-router-dom';
export const Updatecatagory = ({ history, match }) => {
    const [name, setname] = useState("");
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState([])
    const { user } = useSelector((state) => ({ ...state }))



    useEffect(() => {

        setname(match.params.slug)

    }, [])

    const handlesubmit = (e) => {

        e.preventDefault()
        setloading(true)
        catagoryupdate(name, match.params.slug, user.token).then((result) => {
            setloading(false)
            setname('')
            toast.success(result.data.message)
            history.push("/admin/catagory")
        }).catch((err) => {
            setloading(false)
            setname('')
            toast.error(err.message)
        })
    }



    const catagoryform = () => {

        return (<form onSubmit={handlesubmit}>
            <div className="form-group">
                <label className='mb-3' style={{ fontSize: "large" }} >Catagory Name</label>
                <br />
                <input type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="enter catagory name"
                    autoFocus
                    required
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                />
                <br />
                <button type="submit" className="btn btn-success mb-3">Save</button>
            </div>
        </form>)

    }
    return (

        <div className="container-fluid">
            <div className="row" style={{}}>
                <div className='col-md-2'>
                    <AdminNav />

                </div>
                <div className='col'>
                    <div className='col alert alert-secondary' > {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4 >Update Catagory</h4>)}</div>
                    {catagoryform()}
                </div>
            </div>


        </div>


    )
}
