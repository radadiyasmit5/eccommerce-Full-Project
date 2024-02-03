import React, {useContext} from "react"
import {Card} from "antd"
import {EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"
import imageurl from "../../images/hplaptop.jpg"
import {Ratingaverage} from "../../functions/Ratingaverage"
import {useDispatch, useSelectore} from "react-redux"
import {addToCart} from "../../reducers/CartReducer"
import CardContextfile, {CardContext} from "./CardContextProvider"
import CardContextProvider from "./CardContextProvider"
const UserProductCard = ({product}) => {
  const {Meta} = Card
  const {title, images, description, slug, price} = product
  const dispatch = useDispatch()

  const {handleCartClick} = useContext(CardContext)
  
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        Ratingaverage(product)
      ) : (
        <div className="text text-center pb-3 ">No ratings yet</div>
      )}
      <Card
        hoverable
        // loading
        cover={
          <img
            alt="example"
            src={images && images.length ? images[0].url : imageurl}
            style={{height: "150px", objectFit: "contain"}}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className=" text-warning" />
          </Link>,
          <a onClick={() => handleCartClick(product)}>
            <ShoppingCartOutlined className=" text-danger" />
          </a>,
        ]}
      >
        <Meta title={`${title} - $${price}`} description={description} />
      </Card>
    </>
  )
}

export default UserProductCard
