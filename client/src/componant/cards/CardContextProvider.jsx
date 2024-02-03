import React, {createContext} from "react"
import {useDispatch} from "react-redux"
import {addToCart} from "../../reducers/CartReducer"

export const CardContext = createContext(null)
const CardContextProvider = (props) => {
  const dispatch = useDispatch()
  const {children} = props
  const handleCartClick = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart"))
    let arr = []
    // if the cart in localstorage is empty then add the product in cart
    if (cart == null) {
      arr.push({...product, count: 1})
    }
    // if there is some product in card then find out if its current selected product or some other products
    else if (cart !== null && cart !== undefined) {
      arr = cart
      const isProductExist = arr.find((ele) => {
        return ele._id == product._id
      })
      //if product already exists then increase the count
      if (!!isProductExist) {
        arr.map((p) => {
          if (p._id == product._id) {
            p.count++
          }
        })
      }
      //if product does not exists then add that product
      if (!isProductExist) {
        arr.push({...product, count: 1})
      }
    }
    dispatch(addToCart(arr))
    localStorage.setItem("cart", JSON.stringify(arr))
  }

  return (
    <CardContext.Provider value={{handleCartClick}}>
      {children}
    </CardContext.Provider>
  )
}

export default CardContextProvider
