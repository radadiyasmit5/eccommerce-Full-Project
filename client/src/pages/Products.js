import { Card, Descriptions } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import React, { useState, useEffect } from 'react'
import { listallproductsbyslug } from '../functions/Product'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Tabs } from "antd";
import Singalproductcard from '../componant/cards/Singalproductcard';

const { TabPane } = Tabs;
const Products = ({ match }) => {
    const [products, setproducts] = useState([]);
    useEffect(() => {
        getproductbyslug(match.params.slug)
    }, []);

    console.log(match.params.slug);

    const getproductbyslug = (slug) => {
        listallproductsbyslug(slug).then(res => {
            setproducts(res.data)
            console.log(res.data)
        })
    }




    return (
        <div>
            <Singalproductcard product={products} />
        </div>
    )
}

export default Products