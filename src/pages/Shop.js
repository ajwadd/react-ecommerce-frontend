import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilters,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio, Divider } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const { SubMenu, ItemGroup } = Menu;

const useStyles = makeStyles((theme) => ({
  Filters: {
    [theme.breakpoints.down("md")]: {
      maxWdith: "220px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "150px",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "120px",
      position: "relative",
    },
  },

  root: {
    borderRadius: 50,
    textColor: "white",
  },
  PaperMargin: {
    paddingLeft: "14px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0px",
    },
  },
  PaperCard: {
    [theme.breakpoints.down("xs")]: {
      width: "300px",
      marginLeft: "40px",
    },
  },
}));
const Shop = () => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "lennovo",
    "Asus",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilters(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <Grid item container direction="row" justify="flex-start" key={c._id}>
        <Checkbox
          onChange={handleCheck}
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>

        <br />
      </Grid>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <>
      <Grid
        item
        container
        justify="flex-start"
        style={{ marginLeft: matchesXS ? "2px" : "20px" }}
      >
        <Star starClick={handleStarClick} numberOfStars={5} />
      </Grid>
      <Grid
        item
        container
        justify="flex-start"
        style={{ marginLeft: matchesXS ? "2px" : "20px" }}
      >
        <Star starClick={handleStarClick} numberOfStars={4} />
      </Grid>
      <Grid
        item
        container
        justify="flex-start"
        style={{ marginLeft: matchesXS ? "2px" : "20px" }}
      >
        <Star starClick={handleStarClick} numberOfStars={3} />
      </Grid>
      <Grid
        item
        container
        justify="flex-start"
        style={{ marginLeft: matchesXS ? "2px" : "20px" }}
      >
        <Star starClick={handleStarClick} numberOfStars={2} />
      </Grid>
      <Grid
        item
        container
        justify="flex-start"
        style={{ marginLeft: matchesXS ? "2px" : "20px" }}
      >
        <Star starClick={handleStarClick} numberOfStars={1} />
      </Grid>
    </>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  //7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio value={b} name={b} checked={b === brand} onChange={handleBrand}>
        {b}
        <br />
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setShipping("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio value={c} name={c} checked={c === color} onChange={handleColor}>
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setShipping("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <Grid item container direction="row" justify="space-between">
      <Grid
        item
        xs={3}
        style={{ marginTop: "100px" }}
        className={classes.Filters}
      >
        <Paper elevation={1} style={{ height: "100%" }}>
          {matches ? (
            <>
              <Typography variant="h4">Search/</Typography>
              <Typography variant="h4">Filter</Typography>
            </>
          ) : (
            <Typography variant="h4">Search/Filter</Typography>
          )}

          <hr />

          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
          >
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>
            <Divider />
            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div
                style={{ maringTop: "-10px", backgroundColor: "#FFFFFF" }}
                className="pl-2 pr-2"
              >
                {showCategories()}
              </div>
            </SubMenu>
            <Divider />

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: "-10px", backgroundColor: "#FFFFFF" }}>
                {showStars()}
              </div>
            </SubMenu>
            <Divider />

            {/* sub category */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div
                style={{ maringTop: "-10px", backgroundColor: "#FFFFFF" }}
                className="pl-2 pr-2"
              >
                {showSubs()}
              </div>
            </SubMenu>
            <Divider />

            {/* brand */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div
                style={{ maringTop: "-10px", backgroundColor: "#FFFFFF" }}
                className="pl-2 pr-2"
              >
                {showBrands()}
              </div>
            </SubMenu>
            <Divider />

            {/* colors */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div
                style={{ maringTop: "-10px", backgroundColor: "#FFFFFF" }}
                className="pl-2 pr-2"
              >
                {showColors()}
              </div>
            </SubMenu>
            <Divider />
            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div
                style={{ maringTop: "-10px", backgroundColor: "#FFFFFF" }}
                className="center"
              >
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </Paper>
      </Grid>

      <Grid item xs={9} className={classes.PaperSize}>
        <Paper elevation={1} variant="outlined" className={classes.PaperMargin}>
          {loading ? (
            <Typography variant="h2" align="center">
              Loading...
            </Typography>
          ) : (
            <Typography
              variant="h2"
              align="center"
              style={{ marginTop: "100px" }}
            >
              <b>Products</b>
            </Typography>
          )}

          {products.length < 1 && (
            <Typography variant="h5" align="center">
              No products found
            </Typography>
          )}

          <Grid
            item
            container
            direction={matches ? "column" : "row"}
            alignItems={matches ? "center" : "space-evenly"}
            className={classes.PaperCard}
          >
            {products.map((p) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={p._id}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Shop;
