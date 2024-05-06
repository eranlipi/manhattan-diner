import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Typography , Button} from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react'
import { useForm } from 'react-hook-form';
import { validationSchema } from '../../../utils/validations';
import ErrorMessage from '../errorMessage';

const CommonModal = ({open , setOpen , commonModalHeading}) => {
    const t = useTranslations("header")

    const handleClose = () => {
        setOpen(false);
      };

      const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
        getValues,
      } = useForm({ mode: "onChange", resolver: yupResolver(validationSchema) });

      const onSubmit = async (data, e) => {
        if (e.key === "Enter") {
          setFormData(formData);
        }
    
        // const data2 = {
        //   oldPassword: data?.oldPassword,
        //   newPassword: data?.newPassword,
        // };
        console.log("data2", data);
        return
      };

  return (
    <Dialog
    open={open}
    onClose={handleClose}
  
  >
    <DialogTitle>{t(commonModalHeading)}</DialogTitle>

    <form onSubmit={handleSubmit(onSubmit)} style={{textAlign:"-webkit-center"}}>
      <DialogContent
      sx={{
        visibility:"hidden",
        height:"1px"
      }}
      >
        <DialogContentText>
          {t("EnterOldPassword")}
        </DialogContentText>
      </DialogContent>

      {/* <DialogActions> */}
        <Box sx={{  width:"90%"}}>
          <TextField
            {...register("name")}
          
            name="name"
            id="name"
            // type="password"
            margin="normal"
            fullWidth
            label={t("Name")}
            sx={{
              mt:0
            }}
            // autoComplete="current-password"
            onChangeCapture={(e) => {
              setValue("name", e.currentTarget.value);

              
            }}
          />
          {errors?.name && (
            <ErrorMessage
            message={errors?.name?.message}
            />
           
          )}

          <TextField
            {...register("title")}
        
            name="title"
            id="title"
            // type="password"
            margin="normal"
            fullWidth
            label={t("Title")}
            // autoComplete="current-password"
            onChangeCapture={(e) => {
              setValue("title", e.currentTarget.value);

              
            }}
          />
          {errors?.title && (
              <ErrorMessage
              message={errors?.title?.message}
              />
          )}
           <TextField
            {...register("email")}
        
            name="email"
            id="email"
            // type="password"
            margin="normal"
            fullWidth
            label={t("Email")}
            // autoComplete="current-password"
            onChangeCapture={(e) => {
              setValue("email", e.currentTarget.value);

              
            }}
          />
          {errors?.email && (
              <ErrorMessage
              message={errors?.email?.message}
              />
          )}

<TextField
            {...register("role")}
        
            name="role"
            id="role"
            // type="password"
            margin="normal"
            fullWidth
            label={t("Role")}
            // autoComplete="current-password"
            onChangeCapture={(e) => {
              setValue("role", e.currentTarget.value);

              
            }}
          />
          {errors?.role && (
              <ErrorMessage
              message={errors?.role?.message}
              />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
            onKeyDown={(e) => onSubmit(getValues, e)}
            disabled={Object.keys(errors).length > 0 ? true : false}
          >
            {t("Submit")}
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
  )
}

export default CommonModal