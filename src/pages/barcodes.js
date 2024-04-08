import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Divider from '@mui/material/Divider';
import CommonTable from "./components/commonHeaderInfo/commonTable/CommonTable";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const headings = ["ID" ,"Title" , "Price" , "Barcode" , "Description"]
const tableData = [{
  id:"1",
  title:"First Title" ,
  price:"1000",
  barcode:"barcode sample",
  description:"product sample description"
}]

const Barcodes = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>

    <Box sx={{display:"flex"}}>
      <Dashboard />
      <Box sx={{ width:"100%" , height:"100%" , marginTop:10 , textAlign:"center"}}>
  
      <Box sx={{display:"flex" , justifyContent:"space-between"}} ml={5} mr={5}>
       <Typography variant="h4" color={"red"}>
        List of Products
       </Typography>
       <Button size="large" color="success" variant="contained" onClick={()=>setOpen(true)}>Add Product</Button>
      </Box>
      <Divider  sx={{marginTop:1}} />
      <CommonTable headings={headings} tableData = {tableData} />
      
      </Box>
    </Box>
    <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle sx={{
          textAlign:"center"
        }}>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            visibility:"hidden",
            height:"10px"
          }}>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
          />
             <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
          />
                <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Barcodes;
