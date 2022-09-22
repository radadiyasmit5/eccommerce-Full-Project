import { Card, Descriptions } from "antd";
import { Carousel } from "react-responsive-carousel";
import React, { useState, useEffect } from "react";
import { listallproductsbyslug, starrating } from "../functions/product";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Tabs } from "antd";
import Singalproductcard from "../componant/cards/Singalproductcard";
import { useSelector } from "react-redux";
import { related_products } from "../functions/product";
import UserProductCard from "../componant/cards/UserProductCard";
const { TabPane } = Tabs;
const Products = ({ match }) => {
  const [products, setproducts] = useState([]);
  const [star, setstar] = useState(0);
  const [relatedproduct, setrelatedproduct] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getproductbyslug(match.params.slug);
 
  }, [match.params.slug]);



  useEffect(() => {
    if (products.ratings && user) {
      const existingratingobj = products.ratings.find(
        (p) => user._id.toString() === p.postedBy.toString()
      );

      existingratingobj && setstar(existingratingobj.star);
    }
  });

  const getproductbyslug = (slug) => {
    listallproductsbyslug(slug).then((res) => {
      setproducts(res.data);

      related_products(res.data._id).then((res) => {
        setrelatedproduct(res.data);
      });
    });
  };

  const handlechange = (newrating, name) => {
    starrating(name, newrating, user.token).then((res) => {
      getproductbyslug(match.params.slug);
    });
    setstar(newrating);
  };

  return (
    <>
      <div className="column md-5 mb-5">
        <div>
          <Singalproductcard
            product={products}
            handlechange={handlechange}
            star={star}
          />
        </div>
        <div className="row">
          <div className="column md-5 mb-5">
            <hr />
            <h4 className="text-center">Related products</h4>
          </div>
        </div>

        <div className="row pb-5">
          {relatedproduct.length
            ? relatedproduct.map((r) => (
                <div className="col">
                  <UserProductCard product={r} />
                </div>
              ))
            : "No products"}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Products;
