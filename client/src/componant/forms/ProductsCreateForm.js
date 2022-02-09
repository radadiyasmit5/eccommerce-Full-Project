import React from 'react'
import { Select } from 'antd'

const { Option } = Select
const ProductsForm = ({ handlesubmit, handlechange, value, handlecatagories, sub, setvalue, showsub }) => {
    const { title, description, price, catagory, catagories, subs, shipping, quantity, images, colors, color, brands, brand } = value
    return (
        <div>
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
                        name="shipping"
                        onChange={handlechange}

                    >
                        <option>Please Select</option>
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
                        name="color"
                        onChange={handlechange}

                    >
                        <option>Please Select</option>
                        {colors && colors.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <br />
                </div >
                <div className='form-group'>
                    <lable className="h5">Brands</lable>
                    <br />

                    <select className='form-control'
                        name="brand"
                        onChange={handlechange}
                    >
                        <option>Please Select</option>
                        {brands && brands.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <br />
                </div>

                <div className='form-group'>
                    <lable className="h5">Catagories</lable>
                    <br />

                    <select className="form-control" onChange={handlecatagories} name='category'>
                        <option value="">Select Catagory</option>
                        {catagories && catagories.map((c) => (<option value={c._id} key={c.name} >{c.name}</option>))}
                    </select>
                    <br />

                </div>

                {showsub && (<div  >
                    <lable className="h5">Sub Categories</lable>
                    <Select
                        mode="multiple"
                        className="form-control"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        value={subs}
                        onChange={values => setvalue({ ...value, subs: values })}

                    >


                        {sub.length && sub.map((e) => (<Option key={e._id} value={e._id}>{e.name}</Option>))}
                    </Select>

                </div>)}
                <br />

                <button className='btn btn-outline-info' >Save</button>

            </form>

        </div >
    )
}

export default ProductsForm
