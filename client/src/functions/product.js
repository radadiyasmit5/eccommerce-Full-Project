const axios = require("axios");

export const createproduct = async (product, authtoken) => {

  return await axios.post(
    `${process.env.REACT_APP_API}/createproduct`,
    product,
    {
      headers: { authtoken },
    }
  );
};

export const removeproduct = async (title, images, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/removeproduct/${title}`,
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};

export const listallproductsbyslug = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/products/getproductbyslug/${slug}`
  );
};

export const updateproduct = async (slug, product, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/products/updateproduct/${slug}`,
    product,
    {
      authtoken: authtoken,
    }
  );
};

export const getproductbycount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

export const getproducts = async (sort, order, page) => {
  return await axios.post(`${process.env.REACT_APP_API}/products/`, {
    sort,
    order,
    page,
  });
};

export const totalproductcount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/totalproducts/`);
};

export const starrating = async (productid, stars, token) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/products/setstarrating/${productid}`,
    { stars },
    {
      headers: {
        authtoken: token
      }
    }
  );
};

export const related_products = async (productid) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/products/related/${productid}`)
}

export const getProductsByCategory = async (productName) =>{
  return await axios.get(
    `${process.env.REACT_APP_API}/products/getProductsByCategory/${productName}`
  )
}

export const getProductsBySubCategory = async (productName) =>{
  return await axios.get(
    `${process.env.REACT_APP_API}/products/getProductsBySubCategory/${productName}`
  )
}