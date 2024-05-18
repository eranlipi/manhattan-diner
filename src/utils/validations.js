import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().label("Name").required("Name is required"),
  quantity: yup.string().label("Quantity").required("Quantity is required"),
  price: yup.string().label("Price").required("Price is required"),
  max: yup.string().label("max stock").required("max stock is required"),
});

export const employeeValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required("Name is required"),
  role: yup.string().label("Role").required("Role is required"),
  status: yup.string().label("Status").required("Status is required"),
  phone: yup.string().label("Phone").required("Phone is required"),
  salary: yup.string().label("Salary").required("Salary is required"),
});

export const taskValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required("Name is required"),
  description: yup
    .string()
    .label("Description")
    .required("Description is required"),
  status: yup.string().label("Status").required("Status is required"),
  type: yup.string().label("Type").required("Type is required"),
  user_id: yup.string().label("User").required("User is required"),
  due_date: yup.string().required("Date is required"),
});
