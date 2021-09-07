import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const History = () => {
  const theme = useTheme();

  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
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
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <Paper key={i}>
        <Grid item>
          <ShowPaymentInfo order={order} />
        </Grid>
        <Grid item>{showOrderInTable(order)}</Grid>
        <Grid item>{showDownloadLink(order)}</Grid>
      </Paper>
    ));

  return (
    <Grid item container>
      <Grid item container xs={2}>
        <UserNav />
      </Grid>
      <Grid
        item
        container
        xs={10}
        style={{ marginTop: "100px", paddingLeft: matches ? "31px" : "14px " }}
      >
        <h4>
          {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
        </h4>
        <Grid
          item
          container
          direction="column"
          style={{ paddingLeft: matches ? "5px" : "14px " }}
        >
          {showEachOrders()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default History;
