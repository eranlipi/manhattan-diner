import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import CommonHeader from "./components/commonHeaderInfo/commonHeader";
import CommonTable from "./components/commonHeaderInfo/commonTable/CommonTable";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import { useTranslations } from "use-intl";
import EditIcon from "@mui/icons-material/Edit";
import { getCookie } from "cookies-next";


const headings = ["Product Name", "In Stock", "Need to Order", "Price", "Barcode" , "Action"]

const Inventory = () => {
  const [inventoriesList, setInventoriesList] = useState([]);
  const t = useTranslations("header")
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const userInfoString = getCookie("userInfo");

  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  const getInventoriesList = async()=>{
    let data = new FormData();
    data?.append("user_id" , 1)
    try {
      const response = await axios.get(`${baseUrl}api/inventory/` , data);
      
      setInventoriesList(response?.data)

      
    } catch (error) {
      console.log("error");
      
    }

  }
  useEffect(() => {
    
    getInventoriesList()
   
  }, [])
  console.log("inventoriesList" , inventoriesList);
  
  return (
    <Box sx={{display:"flex"}}>

    <Dashboard />
    <Box sx={{ width:"100%" , height:"100%" , margin:5 , marginTop:10}}>
     <CommonHeader heading={"Inventory"} subHeading={"A list of all users in your account including your email , role , title and name"} buttonText ={"Add Product"} secondButtonText={"Read Barcode"} />
    

<TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              headings?.map((item)=>{
                return(

                  <TableCell sx={{fontSize:"bold"}}>{item}</TableCell>
                )
              })
            }

          </TableRow>
        </TableHead>
        <TableBody>
          {inventoriesList.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell >{row?.quantity}</TableCell>
              <TableCell >{"Not Avalable"}</TableCell>
              <TableCell >{row?.price}</TableCell>
              <TableCell >{row?.barcode_image ? row?.barcode_image : "Null"}</TableCell>
              <TableCell align="inherit">
                  <IconButton>
                    <EditIcon sx={{ color: "#3f51b5" }} />
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

export default Inventory;
export async function getStaticProps(context) {
  return {
    props: {
     
      messages: (await import(`../../messages/${context.locale}.json`)).default
    }
  };
}
