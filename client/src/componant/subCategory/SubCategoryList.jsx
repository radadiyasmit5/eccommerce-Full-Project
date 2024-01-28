import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { subcatagorieslist } from '../../functions/Sub'
const SubCategoryList = () => {

    const [subCategories, setsubCategories] = useState([])
    const history = useHistory()
    useEffect(() => {
        subcatagorieslist().then((res) => {
            setsubCategories(res.data)
        }).catch((err) => {
            console.log('Error: ', err);
            toast.error('There are some issues fetching sub categories')
        })
    }, [])

    const handleClick = (subCategory) => {
        if (subCategory) {
            history.push(`/subs/${subCategory}`)
        }
    }

    const showSubCategories = () => {
        return subCategories.map((c) => (
            <button className='col btn btn-outline-primary btn-block btn-raised btn-lg m-3' onClick={() => handleClick(c.slug)}>
                {c.slug}
            </button>
        ))
    }

    return (
        <div className='container'>
            <div className='row'>{showSubCategories()}</div>
        </div>
    )
}

export default SubCategoryList