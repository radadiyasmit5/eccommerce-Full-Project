import React, { useState, useEffect } from 'react'
import { getProductsByCategory } from '../../functions/product'
import { catagorieslist } from '../../functions/Catagory'
import UserProductCard from '../../componant/cards/UserProductCard'
import { toast } from 'react-toastify'

const CategoryPage = ({ match }) => {

    const CategoryName = match?.params?.slug
    const [prodcuts, setprodcuts] = useState([])
    const [prodcutsCount, setprodcutsCount] = useState(0)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        getProductsByCategory(CategoryName).then((res) => {
            setprodcuts(res.data)
            setprodcutsCount(res.data.length)
            setloading(false)
        }).catch((err) => {
            console.log('error :', err)
            setloading(false)
            toast.error('There are some issues while fetching the product')
        })
    }, [])

    return (
        <div>
            <div className='  jumbotron p-3 text-center display-4  h4  mb-5 mt-5 bg-light'   >
                {prodcutsCount} Products in "{CategoryName}" Category
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

export default CategoryPage