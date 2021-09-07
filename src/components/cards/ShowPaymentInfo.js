import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";



const ShowPaymentInfo = ({ order }) => (
  <Grid item container>
      <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
        <p>
      <span style={{paddingLeft:'5px'}}>Order Id: {order.paymentIntent.id}</span>
      <span style={{paddingLeft:'10px'}}>Amount:{(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })} </span> 
      <span style={{paddingLeft:'10px'}}>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      <span style={{paddingLeft:'10px'}}>Method: {order.paymentIntent.payment_method_types[0]}</span>
      <span style={{paddingLeft:'10px'}}>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      <span style={{paddingLeft:'10px'}}>Orderd on: {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>
      <span style={{paddingLeft:'10px'}}>STATUS: {order.orderStatus}</span> 
        </p>
      </Box>
     
  </Grid>
);

export default ShowPaymentInfo;
