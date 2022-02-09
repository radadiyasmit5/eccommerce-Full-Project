import React, { useEffect, useState } from 'react'
import Jumbotron from '../componant/cards/Jumbotron';
import UserProductCard from '../componant/cards/UserProductCard';
import { getproductbycount } from '../functions/product'
import { LoadingCard } from "../componant/cards/LoadingCard"
export const Home = () => {


    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        getproductsbycount();

    }, [])

    const getproductsbycount = () => {
        setloading(true)
        getproductbycount(3).then(res => {
            setproducts(res.data)
            setloading(false)
        })
    }



    return (
        <>

            <div className='jumbotron p-5 text-center text text-danger h1 font-weight-bold bg-light'   >
                <Jumbotron text={['new arrivals', 'best sellers']} />
            </div>

            <div className='container'>
                {loading ? <LoadingCard count={3} /> : <div className='row' >
                    {
                        products.map(product => (

                            <div className='col-md-4' key={product._id}>
                                <UserProductCard product={product} />
                            </div>
                        ))
                    }

                </div>}

            </div>
        </>
    )
}

export default Home