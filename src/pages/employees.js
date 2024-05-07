import { Box , Grid , Paper} from "@mui/material";
import React from "react";
// import Orders from "./Orders";
import Deposits from "./components/Deposits";
import Dashboard from "./components/Dashboard";
import CommonHeader from "./components/commonHeaderInfo/commonHeader";
import CommonTable from "./components/commonHeaderInfo/commonTable/CommonTable";
const Invoices = () => {
  return (
    <Box sx={{display:"flex"}}>

    <Dashboard />
    <Box sx={{ width:"100%" , height:"100%" , margin:5 , marginTop:10}}>
     <CommonHeader heading={"Employees"} subHeading={"A list of all users in your account including your email , role , title and name"} buttonText ={"Add Employees"} />
     <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Deposits />
                  </Paper>
                </Grid>
     <CommonTable />
    </Box>
    </Box>
  );
};

export default Invoices;

export async function getStaticProps(context) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../../messages/${context.locale}.json`)).default
    }
  };
}
