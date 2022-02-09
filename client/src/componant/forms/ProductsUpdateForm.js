import React from 'react'
import { Select } from 'antd'

const { Option } = Select
const ProductsUpdateForm = ({ handlesubmit,
    handlechange,
    value, setvalue,
    handlecatagories,
    categories,
    Arrayofsubs,
    setArrayofsubs,
    sub,
    clickedcategory,
    setclickedcategory
}) => {
    const { title,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        color,
        brands,
        brand } = value



    return (

        < div >

            <form onSubmit={handlesubmit}>
                <div className='form-group'>
                    <lable className='h5'>Title</lable>
                    <br />
                    <input

                        type="text"
                        name="title"
                        className='form-control'
                        value={title}
                        onChange={handlechange}

                    />
                    <br />
                </div>
                <div className='form-group'>
                    <lable className='h5'>Description</lable>
                    <br />
                    <input

                        type="text"
                        name="description"
                        className='form-control'
                        value={description}
                        onChange={handlechange}

                    />
                    <br />
                </div>
                <div className='form-group'>
                    <lable className='h5'>price</lable>
                    <br />
                    <input

                        type="text"
                        name="price"
                        className='form-control'
                        value={price}
                        onChange={handlechange}

                    />
                    <br />
                </div>
                <div className='form-group'>
                    <lable className="h5">Shipping</lable>

                    <br />

                    <select className='form-control'
                        value={shipping === 'Yes' ? "Yes" : "No"}
                        name="shipping"
                        onChange={handlechange}

                    >

                        <option value='No'>No</option>
                        <option value='Yes'> Yes</option>
                    </select>
                    <br />
                </div>
                <div className='form-group'>
                    <lable className='h5'>Quantity</lable>
                    <br />
                    <input

                        type="text"
                        name="quantity"
                        className='form-control'
                        value={quantity}
                        onChange={handlechange}

                    />
                    <br />

                </div>
                <div className='form-group'>
                    <lable className="h5">color</lable>

                    <br />

                    <select className='form-control'
                        value={color}
                        name="color"
                        onChange={handlechange}

                    >

                        {colors && colors.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <br />
                </div >
                <div className='form-group'>
                    <lable className="h5">Brands</lable>
                    <br />

                    <select className='form-control'
                        value={brand}
                        name="brand"
                        onChange={handlechange}
                    >

                        {brands && brands.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <br />
                </div>

                {<div className='form-group'>

                    <lable className="h5">Catagories</lable>
                    <br />

                    <select className="form-control"
                        onChange={handlecatagories}
                        name='category'
                        value={clickedcategory ? clickedcategory : category._id}
                    >


                        {categories && categories.map((c) => (<option value={c._id} key={c.name} >
                            {c.name}
                        </option>))}
                    </select>
                    <br />

                </div>}

                <div  >
                    <lable className="h5">Sub Categories</lable>
                    <Select
                        mode="multiple"
                        className="form-control"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        value={Arrayofsubs}

                        onChange={values => setArrayofsubs(values)}

                    >


                        {sub.length
                            && sub.map((e) => (<Option key={e._id} value={e._id}>{e.name}</Option>))}
                    </Select>

                </div>
                <br />

                <button className='btn btn-outline-info' >Save</button>

            </form>

        </div >
    )
}

export default ProductsUpdateForm
