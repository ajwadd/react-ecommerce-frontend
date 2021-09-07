import React, { useState } from "react";
import { Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.jpg";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Grid, Box, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  containerSize: {
    marginTop: "110px",
    [theme.breakpoints.down("md")]: {
      marginTop: "80px",
    },
  },
  sizeCard: {
    width: "500px",
    [theme.breakpoints.down("md")]: {},
  },
}));
const { TabPane } = Tabs;

// this is children component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const classes = useStyles();

  const theme = useTheme();
  const { title, images, description, _id } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let history = useHistory();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in localstorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates with lodash
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("added");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <Grid item container direction={matches ? "column" : "row"}>
        <Grid item container md={7}>
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images &&
                images.map((i) => <img src={i.url} key={i.public_id} />)}
            </Carousel>
          ) : (
            <Card cover={<img src={Laptop} className="mb-3" />} />
          )}

          <Tabs type="card">
            <TabPane tab="Description" key="1">
              {description && description}
            </TabPane>
            <TabPane tab="More" key="2">
              Call Us on XXXX XXX XXX to learn more about this product
            </TabPane>
          </Tabs>
        </Grid>

        <Grid
          item
          container
          md={5}
          direction="column"
          className={classes.containerSize}
        >
          <Grid item container justify="center">
            <Typography variant="h2">{title}</Typography>
          </Grid>
          <Grid item container justify="center">
            {product && product.ratings && product.ratings.length > 0 ? (
              showAverage(product)
            ) : (
              <div className="text-center pt-1 pb-3">No rating yet</div>
            )}
          </Grid>

          <Grid item container justify="center">
            <Card variant="outlined" className={classes.sizeCard}>
              <CardActionArea>
                <CardContent>
                  <ProductListItems product={product} />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid item container justify="space-between">
                  <Grid item container justify="center" xs>
                    <Grid item align="center">
                      <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart}>
                          <ShoppingCartOutlined className="text-danger" />{" "}
                          <br /> Add to Cart
                        </a>
                      </Tooltip>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="column"
                    alignItems="center"
                    xs
                  >
                    <Grid item align="center">
                      <a onClick={handleAddToWishlist}>
                        <HeartOutlined className="text-info" /> <br /> Add to
                        Wishlist
                      </a>
                    </Grid>
                  </Grid>

                  <Grid item container justify="center" xs>
                    <Grid item align="center">
                      <RatingModal>
                        <StarRating
                          name={_id}
                          numberOfStars={5}
                          rating={star}
                          changeRating={onStarClick}
                          isSelectabme={true}
                          starRatedColor="red"
                        />
                      </RatingModal>
                    </Grid>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleProduct;
