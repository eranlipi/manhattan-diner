import { Box, Button, Grid, Typography } from "@mui/material";
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
import CommonModal from "./components/commonModalToAddData/commonModal";


const headings = ["Product Name", "In Stock", "Need to Order", "Price", "Barcode" , "Action"]

const Inventory = () => {
  const [inventoriesList, setInventoriesList] = useState([]);
  const [editData, setEditData] = useState(null)
  const [open, setOpen] = useState(false)
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
    
    getInventoriesList();
   
  }, [])
  
  return (
    <>
    
    <Box sx={{display:"flex"}}>

    <Dashboard />
    <Box sx={{ width:"100%" , height:"100%" , margin:5 , marginTop:10}}>
    <Box mt={5} sx={{
    }} >
      <Grid container sx={{justifyContent:"center" , alignItems:"center" }}>
        <Grid item xs={12} sm={6} >
          <Typography variant="h5">{t("Inventory")}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="end" sx={{
          display:"flex",
          justifyContent:"space-around"
        }}>
          <Button variant="contained" size="large" onClick={()=>{
            setEditData(null);
            setOpen(true);
            }}>{t("Add Product")}</Button>
          

        </Grid>
      </Grid>
    </Box>
     {/* <CommonHeader heading={"Inventory"} subHeading={"A list of all users in your account including your email , role , title and name"} buttonText ={"Add Product"}
     editData={editData}
     secondButtonText={"Read Barcode"} 
     getInventoriesList= {getInventoriesList}
     /> */}
    

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
              <TableCell >{row?.maxquantity}</TableCell>
              <TableCell >{row?.price}</TableCell>
              <TableCell >{row?.barcode_image ? row?.barcode_image : "Null"}</TableCell>
              <TableCell align="inherit">
                  <IconButton onClick={()=>{
                    setEditData(row);
                    setOpen(true)
                    }}>
                    <EditIcon sx={{ color: "#3f51b5" }}  />
                  </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Box>
    <CommonModal
    open={open}
    setOpen={setOpen}
    getInventoriesList={getInventoriesList}
    editData={editData ?  editData : null} 
    setEditData={setEditData}   
    />
</>
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
