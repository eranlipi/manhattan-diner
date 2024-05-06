import {
  Avatar,
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("header")

  const userInfoString = getCookie("userInfo");

  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  console.log("userInfouserInfo" ,userInfo);
  const handleClose = () => {
    setOpen(false);
  };



  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .label("oldPassword")
      .required(t("Old Password Is required")),
    newPassword: yup
      .string()
      .label("newPassword")
      .required(t("New Password is required")),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = async (data, e) => {
    if (e.key === "Enter") {
      setFormData(formData);
    }

    const data2 = {
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    };
    console.log("data2", data);
    return
  };
  console.log("errors" , errors);
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Dashboard />

        <Box sx={{ width: "100%", height: "100%", marginTop: 10 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={
                "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              }
              sx={{
                width: 100,
                height: 100,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "baseline",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ width: "50%" }}>
              {t("Name")}
            </Typography>
            <Typography variant="subtitle2" sx={{ width: "50%" }}>
              {userInfo?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "baseline",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ width: "50%" }}>
              {t("Email")}
            </Typography>
            <Typography variant="subtitle2" sx={{ width: "50%" }}>
              {userInfo?.email}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }} mt={5}>
            <Button variant="contained" onClick={() => setOpen(true)}>
              {t("Change Password")}
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
      
      >
        <DialogTitle>{t("Update Password")}</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} style={{textAlign:"-webkit-center"}}>
          <DialogContent>
            <DialogContentText>
              {t("EnterOldPassword")}
            </DialogContentText>
          </DialogContent>

          {/* <DialogActions> */}
            <Box sx={{  width:"90%"}}>
              <TextField
                {...register("oldPassword")}
              
                name="oldPassword"
                id="oldPassword"
                // type="password"
                margin="normal"
                fullWidth
                label={t("Old Password")}
                // autoComplete="current-password"
                onChangeCapture={(e) => {
                  const trimmedValue = e.currentTarget.value
                    ?.trimStart()
                    ?.trimEnd()
                    ?.replace(/ +(?= )/g, "");

                  if (trimmedValue !== undefined) {
                    setValue("oldPassword", trimmedValue);
                  }
                }}
              />
              {errors?.oldPassword && (
                <Typography color={"red"} fontSize={"12px"} sx={{textAlign:"justify"}}>
                  {errors.oldPassword.message}
                </Typography>
              )}

              <TextField
                {...register("newPassword")}
            
                name="newPassword"
                id="newPassword"
                // type="password"
                margin="normal"
                fullWidth
                label={t("New Password")}
                // autoComplete="current-password"
                onChangeCapture={(e) => {
                  const trimmedValue = e.currentTarget.value
                    ?.trimStart()
                    ?.trimEnd()
                    ?.replace(/ +(?= )/g, "");

                  if (trimmedValue !== undefined) {
                    setValue("newPassword", trimmedValue);
                  }
                }}
              />
              {errors?.newPassword && (
                <Typography color={"red"} fontSize={"12px"} sx={{textAlign:"justify"}}>
                  {errors?.newPassword.message}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onKeyDown={(e) => onSubmit(getValues, e)}
                disabled={Object.keys(errors).length > 0 ? true : false}
              >
                {t("Update Password")}
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{ width: "100%" , mb:1 }}
              >
                {t("Cancel")}
              </Button>
            </Box>
        
        </form>
      </Dialog>
    </Box>
  );
};

export default Settings;


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