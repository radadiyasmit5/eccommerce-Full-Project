import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { removeproduct } from '../../functions/product';
import { Link } from 'react-router-dom';
import imageurl from '../../images/hplaptop.jpg'
const { Meta } = Card;

export const ProductCard = ({ product, handledelete }) => {

    const { title, description, images, slug } = product
    const { user } = useSelector((state) => ({ ...state }))
    const [loading, setloading] = useState(false)

    



    return (


        <Card
            cover={<img
                src={images && images.length ? images[0].url : imageurl}
                style={{ height: "200px", objectFit: "cover" }}
                className='p-1'

            />}
            actions={[
                <Link to={`/admin/updateproduct/${slug}`} >
                    <EditOutlined className=' text-warning' />
                </Link >
                , <DeleteOutlined className=' text-danger' onClick={() => handledelete(title, images)} />]}

        >
            <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
        </Card>



    )
}


