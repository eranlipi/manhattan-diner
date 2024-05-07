import * as yup from "yup";

export const validationSchema = yup.object().shape({
    name: yup
      .string()
      .label("Name")
      .required("Name is required"),
    quantity: yup
      .string()
      .label("Quantity")
      .required("Quantity is required"),
    price: yup
      .string()
      .label("Price")
      .required("Price is required")
      ,
    max: yup
      .string()
      .label("Need to Order")
      .required("Need to Order is required"),
  });
  