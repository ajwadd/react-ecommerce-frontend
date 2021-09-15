import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    marginLeft: "25px",
    marginTop: "35px",

    width: "425px",
    [theme.breakpoints.down("md")]: {
      marginTop: "20px",
    },
  },
}));

const Cart = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { cart, user } = useSelector((state) => ({ ...state }));
  const Dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    Dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead style={{ backgroundColor: "#E2E3F3" }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Shipping</TableCell>
              <TableCell>delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((p) => (
              <ProductCardInCheckout key={p._id} p={p} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <Grid
      item
      container
      direction={matches ? "column" : "row"}
      alignItems={matches ? "center" : "inherit"}
      style={{ marginTop: "100px" }}
    >
      <Grid item container xs={12} sm={12} md={12} lg={8}>
        <Typography variant="h4">Cart / {cart.length} Product</Typography>

        {!cart.length ? (
          <p>
            No products in cart. <Link to="/shop">Continue Shopping.</Link>
          </p>
        ) : (
          showCartItems()
        )}
      </Grid>
      <Grid
        item
        container
        alignItems={matches ? "center" : "inherit"}
        direction="column"
        xs={12}
        sm={12}
        md={12}
        lg={4}
      >
        <Card align="flex-end" variant="outlined" className={classes.cardStyle}>
          <Grid item container justify="center">
            <Typography variant="h4">Order Summary</Typography>
          </Grid>
          <Grid item container justify="center" style={{ marginTop: "5px" }}>
            <Typography variant="h6">Products</Typography>
          </Grid>
          {cart.map((c, i) => (
            <Grid
              item
              container
              justify="center"
              style={{ marginTop: "5px" }}
              key={i}
            >
              <Typography style={{ color: "black" }}>
                {c.title} x {c.count} = ${c.price * c.count}
                <hr />
              </Typography>
            </Grid>
          ))}
          <Typography align="center" style={{ color: "black" }}>
            Total: <b>${getTotal()}</b>
          </Typography>

          <hr />
          {user ? (
            <>
              <Grid item container>
                <Grid item container justify="center" xs>
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={saveOrderToDb}
                    disabled={!cart.length}
                  >
                    Proceed to Checkout
                  </button>
                </Grid>
                <Grid item container justify="center" xs>
                  <button
                    className="btn btn-sm btn-warning mt-2"
                    onClick={saveCashOrderToDb}
                    disabled={!cart.length}
                  >
                    Pay Cash on Delivery
                  </button>
                </Grid>
              </Grid>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cart;
