import { Box } from "@mui/material";
import React from "react";
import Dashboard from "./components/Dashboard";
import CommonHeader from "./components/commonHeaderInfo/commonHeader";
import CommonTable from "./components/commonHeaderInfo/commonTable/CommonTable";
const Invoices = () => {
  return (
    <Box sx={{display:"flex"}}>

    <Dashboard />
    <Box sx={{ width:"100%" , height:"100%" , margin:5 , marginTop:10}}>
     <CommonHeader heading={"Invoices"} subHeading={"A list of all users in your account including your email , role , title and name"} buttonText ={"Add Invoices"} />
     <CommonTable />
    </Box>
    </Box>
  );
};

export default Invoices;
