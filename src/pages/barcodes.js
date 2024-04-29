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
import { useTranslations } from "next-intl";
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
  const t = useTranslations("header")
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
        {t("List of Products")}
       </Typography>
       <Button size="large" color="success" variant="contained" onClick={()=>setOpen(true)}>{t("Add Product")}</Button>
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
        }}>{t("Add Product")}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            // visibility:"hidden",
            height:"10px"
          }}>
            {t("subscribeToThisWebsite")}
          </DialogContentText>
          <TextField
          sx={{mt:4}}
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label={t("Title")}
            fullWidth
            variant="standard"
          />
             <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label={t("Price")}
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
            label={t("Description")}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Cancel")}</Button>
          <Button type="submit">{t("Submit")}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Barcodes;


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
