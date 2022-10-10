import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const OrdersTable = ({orders}) => {
  return (
    <BaseCard title="All Orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                User Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Order Id / Txn Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Total
              </Typography>
            </TableCell>
			<TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
			<TableCell>
              <Typography color="textSecondary" variant="h6">
                Ordered At
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                {order.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {order.orderId}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
					{order.tansactionId}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
			  <TableCell>
                <Typography variant="h6">{order.amount}</Typography>
              </TableCell>
			  <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: order.status == 'success' ? 'green' : 'red',
                    color: "#fff",
                  }}
                  size="small"
                  label={order.status}
                ></Chip>
              </TableCell>
			  <TableCell>
                <Typography variant="h6">{new Date(order.createdAt).toISOString().split('T')[0]}</Typography>
              </TableCell>
			  
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default OrdersTable;
