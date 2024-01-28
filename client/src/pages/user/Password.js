import React from 'react'
import UserNav from '../../componant/nav/UserNav'
import { auth } from 'firebase'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Result } from 'antd'
import "./users.css"
export const Password = () => {

    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)

    const formsubmit = async (e) => {
        e.preventDefault()
        setloading(true)

        await auth().currentUser.updatePassword(password)
            .then((result) => {
                setloading(false)
                toast.success("password updated")
            }).catch((err) => {
                toast.error(err.message)

            })



    }
    const updatepassword = () => (

        <form onSubmit={formsubmit}>
            <div className='form-group'>
                <label className=' form-label mb-3 lable'>Update password</label>
                {loading && <h4>Loading...</h4>}
                <input
                    type="password"
                    onChange={(e) => { setpassword(e.target.value) }}
                    className='form-control mb-3 input'
                    placeholder='enter new the password'
                    disabled={loading}
                >
                </input>
                <button type='submit' className='btn btn-primary' disabled={loading || password.length < 6 || !password}>Submit</button>
            </div>
        </form>


    )


    return (<div className="container-fluid">
        <div className="row">
            <div className='col-md-2'>
                <UserNav />
            </div>
            <div className='col'>
                {updatepassword()}
            </div>
        </div>
    </div>)
}
