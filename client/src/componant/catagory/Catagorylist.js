import React from 'react'
import { catagorieslist } from '../../functions/Catagory'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

export const Catagorylist = () => {

    const [catagories, setcatagories] = useState([])
    const [loading, setloading] = useState(false)
    const history = useHistory()
    useEffect(() => {
        setloading(true)
        catagorieslist().then((c) => {
            setcatagories(c.data)
            setloading(false)
        }, [])
    }, [])

    const handleClick = (name) => {
         history.push(`/category/${name}`)
    }
let showcatagories = () =>
    catagories.map((c) => (
        <button className='col btn btn-outline-primary btn-block btn-raised btn-lg m-3' onClick={() => handleClick(c.name)}>
            {c.name}
        </button>
    ))


return (
    <>
        <div className="container">
            <div className='row'>{showcatagories()}</div>
        </div>
    </>
)
}

