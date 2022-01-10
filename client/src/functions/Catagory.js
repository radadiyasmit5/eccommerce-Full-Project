import axios from 'axios'

export const catagorieslist = async () =>
    await axios.get(`${process.env.REACT_APP_API}/catagories`)

export const catagorybyslug = async (slug, authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/catagory/${slug}`, {}, {
        headers: { authtoken }
    })
}


export const catagorycreate = async (catagory, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/catagory`,
        {
            catagory
        }, {
        headers: {
            authtoken
        }
    })
}

export const catagoryupdate = async (name, slug, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/catagory/${slug}`, { name }, {
        headers: { authtoken }
    })
}

export const catagoryremove = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/catagory/${slug}`, {
        headers: { authtoken }
    })
}
