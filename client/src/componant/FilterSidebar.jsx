import React, { useState, useEffect } from 'react'
import { DollarCircleOutlined } from '@ant-design/icons'
import { Menu, Slider } from 'antd'
import { getProductsBysearchQuery } from '../functions/product'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
const FilterSidebar = () => {

    const { SubMenu } = Menu
    const [priceRange, setPriceRange] = useState([500, 1500])
    const [ok, setok] = useState(false)
    const [products, setproducts] = useState([])
    const dispatch = useDispatch()
    const handleSliderChange = (value) => {
        setPriceRange(value)
        setok(true)

    }

    // set ok when component first mounts.
    useEffect(() => {
        setok(false)
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


    return (
        <div>

            <Menu
                mode='inline'
                defaultOpenKeys={['sub1']}

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

            </Menu>
        </div>
    )
}

export default FilterSidebar