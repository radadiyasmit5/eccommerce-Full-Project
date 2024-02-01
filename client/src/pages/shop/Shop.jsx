import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UserProductCard from '../../componant/cards/UserProductCard';
import FilterSidebar from '../../componant/FilterSidebar';
import { getproductbycount, getProductsBysearchQuery } from '../../functions/product';
import { selectProducts } from '../../reducers/ProductReducer';
const Shop = () => {
  const { search } = useSelector(state => ({ ...state }))
  const { products: updatedProducts } = useSelector(selectProducts)
  const searchQuery = search.text

  const [products, setproducts] = useState([])
  const [loading, setloading] = useState(true)
  const getProductsByCount = () => {
    getproductbycount(15).then((res) => {
      setproducts(res.data)
      setloading(false)
    }).catch((err) => {
      console.log('Error: ', err);
      setloading(false)
      toast.error('there some issues while fetching the product Data from server')
    })
  }
  useEffect(() => {
    if (searchQuery == '') {
      getProductsByCount()
    }

    if (searchQuery !== '') {
      getProductsBysearchQuery({ searchQuery }).then((res) => {
        setproducts(res.data)
        setloading(false)
      }).catch((err) => {
        console.log('Error: ', err);
        setloading(false)
      })
    }
  }, [])

  useEffect(() => {
    // let delayed
    if (searchQuery == '') {
      // delayed = setTimeout(() => {
      getProductsByCount()
      // }, 300);
    }
    if (searchQuery !== '') {
      getProductsBysearchQuery({ searchQuery }).then((res) => {
        setproducts(res.data)
      }).catch((err) => {
        console.log('Error: ', err);
      })

    }

    // return () => clearTimeout(delayed)
  }, [searchQuery])

  useEffect(() => {
    if (updatedProducts) {
      setproducts(updatedProducts)
    }
  }, [updatedProducts])


  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <FilterSidebar />
          </div>
          <div className="col-md-9">
            <div className='row'>
              {loading ? <h4 className='text-danger text-center'>Loading...</h4> : products.length

                ? products.map((r) => (
                  <div className="col-md-4 mt-3" key={r._id}>
                    <UserProductCard product={r} />
                  </div>
                ))
                : (<div className="text-center col">No Products Found</div>)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop