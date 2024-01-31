import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getProductsBySubCategory } from '../../functions/product'
import UserProductCard from '../../componant/cards/UserProductCard'
const SubCategory = ({ match }) => {
    const subCategory = match.params.slug

    const [prodcuts, setprodcuts] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        getProductsBySubCategory().then((res) => {
            setprodcuts(res.data)
            setloading(false)
        }).catch((err) => {
            console.log('Error: ', err);
            setloading(false)
            toast.error("There are some issue fetching prodcuts")
        })
    }, [])

    return (
        <div>
            <div className='  jumbotron p-3 text-center display-4  h4  mb-5 mt-5 bg-light'   >
                Products in "{subCategory}" Sub Category
            </div>
            <div className="row pb-5">
                {loading ? <h4 className='text-danger text-center'>Loading...</h4> : prodcuts.length
                    ? prodcuts.map((r) => (
                        <div className="col" key={r._id}>
                            <UserProductCard product={r} />
                        </div>
                    ))
                    : (<div className="text-center col">No Products Found</div>)}
            </div>
        </div>
    )
}

export default SubCategory