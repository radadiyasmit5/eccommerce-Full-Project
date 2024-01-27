import React from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import '../../index.css'

const { SubMenu } = Menu
const { Item } = Menu




export const Header = () => {
  //usestates
  const [current, setcurrent] = useState("home")


  let history = useHistory();  //history 


  let { user } = useSelector((state) => ({ ...state }))
  let dispatch = useDispatch();

  const handleClick = (e) => {
    setcurrent(e.key)
  }

  const handleLogout = () => {
    firebase.auth().signOut()
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    history.push("/login");
  }



  return (


    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">

      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {user && (<SubMenu key="submenue" icon={<SettingOutlined />} title={(user.email && user.email.split("@")[0])}>
        {user && user.role === "subscriber" && <Item> <Link to="/user/history">Dashboard</Link> </Item>}
        {user && user.role === "admin" && <Item> <Link to="/admin/dashboard">Dashboard</Link> </Item>}

      </SubMenu>)}

      {!user && (<Item key="register" icon={<UserAddOutlined />} style={{ position: 'absolute', right: "0%" }} >
        <Link to="/register">Register</Link>
      </Item>)}


      {!user && (<Item key="login" icon={<UserOutlined />} style={{ position: 'absolute', right: "7%" }} >
        <Link to="/login">Login</Link>
      </Item>)}

      {user && (<Item key="logout" icon={<UserOutlined />} className="float-end" onClick={handleLogout} style={{ position: 'absolute', right: "0%" }}  >
        Logout
      </Item>)}







    </Menu>
  )
}

export default Header