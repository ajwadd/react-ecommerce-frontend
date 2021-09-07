import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  GridAdmin: {
    marginTop: "100px",
    [theme.breakpoints.down("lg")]: {
      paddingLeft: "0px",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "0px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "40px",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "66px",
    },
  },
  drawer: {
    backgroundColor: "blue",
    marginTop: "400px",
    width: "100px",
    color: "blue",
  },
  navAdm: {},
}));

const AdminDashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <Grid item container>
      <Grid item container xs={2} className={classes.navAdm}>
        <AdminNav />
      </Grid>

      <Grid item container xs={10} className={classes.GridAdmin}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Orders orders={orders} handleStatusChange={handleStatusChange} />
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
