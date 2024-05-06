import * as yup from "yup";

export const validationSchema = yup.object().shape({
    name: yup
      .string()
      .label("Name")
      .required("Name is required"),
    title: yup
      .string()
      .label("Title")
      .required("Title is required"),
    email: yup
      .string()
      .label("Email")
      .required("Email is required")
      .email("Email must be in a valid format"),
    role: yup
      .string()
      .label("Role")
      .required("Role is required"),
  });
  