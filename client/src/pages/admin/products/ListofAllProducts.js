import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ProductCard } from '../../../componant/cards/ProductCard'
import { AdminNav } from '../../../componant/nav/AdminNav'
import { removeproduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export const ListofAllProducts = ({ history }) => {

    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(false)
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        loadproducts();

    }, [])
    const handledelete = (title, images) => {

        const confirm = window.confirm(`Are you sure you want to delet ${title}`)
        if (confirm) {
            setloading(true)
            removeproduct(title, images, user.token).then(res => {
                setloading(false)
                loadproducts();
                toast.success("product deleted successfully")

            }).catch(err => {
                setloading(false)
                toast.error("there is a error while deleting product")
                console.log(err.data);
            })
        }
    }


    const loadproducts = () => {
        setloading(true)
        axios.get(`${process.env.REACT_APP_API}/products/100`).then(res => {
            setloading(false)
            console.log(res.data);
            setproducts(res.data)

        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className='col-md-2'>
                    <AdminNav />

                </div>
                <div className='col-md'>
                    {loading ? <h4 className='text text-danger'>Loading...</h4> : <h1> Products </h1>}


                    <div className='row '>
                        {products.map((product) => (
                            <div className='col-md-4  pb-3' ket={product._id}>
                                <ProductCard product={product} handledelete={handledelete} />
                            </div>))}




                    </div>
                </div>
            </div>

        </div>
    )
}
