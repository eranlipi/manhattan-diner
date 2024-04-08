import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const CommonHeader = ({ heading, buttonText, subHeading }) => {
  return (
    <Box>
      <Grid container sx={{justifyContent:"center" , alignItems:"center"}}>
        <Grid item xs={9}>
          <Typography variant="h5">{heading}</Typography>
          <Typography variant="subtitle1">{subHeading}</Typography>
        </Grid>
        <Grid item xs={3} textAlign="end">
          <Button variant="contained" size="large">{buttonText}</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommonHeader;
