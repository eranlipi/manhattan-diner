import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import CommonHeader from "./components/commonHeaderInfo/commonHeader";
import CommonTable from "./components/commonHeaderInfo/commonTable/CommonTable";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DetailsIcon from "@mui/icons-material/Details";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

const headings = [
  "Supplier Nmae",
  "Product",
  "Price",
  "date",
  "File",
  "Status",
  "Action",
];

const Expenses = () => {
  const [allInvoicesList, setAllInvoicesList] = useState([]);
  const [value, setValue] = useState("year");

  console.log("allInvoicesList", allInvoicesList);

  const getAllInvoices = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/invoices`
      );
      if (response?.status) {
        setAllInvoicesList(response?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllInvoices();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Dashboard />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          margin: { xs: 0, sm: 5 },
          marginTop: { xs: 8 },
        }}
      >
        {/* <CommonHeader
          heading={"Expenses"}
          subHeading={
            "A list of all users in your account including your email , role , title and name"
          }
          buttonText={"Add expenses"}
        /> */}
        {/* <CommonTable /> */}
        <Grid container mt={8}>
          <Grid xs={12} sm={4}>
            <Paper>
              <Box p={1}>
                <Typography>
                  Month: <span style={{ fontWeight: "bold" }}>May</span>
                </Typography>
                <Typography>
                  Paid: <span style={{ fontWeight: "bold" }}>4</span>
                </Typography>
                <Typography>
                  Not Paid: <span style={{ fontWeight: "bold" }}>4</span>
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid xs={12} sm={8}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Button variant="contained">Add Invoice</Button>
              {/* <Button variant="contained">Send to Email</Button> */}
            </Box>
          </Grid>
        </Grid>
        {/* //tabs */}
        <Box sx={{ width: "100%" }} mt={2}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="year" label="Year" />
            <Tab value="month" label="Month" />
          </Tabs>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            mt: 5,
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {headings?.map((item) => {
                  return (
                    <TableCell sx={{ fontSize: "bold" }} key={item}>
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {allInvoicesList?.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {"Supplier Name"}
                  </TableCell>
                  <TableCell>{"Product"}</TableCell>

                  <TableCell>{row?.amount}</TableCell>
                  <TableCell>{"Date"}</TableCell>
                  <TableCell>{"File"}</TableCell>
                  <TableCell>{"Status"}</TableCell>

                  <TableCell align="start">
                    <IconButton
                    // onClick={() => {
                    //   setEditData(row);
                    //   setOpen(true);
                    // }}
                    >
                      <EditIcon sx={{ color: "#3f51b5" }} />
                    </IconButton>

                    <IconButton
                    // onClick={() => {
                    //   setOpenModal(true);
                    //   setEmployeeId(row?.id);
                    // }}
                    >
                      <DetailsIcon sx={{ color: "#3f51b5" }} />
                    </IconButton>
                    <IconButton>
                      <ForwardToInboxIcon sx={{ color: "#3f51b5" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Expenses;

export async function getStaticProps(context) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  };
}
