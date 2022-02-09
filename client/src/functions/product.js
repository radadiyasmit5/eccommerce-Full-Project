const axios = require('axios')


export const createproduct = async (product, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/createproduct`, product, {

        headers: { authtoken }
    })
}

export const removeproduct = async (title, images, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/removeproduct/${title}`,
        {
            headers: {
                authtoken: authtoken
            }
        })
}


export const listallproductsbyslug = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/getproductbyslug/${slug}`)
}


export const updateproduct = async (slug, product, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/products/updateproduct/${slug}`, product, {
        authtoken: authtoken
    })
}

export const getproductbycount = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`)
}