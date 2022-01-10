import React from 'react'
import { useState,useEffect } from 'react';
// firebase authantication
import { auth } from '../../firebase';
import { DownloadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
// for notifications
import { toast } from 'react-toastify';


export const Register = ({history}) => {

  const [email, setEmail] = useState("");

  let { user } = useSelector(state => ({ ...state }))
  
useEffect(() => {
  
  if (user&&user.token) {
    history.push("/")
  }
}, [user])
  
  
    const handleSubmit = async(e) => {
        e.preventDefault()
       
        const config = {
          url: process.env.REACT_APP_REGISTER_URL,
          handleCodeInApp: true,
      }
       
        auth.sendSignInLinkToEmail(email, config).then((result) => {
           console.log(result)
        }).catch((error) => {
        console.log(error);
        })
      
      
      window.localStorage.setItem("email", email)
      toast.success(`email has been send to you email address ${email}. Please verify your email address`,{position:"top-right"})
      setEmail("")
  };
  
    const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
          className="form-control"
          placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />

      <button type="submit"  
                icon={<DownloadOutlined />}
                className="btn btn-primary mt-3 btn-primary btn-block"
                shape="round" 
                size="large"
                style={{width:"100%",display:"block",borderRadius:"10px"}}>
        Register
      </button>
    </form>
  );
    return (
          <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
                    {registerForm()}
                    
        </div>
      </div>
    </div>
    )
}

export default Register