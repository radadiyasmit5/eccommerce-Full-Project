import React from 'react'
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const UserProductCard = ({ product }) => {
    const { Meta } = Card;
    const { title, images, description, slug } = product
    const imageurl = "https://res.cloudinary.com/dmkl55vi6/image/upload/v1641916767/v3uefsumh6hxau8grl7m.jpg"


    return (
        <div>



            <Card

                hoverable

                cover={

                    <img alt="example" src={images && images.length ? images[0].url : imageurl}
                        style={{ height: "200px", objectFit: "cover" }}
                        className='p-1'

                    />

                }
                actions={[
                    <Link to={`/product/${slug}`} >
                        <EyeOutlined className=' text-warning' />
                    </Link >
                    , <ShoppingCartOutlined className=' text-danger' />]}

            >
                <Meta title={title} description={description} />
            </Card>
        </div >
    )
}

export default UserProductCard
