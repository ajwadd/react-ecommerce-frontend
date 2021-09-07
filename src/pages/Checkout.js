import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderUser,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const Checkout = ({ history }) => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button
        className="btn btn-outline-primary lg mt-5"
        onClick={saveAddressToDb}
      >
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button
        onClick={applyDiscountCoupon}
        size="small"
        className="btn btn-outline-primary lg mt-2"
      >
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <Grid
      item
      container
      justify={matchesSM ? "center" : "space-evenly"}
      direction="row"
    >
      <Grid
        item
        container
        direction="column"
        md={6}
        style={{
          marginTop: "100px",
          marginLeft: matchesSM ? "10px" : "inherit",

          width: matchesXS ? "500px" : "500px",
        }}
      >
        <Typography variant="h5">Delivery Address</Typography>
        <br />
        <br />
        {showAddress()}
        <hr />
        <Typography variant="h5">Got Coupon?</Typography>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        style={{ marginTop: "100px" }}
        md={6}
      >
        <Card
          variant="outlined"
          style={{
            marginLeft: matchesSM ? "10px" : "inherit",
            width: matchesSM ? "500px" : "500px",
            marginLeft: matchesMD ? "10px" : "inherit",
          }}
        >
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            style={{ marginTop: "100px" }}
          >
            <Grid item align="center">
              <Typography variant="h5">Order Summary</Typography>
              <hr />
              <p>Products {products.length}</p>
              <hr />
              {showProductSummary()}
              <hr />
              <p>Cart Total: {total}</p>

              {totalAfterDiscount > 0 && (
                <p className="bg-success p-2">
                  Discount Applied: Total Payable: ${totalAfterDiscount}
                </p>
              )}
            </Grid>
            <Grid item container justify="space-evenly">
              <Grid item>
                {COD ? (
                  <button
                    className="btn btn-primary"
                    disabled={!addressSaved || !products.length}
                    onClick={createCashOrder}
                  >
                    Place Order
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    disabled={!addressSaved || !products.length}
                    onClick={() => history.push("/payment")}
                  >
                    Place Order
                  </button>
                )}
              </Grid>

              <Grid item>
                <button
                  disabled={!products.length}
                  onClick={emptyCart}
                  className="btn btn-primary"
                >
                  Empty Cart
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Checkout;
