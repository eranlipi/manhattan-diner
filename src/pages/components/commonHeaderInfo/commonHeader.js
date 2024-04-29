import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslations } from "next-intl";

const CommonHeader = ({ heading, buttonText, subHeading }) => {
  const t = useTranslations("header");
  return (
    <Box mt={5} >
      <Grid container sx={{justifyContent:"center" , alignItems:"center" }}>
        <Grid item xs={12} sm={9} >
          <Typography variant="h5">{t(heading)}</Typography>
          <Typography variant="subtitle1">{t(subHeading)}</Typography>
        </Grid>
        <Grid item xs={12} sm={3} textAlign="end">
          <Button variant="contained" size="large">{t(buttonText)}</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommonHeader;
