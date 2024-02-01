import React, { useState, useEffect } from 'react'
import { DollarCircleOutlined, DownSquareOutlined } from '@ant-design/icons'
import { Checkbox, Menu, Slider } from 'antd'
import { getProductsBysearchQuery } from '../functions/product'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { catagorieslist } from '../functions/Catagory'
const FilterSidebar = () => {

    const { SubMenu } = Menu
    const [priceRange, setPriceRange] = useState([500, 1500])
    const [ok, setok] = useState(false)
    const [products, setproducts] = useState([])
    const [categories, setcategories] = useState([])
    const [checkedCategoriesKey, setcheckedCategoriesKey] = useState([])

    const dispatch = useDispatch()

    const handleSliderChange = (value) => {
        setPriceRange(value)
        setok(true)
    }

    // set ok when component first mounts.
    useEffect(() => {
        setok(false)
        catagorieslist().then((res) => {
            setcategories(res.data)
        }).catch((err) => {
            console.log('Error: ', err);
            toast.error("Server Error while fetching categories")
        })

    }, [])

    useEffect(() => {
        let timeout
        // do not execute this when component first mounts , only execute when user touches the price bar, for that use useState(ok)
        if (ok) {
            timeout = setTimeout(() => {
                const result = (async () => await getProductsBysearchQuery({ priceRange }))();
                result.then((res) => {
                    setproducts(res.data)
                    dispatch({
                        type: "SET_PRODUCTS",
                        payload: [...res.data]
                    })
                }).catch((err) => {
                    console.log('Error:', err);
                    toast.error('There is some issue while fetching products based on price')
                })
            }, 300);
        }
        return () => clearTimeout(timeout) //cleanup on unmount
    }, [priceRange])

    useEffect(() => {
        getProductsBysearchQuery({ categories: checkedCategoriesKey }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log('Category filter error : ', err)
            toast.error('Error which fetching Products By Categories')
        })
    }, [checkedCategoriesKey.length])

    const handleChange = (e) => {
        const productKey = e.target.eventKey
        let newCheckedCategoryKeys = [...checkedCategoriesKey];
        const isProductAlreadyChecked = newCheckedCategoryKeys.indexOf(productKey)
        if (isProductAlreadyChecked === -1) {
            newCheckedCategoryKeys = [...newCheckedCategoryKeys, productKey]
        } else {
            const index = newCheckedCategoryKeys.indexOf(productKey)
            newCheckedCategoryKeys.splice(index, 1)
        }

        setcheckedCategoriesKey(newCheckedCategoryKeys)
    }


    return (
        <div >

            <Menu
                mode='inline'
                defaultOpenKeys={['sub1', 'sub2']}

            >
                <SubMenu key={'sub1'}
                    title={(<h6 className='mt-3'>
                        <DollarCircleOutlined /> <span className=''>Price</span>
                    </h6>)}
                    className='mt-4'
                >

                    <Slider
                        range
                        disabled={false}
                        className='mt-5'
                        max={2500}
                        min={0}
                        defaultValue={[500, 1500]}
                        onChange={handleSliderChange}
                    />
                </SubMenu>
                <SubMenu key={'sub2'}
                    title={(<h6 className='mt-3'>
                        <DownSquareOutlined /> <span className=''>Categories</span>
                    </h6>)}
                    className='mt-4'
                    style={{ backgroundColor: 'white' }}
                >
                    {categories && categories.map((c) => {

                        return <Checkbox className='my-2 ml-4 col-md-8 w-100' key={c._id} onChange={handleChange} checked={checkedCategoriesKey.includes(c._id)}>{c.name}</Checkbox>
                    })}



                </SubMenu>

            </Menu>
        </div>
    )
}

export default FilterSidebar