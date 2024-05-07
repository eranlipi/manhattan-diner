import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Typography , Button} from '@mui/material';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { validationSchema } from '../../../utils/validations';
import ErrorMessage from '../errorMessage';
import { notifyError, notifySuccess } from "../../../utils/toast";


const CommonModal = ({open , setOpen , commonModalHeading , getInventoriesList , editData , setEditData}) => {
    const t = useTranslations("header")

    console.log("editData222" , editData);

 

      const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
        getValues,
        reset,
      } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema)
        
      });

      useEffect(() => {
        if(editData){
          
          
          setValue("name" , editData?.name);
          setValue("price" , editData?.price);
          setValue("quantity" , editData?.quantity);
          setValue("max" , editData?.maxquantity);

        }
      
      
      }, [editData])

      const handleClose = () => {
        setOpen(false);
        setEditData(null);
        reset()
      };
      
      

      const onSubmit = async (data, e) => {
        if (e.key === "Enter") {
          setFormData(formData);
        }
        const url = editData ? `${process.env.NEXT_PUBLIC_BASE_URL}api/product/${editData?.id}` : `${process.env.NEXT_PUBLIC_BASE_URL}api/product` 
    
        const data2 = {
          name: data?.name,
          price:data?.price,
          quantity: data?.quantity,
          maxquantity:data?.max
        };
       try {
        const response = await axios.post(url, data2);
        setOpen(false);
        notifySuccess(editData ? "Product Updated Successfully" : "Product Added Successfully");
        reset();
        setEditData(null)

        getInventoriesList();

        
        
        
       } catch (error) {
        console.log("error");
        notifyError(error)
       }
        return
      };

  return (
    <Dialog
    open={open}
    onClose={handleClose}
  
  >
    <DialogTitle>{editData ? "Update Product" : "Add Product"}</DialogTitle>

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
               
              setValue("name", e.target.value);

              
            }}
          />
          {errors?.name && (
            <ErrorMessage
            message={errors?.name?.message}
            />
           
          )}

          <TextField
            {...register("quantity")}
        
            name="quantity"
            id="quantity"
            type="number"
            margin="normal"
            fullWidth
            label={t("Quantity")}
            // autoComplete="current-password"
            onChangeCapture={(e) => {
              setValue("quantity", e.target.value);

              
            }}
          />
          {errors?.quantity && (
              <ErrorMessage
              message={errors?.quantity?.message}
              />
          )}
           <TextField
            {...register("price")}
        
            name="price"
            id="price"
            type="number"
            margin="normal"
            fullWidth
            label={t("Price")}
            // autoComplete="current-password"
            onChangeCapture={(e) => {
              setValue("price", e.target.value);

              
            }}
          />
          {errors?.price && (
              <ErrorMessage
              message={errors?.price?.message}
              />
          )}

<TextField
            {...register("max")}
        
            name="max"
            id="max"
            type="number"
            margin="normal"
            fullWidth
            label={t("Need to Order")}
            // autoComplete="current-password"
            onChangeCapture={(e) => {
              setValue("max", e.target.value);

              
            }}
          />
          {errors?.max && (
              <ErrorMessage
              message={errors?.max?.message}
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