import { SearchOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProductsBysearchQuery } from '../../functions/product'

const Search = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [text, settext] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!text.length) {

            history.push(`/shop`)
        } else {
            history.push(`/shop?${text}`)
        }
    }
    const handleChange = (e) => {
        e.preventDefault()
        settext(e.target.value)
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value }
        })
        
    }


    return (
        <form className='form-inline my-2 my-lg-0 pt-1 mr-5' onSubmit={handleSubmit}>
            <input class="form-control mr-sm-2"
                placeholder=' Search Products'
                onChange={handleChange}
                value={text}

            />
            <SearchOutlined style={{ cursor: 'pointer' }} onClick={handleSubmit} />
        </form>
    )
}

export default Search