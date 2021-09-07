/* import React, {useState} from 'react'
import {Card, Tooltip} from 'antd'
import {EyeOutlined, ShoppingCartOutlined} from  '@ant-design/icons'
import laptop from '../../images/laptop.jpg'
import {Link } from 'react-router-dom'
import { showAverage } from '../../functions/rating'
import _ from 'lodash';
import {useSelector, useDispatch } from 'react-redux'

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState(('Click to add'))

    // redux
    const {user, cart } = useSelector((state) => ({...state}))
    const dispatch = useDispatch()

    
    const handleAddToCart = () => {
        // create cart array
        let cart = []
        if(typeof window !== 'undefined') {
            // if cart is in localstorage GET it
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
             // remove duplicates with lodash
             let unique = _.uniqWith(cart, _.isEqual)
            // save to local storage
             localStorage.setItem('cart', JSON.stringify(unique));
            // show tooltip
            setTooltip('added');

            // add to redux state
            dispatch({
                type: 'ADD_TO_CART',
                payload: unique,
            })
            // show cart items in side drawer
            dispatch({
                type: 'SET_VISIBLE',
                payload: true,
            });
        }
    };

    // destructure
    const { images, title, description, slug, price} = product;
    return (
       <> 
         {product && product.ratings && product.ratings.length > 0
          ? (showAverage(product)) : (<div className='text-center pt-1 pb-3'>No rating yet</div>)}
        <Card
        cover={
            <img src={images && images.length ? images[0].url : laptop }
             style={{ height: '150px', objectFit: 'cover'}}
             className='p-1'
              />
        } 
        actions={
            [
                <Link to={`/product/${slug}`}>
                <EyeOutlined className='text-warning' /> <br /> View Product

                </Link>,
                <Tooltip title={tooltip}>
                     <a onClick={handleAddToCart} disabled={product.quantity < 1 }>
                     <ShoppingCartOutlined  className='text-danger' /> <br /> 
                     {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
                     </a>
                </Tooltip>
               
            ]
        } 

        >
         <Meta 
         title={`${title} - $${price}`} 
         description={`${description && description.substring(0, 40)}...`} />

        </Card>
        </>
    )
}

export default ProductCard 
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import laptop from "../../images/laptop.jpg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 320,
  },
  image: {
    width: "100%",
    maxWidth: "100%",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: 50,
    backgroundColor: theme.palette.common.orange,
    height: 40,
    width: 130,
    margin: "5px 5px",

    fontSize: "1.25rem",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonAdd: {
    ...theme.typography.estimate,
    borderRadius: 50,
    backgroundColor: theme.palette.common.blue,
    margin: 40,
    width: 130,
    margin: "5px 5px",
    fontSize: "1.25rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

export default function ProductCard({ product }) {
  const classes = useStyles();
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

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
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  // destructure
  const { images, title, description, slug, price } = product;

  return (
    <Grid item container direction="column">
      <Grid item>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center text-danger pt-1 pb-3">
            <b>No rating yet</b>
          </div>
        )}
      </Grid>
      <Grid item>
        <Card variant="outlined" className={classes.root}>
          <CardActionArea>
            <img
              style={{ height: "150px", objectFit: "cover" }}
              className={classes.image}
              alt="image"
              src={images && images.length ? images[0].url : laptop}
            />
            <CardContent>
              <Typography
                style={{ textAlign: "center" }}
                gutterBottom
                variant="h6"
              >
                {`${title} - $${price}`}
              </Typography>
              <Typography
                style={{ textAlign: "center" }}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {`${description && description.substring(0, 40)}...`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Grid item container justify="space-between">
              <Grid item container justify="center" xs>
                <Link to={`/product/${slug}`}>
                  <Button
                    className={classes.button}
                    size="small"
                    color="secondary"
                  >
                    View Product
                  </Button>
                </Link>
              </Grid>

              <Grid item container justify="center" xs>
                <Button
                  className={classes.buttonAdd}
                  onClick={handleAddToCart}
                  disabled={product.quantity < 1}
                  size="small"
                >
                  Add To Card
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
