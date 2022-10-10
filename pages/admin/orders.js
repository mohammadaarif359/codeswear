import React from 'react'
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import OrdersTable from "../../src/components/dashboard/OrdersTable";
const mongoose = require('mongoose');
import Order from '../../models/Order'

const Orders = ({orders,logout}) => {
  return (
    <ThemeProvider theme={theme}>
	  <FullLayout logout={logout}>
		<Grid container spacing={0}>
		  <Grid item xs={12} lg={12}>
			<OrdersTable orders={orders}/>
		  </Grid>
		</Grid>
	  </FullLayout>
	</ThemeProvider>
  )	
}

export default Orders

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState) {
    const con = await mongoose.connect(process.env.MONGO_URI)
  }
  //console.log(`MongoDB Connected : ${con.connection.host}`)
  let orders = await Order.find();
  
  return {
    props: {orders:JSON.parse(JSON.stringify(orders))}, // will be passed to the page component as props
  }
}