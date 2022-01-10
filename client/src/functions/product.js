const axios = require('axios')


export const createproduct = async (product, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/createproduct`, product, {

        headers: { authtoken }
    })
}

