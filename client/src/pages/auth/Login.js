import React from "react";
import { useState, useEffect } from "react";

// firebase authantication
import { auth, googleAuthProvider } from "../../firebase";
import { DownloadOutlined, GoogleOutlined } from "@ant-design/icons";
// for notifications
import "antd/dist/antd.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { authfunction } from "../../functions/Axios";
import { useHistory } from "react-router-dom";
export const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

let intended = history.location.state

  const rolebasedredirect = (result) => {
    if (intended) {
        console.log(intended);
        history.push(intended)
    }
     else if (result.data.finduser.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/dashboard");
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idtokenresult = await user.getIdTokenResult();
      console.log(result);
      authfunction(idtokenresult.token)
        .then((result) => {
       
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: result.data.finduser.name,
              email: result.data.finduser.email,
              token: idtokenresult.token,
              _id: result.data.finduser._id,
              role: result.data.finduser.role,
            },
          });
          rolebasedredirect(result);
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(idtokenresult.token);

      // history.push("/")
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setloading(false);
    }
  };
  const Logingoogle = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idtokenresult = user.getIdTokenResult;
        authfunction(idtokenresult.token).then((result) => {
        
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: result.data.name,
              email: result.data.email,
              token: idtokenresult.token,
              id: result.data._id,
              role: result.data.role,
            },
          });
        });
        history.push("/");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control mb-3"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>

      <button
        type="primary submit"
        //    onClick={handleSubmit}

        className="btn btn-primary mt-3 btn-primary btn-block"
        shape="round"
        size="large"
        style={{ width: "100%", display: "block", borderRadius: "10px" }}
        disabled={!email || password.length < 6}
      >
        <DownloadOutlined /> Login
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      {/* {result} */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className=" $danger" style={{ color: "red" }}>
              Loading...
            </h4>
          ) : (
            <h4 className=" $danger">Login</h4>
          )}
          {LoginForm()}
          <Button
            onClick={Logingoogle}
            type="danger submit"
            icon={<GoogleOutlined />}
            className="btn btn-danger mt-3  btn-block "
            shape="round"
            size="large"
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="text-danger p-3 float-end">
            Forgot Password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
