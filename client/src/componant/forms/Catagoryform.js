import React from 'react'

export const Catagoryform = ({ handlesubmit, setname, name }) => {
    return (
        <form onSubmit={handlesubmit}>
            <div className="form-group">
                <label className='mb-3' style={{ fontSize: "large" }} >SubCatagory Name</label>
                <br />
                <input type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="enter catagory name"
                    autoFocus
                    required
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                />
                <br />
                <button type="submit" className="btn btn-success mb-3">Save</button>
            </div>
        </form>
    )
}
