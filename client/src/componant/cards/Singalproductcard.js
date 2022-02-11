import React from 'react'
import { Card, Descriptions } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import { Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Meta } from 'antd/lib/list/Item';
import { ListofAllProducts } from '../../pages/admin/products/ListofAllProducts';
import Listofproduct from './Listofproduct';
const imageurl = "https://res.cloudinary.com/dmkl55vi6/image/upload/v1641916767/v3uefsumh6hxau8grl7m.jpg"

const Singalproductcard = ({ product }) => {
    const { TabPane } = Tabs;
    const { images, description, title, slug } = product
    return (
        <div className='row'>
            <div className='col-md-7'>
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop >
                        {images && images.map((i) => <div>
                            <img src={i.url} />
                        </div>)}



                    </Carousel>) : (
                    <Card
                        cover={

                            <img alt="example" src={imageurl}
                                style={{ height: "200px", width: "200px", objectFit: "cover" }}
                                className='p-1'

                            />

                        } />

                )}
                <div className='pb-5 m-2'>
                    <Tabs >
                        <TabPane tab="Description" key="1">
                            {description}
                        </TabPane>
                        <TabPane tab="More" key="2">
                            For more detains call on this number xxx xxx xxxx
                        </TabPane>

                    </Tabs>

                </div>
            </div>
            <div className='col-md-4 pt-5'>
                <h1 className='bg-info p-3'>{title}</h1>
                <Card

                    actions={[
                        <Link>
                            <ShoppingCartOutlined className=' text-warning' />
                        </Link >
                        , <HeartOutlined className=' text-danger' />,
                        <StarOutlined className='text-danger' />
                    ]}

                >
                    <Listofproduct product={product} />
                </Card>
            </div>
        </div>
    )
}

export default Singalproductcard