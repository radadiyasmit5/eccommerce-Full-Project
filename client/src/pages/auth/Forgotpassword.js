import React from 'react'

import { useState,useEffect } from 'react';
import dotenv from 'dotenv'
// firebase authantication
import { auth } from '../../firebase';
import { useHistory } from 'react-router';
// for notifications
 import {  toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const Forgotpassword = ({history}) => {
 const [email, setemail] = useState("")
    const [loading, setloading] = useState(false)
    
  let { user } = useSelector((state) => ({ ...state }))
  
  useEffect(() => {
       if(user&&user.token) history.push("/")
     }, [user,history])
    

    
   

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
          const config = {
          url: process.env.REACT_APP_FORGOT_PASSWORD,
          handleCodeInApp: true,
        }
        await auth.sendPasswordResetEmail(email,config ).then(() => {
            setemail("")
            setloading(false)
            toast.success("Email has been sent to your email address")
        }).catch((e) => {
             setloading(false)
           toast.error(e.message)
       })

       
        

    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
{loading?<h4 className="text-danger">Loading...</h4>:<h4>Forgot password</h4>}
            <form onSubmit={handleSubmit} className="form-control">
                <input type="email"
                className="form-control "
                    value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="type your email here" autoFocus></input>
                <br/>
                <button type="submit" disabled={!email} className="btn btn-primary" >Submit</button>
         </form>
        </div>
    )
}
