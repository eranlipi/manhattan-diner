"use client"
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import CommonModal from "../commonModalToAddData/commonModal";

     const CommonHeader = ({ heading, buttonText, subHeading , secondButtonText , editData}) => {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  return (
    <>
    
    <Box mt={5} sx={{
    }} >
      <Grid container sx={{justifyContent:"center" , alignItems:"center" }}>
        <Grid item xs={12} sm={6} >
          <Typography variant="h5">{t(heading)}</Typography>
          {/* <Typography variant="subtitle1">{t(subHeading)}</Typography> */}
        </Grid>
        <Grid item xs={12} sm={6} textAlign="end" sx={{
          display:"flex",
          justifyContent:"space-around"
        }}>
          <Button variant="contained" size="large" onClick={()=>setOpen(true)}>{t(buttonText)}</Button>
          {/* {
            secondButtonText && (

              <Button variant="contained" size="large" >{t(secondButtonText)}</Button>
            )
            
          } */}

        </Grid>
      </Grid>
    </Box>
    {/* <CommonModal
    open={open}
    setOpen={setOpen}
    commonModalHeading={buttonText}
    editData={editData ?  editData : null}
    /> */}
    </>
  );
};

export default CommonHeader;
