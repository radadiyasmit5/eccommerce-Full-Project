import React, {useState, useEffect} from "react"
import {
  DollarCircleOutlined,
  DownSquareOutlined,
  StarFilled,
  StarOutlined,
  StepForwardOutlined,
} from "@ant-design/icons"
import {Checkbox, Menu, Radio, Slider} from "antd"
import {getProductsBysearchQuery} from "../functions/product"
import {toast} from "react-toastify"
import {useDispatch} from "react-redux"
import {catagorieslist} from "../functions/Catagory"
import StarRatings from "react-star-ratings"
import {subcatagorieslist} from "../functions/Sub"
const FilterSidebar = () => {
  const {SubMenu} = Menu
  // priceRange
  const [ok, setok] = useState(false)
  const [priceRange, setPriceRange] = useState([500, 1500])
  const [products, setproducts] = useState([])
  //category
  const [categories, setcategories] = useState([])
  const [isCategoryClicked, setisCategoryClicked] = useState(false)
  const [checkedCategoriesKey, setcheckedCategoriesKey] = useState([])

  //stars
  const [stars, setstars] = useState(0)
  const dispatch = useDispatch()

  //subCategories
  const [subCategories, setsubCategories] = useState([])

  //brands
  const [brands, setbrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ])
  const [currentSelectedBrand, setcurrentSelectedBrand] = useState(null)

  //colors
  const [colors, setcolors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ])
  const [currentSelectedColor, setcurrentSelectedColor] = useState(null)
  const handleSliderChange = (value) => {
    setPriceRange(value)
    setok(true)
  }

  // set ok when component first mounts.
  useEffect(() => {
    setok(false)
    catagorieslist()
      .then((res) => {
        setcategories(res.data)
      })
      .catch((err) => {
        console.log("Error: ", err)
        toast.error("Server Error while fetching categories")
      })
    subcatagorieslist()
      .then((res) => {
        setsubCategories(res.data)
      })
      .catch((err) => {
        console.log("Error in getting Sub Catagories", err)
      })
  }, [])

  useEffect(() => {
    let timeout
    // do not execute this when component first mounts , only execute when user touches the price bar, for that use useState(ok)
    if (ok) {
      timeout = setTimeout(() => {
        const result = (async () =>
          await getProductsBysearchQuery({priceRange}))()
        result
          .then((res) => {
            setproducts(res.data)
            dispatch({
              type: "SET_PRODUCTS",
              payload: [...res.data],
            })
          })
          .catch((err) => {
            console.log("Error:", err)
            toast.error(
              "There is some issue while fetching products based on price"
            )
          })
      }, 300)
    }
    return () => clearTimeout(timeout) //cleanup on unmount
  }, [priceRange])

  useEffect(() => {
    if (isCategoryClicked) {
      getProductsBysearchQuery({categories: checkedCategoriesKey})
        .then((res) => {
          setproducts(res.data)
          dispatch({
            type: "SET_PRODUCTS",
            payload: [...res.data],
          })
        })
        .catch((err) => {
          console.log("Category filter error : ", err)
          toast.error("Error which fetching Products By Categories")
        })
    }
  }, [checkedCategoriesKey.length])

  const handleCategoryChange = (e) => {
    setPriceRange([0, 0])
    setok(false)
    setisCategoryClicked(true)
    const productKey = e.target.eventKey
    let newCheckedCategoryKeys = [...checkedCategoriesKey]
    const isProductAlreadyChecked = newCheckedCategoryKeys.indexOf(productKey)
    if (isProductAlreadyChecked === -1) {
      newCheckedCategoryKeys = [...newCheckedCategoryKeys, productKey]
    } else {
      const index = newCheckedCategoryKeys.indexOf(productKey)
      newCheckedCategoryKeys.splice(index, 1)
    }

    setcheckedCategoriesKey(newCheckedCategoryKeys)
  }
  const handleStarClick = (value) => {
    setPriceRange([0, 0])
    setok(false)
    setisCategoryClicked(false)
    setstars(value)
    getProductsBysearchQuery({stars: value})
      .then((res) => {
        dispatch({
          type: "SET_PRODUCTS",
          payload: [...res.data],
        })
      })
      .catch((err) => {
        toast.error("error while fetching product by Ratings")
      })
  }
  let starRatingRender = () => {
    let item = new Array(5).fill(null)
    return item.reverse().map((_, i) => (
      <div
        className="mt-2 ml-4"
        onClick={() => handleStarClick(item.length - i)}
      >
        <StarRatings
          starDimension="25px"
          starSpacing="2px"
          starRatedColor={"red"}
          rating={item.length - i}
          isSelectable={true}
          editing={false}
        />
      </div>
    ))
  }

  const handleSubCategory = async (subs) => {
    setPriceRange([0, 0])
    setok(false)
    setisCategoryClicked(false)
    await getProductsBysearchQuery({subs: subs})
      .then((res) => {
        dispatch({
          type: "SET_PRODUCTS",
          payload: [...res.data],
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error("Error while fetching product by SubCategory")
      })
  }

  const handleBrandChange = async (e) => {
    setPriceRange([0, 0])
    setok(false)
    setisCategoryClicked(false)
    setcurrentSelectedBrand(e.target.value)

    await getProductsBysearchQuery({brand: e.target.value})
      .then((res) => {
        dispatch({
          type: "SET_PRODUCTS",
          payload: [...res.data],
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error("There is some issue fetching the Product by Brand")
      })
  }
  const handleColorChange = async (e) => {
    setPriceRange([0, 0])
    setok(false)
    setisCategoryClicked(false)
    setcurrentSelectedColor(e.target.value)

    await getProductsBysearchQuery({color: e.target.value})
      .then((res) => {
        dispatch({
          type: "SET_PRODUCTS",
          payload: [...res.data],
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error("There is some issue fetching the Product by Brand")
      })
  }
  return (
    <div>
      <Menu
        mode="inline"
        defaultOpenKeys={["sub1", "sub2", "sub3", "sub4", "sub5","sub6"]}
      >
        <SubMenu
          key={"sub1"}
          title={
            <h6 className="mt-3">
              <DollarCircleOutlined /> <span className="">Price</span>
            </h6>
          }
          className="mt-4"
        >
          <Slider
            range
            disabled={false}
            className="mt-5"
            max={2500}
            min={0}
            value={priceRange}
            defaultValue={[500, 1500]}
            onChange={handleSliderChange}
          />
        </SubMenu>
        <SubMenu
          key={"sub2"}
          title={
            <h6 className="mt-3">
              <DownSquareOutlined /> <span className="">Categories</span>
            </h6>
          }
          className="mt-4"
          style={{backgroundColor: "white"}}
        >
          {categories &&
            categories.map((c) => {
              return (
                <Checkbox
                  className="my-2 ml-4 col-md-8 w-100"
                  key={c._id}
                  onChange={handleCategoryChange}
                  checked={checkedCategoriesKey.includes(c._id)}
                >
                  {c.name}
                </Checkbox>
              )
            })}
        </SubMenu>
        <SubMenu
          key={"sub3"}
          title={
            <h6 className="mt-3">
              <StarFilled /> <span className="">Ratings</span>
            </h6>
          }
          className="mt-4"
          style={{backgroundColor: "white"}}
        >
          {starRatingRender()}
        </SubMenu>
        <SubMenu
          key={"sub4"}
          title={
            <h6 className="mt-3">
              <DownSquareOutlined /> <span className="">Sub Categories</span>
            </h6>
          }
          className="mt-4"
          style={{backgroundColor: "white"}}
        >
          {subCategories.map((s) => {
            return (
              <>
                <button
                  className=" btn btn-outline-primary  btn-raised btn-sm m-2"
                  onClick={() => {
                    handleSubCategory(s)
                  }}
                >
                  {s.name}
                </button>
              </>
            )
          })}
        </SubMenu>
        <SubMenu
          key={"sub6"}
          title={
            <h6 className="mt-3">
              <DownSquareOutlined /> <span className="">Brands</span>
            </h6>
          }
          className="mt-4"
          style={{backgroundColor: "white"}}
        >
          {brands.map((brand) => {
            return (
              <span className="p-3 m-2 mt-3">
                <Radio.Group
                  onChange={handleBrandChange}
                  value={currentSelectedBrand}
                  className="p-2"
                >
                  <Radio value={brand}>{brand}</Radio>
                </Radio.Group>
              </span>
            )
          })}
        </SubMenu>
        <SubMenu
          key={"sub5"}
          title={
            <h6 className="mt-3">
              <DownSquareOutlined /> <span className="">Colors</span>
            </h6>
          }
          className="mt-4"
          style={{backgroundColor: "white"}}
        >
          {colors.map((color) => {
            return (
              <span className="p-3 m-2 mt-3">
                <Radio.Group
                  onChange={handleColorChange}
                  value={currentSelectedColor}
                  className="p-2"
                >
                  <Radio value={color}>{color}</Radio>
                </Radio.Group>
              </span>
            )
          })}
        </SubMenu>
      </Menu>
    </div>
  )
}

export default FilterSidebar
