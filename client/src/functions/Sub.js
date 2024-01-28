import axios from 'axios'

export const subcatagorieslist = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/subs`)
}

export const subcatagorybyslug = async (slug, authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`, {}, {
        headers: { authtoken }
    })
}


export const subcatagorycreate = async (subcatagory, authtoken, id) => {
    return await axios.post(`${process.env.REACT_APP_API}/sub`,
        {
            subcatagory, id
        }, {
        headers: {
            authtoken
        }
    })
}

export const subcatagoryupdate = async (name, parent, slug, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, { name, parent }, {
        headers: { authtoken }
    })
}

export const subcatagoryremove = async (slug, authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: { authtoken }
    })
}

export const subcatagoryfindbyid = async (id) => {
    return axios.get(`${process.env.REACT_APP_API}/subs/${id}`)
}