import React from 'react'
import { useState, useEffect } from 'react';
import dotenv from 'dotenv'
// firebase authantication
import { auth } from '../../firebase';
import { useHistory } from 'react-router';
// for notifications
import { toast } from 'react-toastify';
import { authfunction } from '../../functions/Axios'
import { useDispatch, useSelector } from 'react-redux'

export const Register = () => {
  const dispatch = useDispatch()

  const state = useSelector((state) => ({ ...state }))

  let history = useHistory()

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("")
  console.log(window.localStorage.getItem("email"));
  useEffect(() => {
    setEmail(window.localStorage.getItem("email"))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let ascii = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})");
    if (!email && !password) {
      toast.error("email and password are require")
      return;
    }

    if (!ascii.test(password)) {
      toast.error(" password length should be more than 8 alphabets or number and must contain atleast one special character and one capital latter")
      return;
    }
    try {
      auth.signInWithEmailLink(email, window.location.href).then((async result => {
        console.log(result);
        if (result.user.emailVerified) {
          //remove user from local storage
          window.localStorage.removeItem("email")
          //set userid tocke
          let user = auth.currentUser
          user.updatePassword(password)
          const idtockenresult = await user.getIdTokenResult()

          //set redux
          authfunction(idtockenresult.token).then((result) => {
            console.log(result);
            if (result) {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: result.data.name,
                  email: result.data.email,
                  token: idtockenresult.token,
                  _id: result.data._id,
                  role: result.data.role
                }
              })
            }
          })
          //redirect
          history.push("/")
        }
      }))
    } catch (e) {
      toast.error(e.message)
    }
  };





  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        disabled
      />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        autoFocus
      />

      <button type="submit" className="btn btn-outline-primary mt-3">
        complete Registration
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