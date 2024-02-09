import React from "react"
import {Switch, Route} from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Home from "./pages/Home"
import Header from "./componant/nav/Header"
import CompleteRegistration from "./pages/auth/CompleteRegistration"
import {useEffect} from "react"
//for notification
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

//auth for getting user info
import {auth} from "./firebase"

//dispatch from redux
import {useDispatch, useSelector} from "react-redux"

import {Forgotpassword} from "./pages/auth/Forgotpassword"
import {currentuser} from "./functions/Axios"
import History from "./pages/user/History"
import Userroutes from "./componant/routes/Userroutes"
import {Password} from "./pages/user/Password"
import {Wishlist} from "./pages/user/Wishlist"
import Adminroute from "./componant/routes/Adminroute"
import {Admindashboard} from "./pages/admin/Admindashboard"
import {CatagoryCreate} from "./pages/admin/catagory/CatagoryCreate"
import {Updatecatagory} from "./pages/admin/catagory/Updatecatagory"
import {Subcreate} from "./pages/admin/sub/Subcreate"
import {Subupdate} from "./pages/admin/sub/Subupdate"
import {CreateProducts} from "./pages/admin/products/CreateProducts"
import {ListofAllProducts} from "./pages/admin/products/ListofAllProducts"
import {UpdateProduct} from "./pages/admin/products/UpdateProduct"
import Products from "./pages/Products"
import CategoryPage from "./pages/category/CategoryPage"
import SubCategory from "./pages/subcategory/SubCategory"
import Shop from "./pages/shop/Shop"
import {Cart} from "./pages/cart/Cart"
import SlideDrawer from "./componant/SlideDrawer"
import Checkout from "./pages/checkout/Checkout"
import CouponPage from "./pages/coupon/CouponPage"

export const App = ({history, match}) => {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => ({...state}))
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult()

        currentuser(idToken.token)
          .then((result) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: result.data.name,
                email: result.data.email,
                token: idToken.token,
                _id: result.data._id,
                role: result.data.role,
              },
            })
          })
          .catch((err) => {
            console.log(err)
          })
        return () => unsubscribe()
      }
    })
  }, [dispatch])

  return (
    <>
      <Header />
      <SlideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/register/complete"
          component={CompleteRegistration}
        />
        <Route exact path="/forgot/password" component={Forgotpassword} />
        <Userroutes exact path="/user/history" component={History} />
        <Userroutes exact path="/user/password" component={Password} />
        <Userroutes exact path="/user/wishlist" component={Wishlist} />
        <Adminroute exact path="/admin/dashboard" component={Admindashboard} />
        <Adminroute exact path="/admin/catagory" component={CatagoryCreate} />
        <Adminroute
          exact
          path="/admin/catagory/:slug"
          component={Updatecatagory}
        />
        <Adminroute exact path="/admin/subcatagory" component={Subcreate} />
        <Adminroute
          exact
          path="/admin/subcatagory/:slug"
          component={Subupdate}
        />
        <Adminroute exact path="/admin/product" component={CreateProducts} />
        <Adminroute
          exact
          path="/admin/products"
          component={ListofAllProducts}
        />
        <Adminroute
          exact
          path="/admin/updateproduct/:slug"
          component={UpdateProduct}
        />
        <Adminroute exact path="/admin/coupon" component={CouponPage} />
        <Route exact path="/product/:slug" component={Products} />
        <Route exact path="/category/:slug" component={CategoryPage} />
        <Route exact path="/subs/:slug" component={SubCategory} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
      </Switch>
    </>
  )
}

export default App
