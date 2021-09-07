import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  PaperSize: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "20px",
    },
  },
  CardItem: {
    marginTop: "70px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "3px",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "20px",
    },
  },
}));

const AllProducts = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    let answer = window.confirm("Are sure want to delete?");
    if (answer) {
      // console.log('send delete req',  slug)
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          console.log(err);
          // setLoading(false)
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  return (
    <Grid item container>
      <Grid item container xs={2}>
        <AdminNav />
      </Grid>
      <Grid item container xs={10}>
        <Paper className={classes.PaperSize}>
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products...</h4>
          )}
          <Grid item container justify="space-evenly">
            {products.map((product) => (
              <Grid
                item
                key={product._id}
                xs={12}
                sm={6}
                md={4}
                className={classes.CardItem}
              >
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AllProducts;
