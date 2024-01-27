import React from "react";
import { useState } from "react";
import { Card, Descriptions } from "antd";
import { Carousel } from "react-responsive-carousel";
import { Tabs } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Meta } from "antd/lib/list/Item";
import { ListofAllProducts } from "../../pages/admin/products/ListofAllProducts";
import Listofproduct from "./Listofproduct";
import imageurl from "../../images/hplaptop.jpg";
import StarsRating from "react-star-ratings";
import { StarsRatingmodal } from "../modal/StarsRatingmodal";
import { Ratingaverage } from "../../functions/Ratingaverage";
const Singalproductcard = ({ product, handlechange, star,updateStartRatings }) => {
  const { TabPane } = Tabs;
  const { images, description, title, slug, _id } = product;
  console.log(images);
  return (
    <div className="row">
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <div key={i.public_id}>
                  <img src={i.url} />
                </div>
              ))}
          </Carousel>
        ) : (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {imageurl && (
              <div>
                <img src={imageurl} />
              </div>
            )}
          </Carousel>
        )}
        <div className="pb-5 m-2">
          <Tabs>
            <TabPane tab="Description" key="1">
              {description}
            </TabPane>
            <TabPane tab="More" key="2">
              For more detains call on this number xxx xxx xxxx
            </TabPane>
          </Tabs>
        </div>
      </div>

      <div className="col-md-4 pt-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <Link to="/">
              <ShoppingCartOutlined className=" text-warning" />
            </Link>,
            <HeartOutlined className=" text-danger" />,
            <StarsRatingmodal updateStartRatings={updateStartRatings}>
              <StarsRating
                name={_id}
                size={30}
                numberOfStars={5}
                starRatedColor={"red"}
                rating={star}
                changeRating={(value, name) => handlechange(value, name)}
                isSelectable={true}
              />
            </StarsRatingmodal>,
          ]}
        >
          {product && product.ratings && product.ratings.length > 0
            ? Ratingaverage(product)
            : <h3 className="text text-center ">No ratings yet</h3>}
          <Listofproduct product={product} />
        </Card>
      </div>
    </div>
  );
};

export default Singalproductcard;
