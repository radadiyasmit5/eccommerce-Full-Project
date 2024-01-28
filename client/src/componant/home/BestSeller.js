import React, { useEffect, useState } from 'react'

import UserProductCard from '../../componant/cards/UserProductCard';
import { getproducts } from '../../functions/product'
import { LoadingCard } from "../../componant/cards/LoadingCard"
import { Pagination } from 'antd';
import { totalproductcount } from '../../functions/product';
import { Link, useHistory } from 'react-router-dom';
export const BestSeller = () => {

    const [page, setpage] = useState(1);
    const [totalproducts, settotalproducts] = useState(0);
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(false);
    const history = useHistory()
    useEffect(() => {

        gettotalproduct()
    }, []);
    useEffect(() => {
        getproductsbycount();

    }, [page])
    const getproductsbycount = () => {
        setloading(true)
        //sort,order,page
        getproducts("sold", "desc", page).then(res => {
            setproducts(res.data)

            setloading(false)
        })
    }
    const gettotalproduct = () => {
        totalproductcount().then(res => {
            settotalproducts(res.data)

        })
    }


    return (
        <>
            <div className='container pb-5'>
                {loading ? <LoadingCard count={3} /> : <div className='row' >
                    {
                        products.map(product => (
                            // onClick={history.push(`/product/${product.slug}`)}

                            <div className='col-md-4' key={product._id} >
                                <Link to={`/product/${product.slug}`}>
                                    <UserProductCard product={product} />
                                </Link>
                            </div>

                        ))
                    }

                </div>}

            </div>

            <div className='row'>

                <nav className='col-md-4 offset-md-4 text-center pt-5 p-3'>

                    <Pagination total={(totalproducts / 3) * 10} current={page} onChange={(value) => {

                        setpage(value)
                    }} />
                </nav>
            </div>
        </>
    )
}

export default BestSeller