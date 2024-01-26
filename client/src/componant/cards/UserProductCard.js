import React from 'react'
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import imageurl from '../../images/hplaptop.jpg'
import { Ratingaverage } from '../../functions/Ratingaverage';
const UserProductCard = ({ product }) => {
    const { Meta } = Card;
    const { title, images, description, slug } = product
    


    return (
        <div>


{product && product.ratings && product.ratings.length > 0
            ? <div className='text text-center pb-3' >{Ratingaverage(product)}</div>
            : <h3 className="text text-center pb-3 ">No ratings yet</h3>}
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
