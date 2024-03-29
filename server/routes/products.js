const express = require("express");

const router = express.Router();

//middlewares
const { authcheck, admincheck } = require("../middleware/auth");
//controllers
const {
    create,
    listofproducts,
    removeproduct,
    listproductsbyslug,
    update,
    list,
    totalproduct,
    relatedProducts,
    startrating,
    getproductsByCategory,
    getproductsBySubCategory,
    searchFilters,
    getProductsById,
} = require("../controllers/products");

router.post("/createproduct", authcheck, admincheck, create);
router.get("/totalproducts", totalproduct);
router.delete("/removeproduct/:title", authcheck, admincheck, removeproduct);
router.get("/products/:count", listofproducts);
router.get("/products/getproductbyId/:id", authcheck,getProductsById);
router.get("/products/getproductbyslug/:slug", listproductsbyslug);
router.put("/products/updateproduct/:slug", update);
router.get("/products/related/:id", relatedProducts);
router.post("/products", list);
router.put("/products/setstarrating/:id", authcheck, startrating);
router.get(
    "/products/getProductsByCategory/:categoryName",
    getproductsByCategory
);
router.get(
    "/products/getProductsBySubCategory/:subcategoryName",
    getproductsBySubCategory
);
router.post("/product/search/filters", searchFilters);
module.exports = router;
