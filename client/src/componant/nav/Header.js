import React from "react"
import {Badge, Menu} from "antd"
import {
  AppstoreOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingTwoTone,
  UserAddOutlined,
  UserOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import firebase from "firebase"
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router"
import "../../index.css"
import Search from "../forms/Search"
import {useRef} from "react"
import {getCart, selectCart} from "../../reducers/CartReducer"
import {displatchToggleSideBar} from "../../reducers/LayoutReducer"
import './AdminNav.css'
const {SubMenu} = Menu
const {Item} = Menu

export const Header = () => {
  //usestates
  const [current, setcurrent] = useState("home")
  const submenueRef = useRef(null)

  let history = useHistory() //history
  let {user, layout} = useSelector((state) => ({...state}))
  let dispatch = useDispatch()
  let cart = useSelector(selectCart)
  const handleClick = (e) => {
    setcurrent(e.key)
  }

  const handleLogout = () => {
    firebase.auth().signOut()
    dispatch({
      type: "LOGOUT",
      payload: null,
    })
    history.push("/login")
  }

  const handleSidebarbtnClick = () => {
    dispatch(displatchToggleSideBar("isSideBarOpen", !layout.isSideBarOpen))
  }
  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="headerMenuContainer">
        <div
          // style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
          className="d-flex justify-content-between w-100 headerMenu"
        >
          <div className="d-flex">
            <Item
              key="home"
              icon={
                <button onClick={handleSidebarbtnClick} className='btn btn-raised '>
                  <MenuFoldOutlined />
                </button>
              }
              className="float-start ml-2"
            ></Item>

            <Item
              key="home"
              icon={<AppstoreOutlined />}
              className="float-start"
            >
              <Link to="/">Home</Link>
            </Item>
            <Item key="home" icon={<ShoppingTwoTone />} className="float-start">
              <Link to="/shop">Shop</Link>
            </Item>
            <Item
              key="Cart"
              icon={<ShoppingCartOutlined />}
              className="float-start"
            >
              <Link to="/cart">
                <Badge
                  offset={[10, 0]}
                  count={cart && cart.length ? cart.length : ""}
                >
                  Cart
                </Badge>
              </Link>
            </Item>

            {user && (
              <SubMenu
                key="submenue"
                icon={<SettingOutlined />}
                title={user.email && user.email.split("@")[0]}
                className="float-start dashboardSubMenu"
                ref={submenueRef}
              >
                {user && user.role === "subscriber" && (
                  <Item>
                    {" "}
                    <Link to="/user/history">Dashboard</Link>{" "}
                  </Item>
                )}
                {user && user.role === "admin" && (
                  <Item>
                    {" "}
                    <Link to="/admin/dashboard">Dashboard</Link>{" "}
                  </Item>
                )}
              </SubMenu>
            )}
          </div>
          <div className="d-flex justify-content-between mr-3">
            <span>
              <Search />
            </span>

            {!user && (
              <Item key="register" icon={<UserAddOutlined />}>
                <Link to="/register">Register</Link>
              </Item>
            )}

            {!user && (
              <Item key="login" icon={<UserOutlined />}>
                <Link to="/login">Login</Link>
              </Item>
            )}

            {user && (
              <Item key="logout" icon={<UserOutlined />} onClick={handleLogout}>
                Logout
              </Item>
            )}
          </div>
        </div>
      </Menu>
    </>
  )
}

export default Header
