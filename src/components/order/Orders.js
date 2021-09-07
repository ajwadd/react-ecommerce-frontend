import React, { useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  GridMargin: {},
  divider: {
    backgroundColor: "#4A74B9",
    marginTop: "50px",
  },
}));

const Orders = ({ orders, handleStatusChange }) => {
  const classes = useStyles();

  const showOrderInTable = (order) => (
    <>
      <Table>
        <TableHead style={{ backgroundColor: "#E2E3F3" }}>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Shipping</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.products.map((p, i) => (
            <TableRow key={p._id}>
              <TableCell component="th" scope="row">
                {p.product.title}
              </TableCell>
              <TableCell align="right">{p.product.price}</TableCell>
              <TableCell align="right">{p.product.brand}</TableCell>
              <TableCell align="right">{p.count}</TableCell>
              <TableCell align="right">
                {p.product.shipping === "Yes" ? (
                  <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                  <CloseCircleOutlined style={{ color: "red" }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );

  return (
    <>
      {orders.map((order) => (
        <Grid
          item
          container
          direction="column"
          key={order._id}
          className={classes.GridMargin}
        >
          <Grid item>
            <Paper>
              <ShowPaymentInfo order={order} showStatus={false} />
            </Paper>
          </Grid>

          <Grid item container className={classes.containerOrder}>
            <Grid item xs={4}>
              <Typography variant="h6">Delivery Status</Typography>
            </Grid>
            <Grid xs={8}>
              <select
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="form-control"
                defaultValue={order.orderStatus}
                name="status"
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </Grid>
          </Grid>
          {showOrderInTable(order)}
          <Divider className={classes.divider} />
        </Grid>
      ))}
    </>
  );
};

export default Orders;
