import React from 'react'
import { catagorieslist } from '../../functions/Catagory'
import { useState, useEffect } from 'react'

export const Catagorylist = () => {

    const [catagories, setcatagories] = useState([])
    const [loading, setloading] = useState(false)

    // useEffect(() => {
    //     setloading(true)
    //     catagorieslist().then((c) => {
    //         setcatagories(c.data)
    //         setloading(false)
    //     }, [])
    // })

    let showcatagories = () => 
        catagories.map((c) =>( 
            <div>{c.name}</div>
        ))
    

    return (
        <>
            {/* <div>{showcatagories()}</div> */}

        </>
    )
}

