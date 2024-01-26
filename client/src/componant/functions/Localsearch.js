import React from 'react'

export const Localsearch = ({ keyword, setkeyword }) => {
    const handlefilter = ((e) => {
        e.preventDefault()
        setkeyword(e.target.value)
    })
    return (
        <input
            type="search"
            className='form-control mb-3'
            onChange={handlefilter}
            autoFocus
            placeholder='search'
            value={keyword}
        />
    )
}
