import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  cardProduct: {
    [theme.breakpoints.down("md")]: {
      margin: "20px 20px",
    },
  },
}));

const BestSellers = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  console.log("lod", loading);
  return (
    <>
      <Grid item container>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <Grid item container justify="space-evenly">
            {products.map((product) => (
              <Grid item key={product._id} className={classes.cardProduct}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      <div className="container">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
