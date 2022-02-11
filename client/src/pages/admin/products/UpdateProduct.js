import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ProductsForm from '../../../componant/forms/ProductsCreateForm'
import { AdminNav } from '../../../componant/nav/AdminNav'
import { createproduct, listallproductsbyslug, updateproduct } from '../../../functions/Product'
import { catagorieslist } from '../../../functions/Catagory'
import { subcatagoryfindbyid } from '../../../functions/Sub'
import { FileUpload } from '../../../componant/forms/FileUpload'
import { AlertOutlined, FlagFilled, LoadingOutlined } from '@ant-design/icons'
import ProductsUpdateForm from '../../../componant/forms/ProductsUpdateForm'
const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    color: '',
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    brand: "",


}
export const UpdateProduct = ({ match, history }) => {
    const { user } = useSelector(state => ({ ...state }))
    const [value, setvalue] = useState(initialState)
    const [loading, setloading] = useState(false)
    const [categories, setcategories] = useState([])
    const [sub, setsub] = useState([])
    const [Arrayofsubs, setArrayofsubs] = useState([])
    const [clickedcategory, setclickedcategory] = useState("")


    useEffect(() => {
        loadcatagories()
        loadproductsvalue(match.params.slug)
    }, [])



    const loadcatagories = () => {
        catagorieslist().then(res => {
            setcategories(res.data)

        }).catch(err => { })
    }

    const handlecatagories = (e) => {
        e.preventDefault()
        console.log(e.target.value);
        console.log(value.category._id);
        setvalue({ ...value, subs: [] })
        setclickedcategory(e.target.value)
        subcatagoryfindbyid(e.target.value).then(res => {
            setsub(res.data)
        })

        if (value.category._id === e.target.value) {
            console.log("clicked");
            loadproductsvalue(match.params.slug)
        }

        setArrayofsubs([])

    }

    const loadproductsvalue = (slug) => {

        listallproductsbyslug(slug).then(res => {

            setvalue({ ...value, ...res.data })
            subcatagoryfindbyid(res.data.category._id).then(res => {
                setsub(res.data)
            })
            let arr = []

            res.data.subs.map(p => {
                arr.push(p._id)

            })
            setArrayofsubs((prev) => arr)

        }).catch(err => {
            console.log(err);
        })


    }
    const handlesubmit = (e) => {
        e.preventDefault()
        setloading(true)

        value.category = clickedcategory ? clickedcategory : value.category
        value.subs = Arrayofsubs

        updateproduct(match.params.slug, value, user.authtoken).then(res => {
            setloading(false)
            console.log(res);
            toast.success(`${res.data.title} updated`)
            history.push("/admin/dashboard")


        }).catch(err => {
            setloading(false)
            if (err) {
                console.log(err);
                toast.error("error while upating product")

            }
        })


    }

    const handlechange = (e) => {
        e.preventDefault()
        setvalue({ ...value, [e.target.name]: e.target.value });
    }

    return (
        <div className='container-fluid'>
            <div className='row'>

                <div className='col-md-2'>

                    <AdminNav />
                </div>
                <div className='col'>
                    <div className='lable'> {loading ? <LoadingOutlined className="text-danger X-large" /> : <h4>Product Update</h4>} </div>
                    <div className='p-3'>
                        <FileUpload value={value} setvalue={setvalue} setloading={setloading} />
                    </div>

                    <br />


                    <ProductsUpdateForm
                        handlesubmit={handlesubmit}
                        handlechange={handlechange}
                        value={value}
                        setvalue={setvalue}
                        handlecatagories={handlecatagories}
                        categories={categories}
                        Arrayofsubs={Arrayofsubs}
                        setArrayofsubs={setArrayofsubs}
                        sub={sub}
                        clickedcategory={clickedcategory}
                        setclickedcategory={setclickedcategory}
                    />
                </div>

            </div>
        </div>
    )
}

