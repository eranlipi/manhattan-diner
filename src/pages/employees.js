import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import CommonHeader from "./components/commonHeaderInfo/commonHeader";
import CommonTable from "./components/commonHeaderInfo/commonTable/CommonTable";
import { notifySuccess, notifyError } from "../utils/toast";
import { Controller } from "react-hook-form";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { employeeValidationSchema } from "../utils/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTranslations } from "next-intl";
import ErrorMessage from "./components/errorMessage";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

import LineChart from "./components/lineChart/lineChart";
const headings = ["Name", "Role", "Status", "Phone", "Salary", "Action"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Invoices = () => {
  const [employeesList, setEmployeesList] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [emploeeId, setEmployeeId] = useState();

  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeEmployeesNumber, setActiveEmployeesNumber] = useState();
  const [userRoles, setUserRoles] = useState();
  const [activeUserRoles, setActiveUserRoles] = useState();

  useEffect(() => {
    if (employeesList) {
      const array = employeesList?.filter((item) => item?.status === "active");
      setActiveEmployeesNumber(array?.length);

      const uniqueRoles = [...new Set(employeesList.map((obj) => obj.role))];
      const roleCounts = uniqueRoles.map(
        (role) =>
          employeesList.filter(
            (obj) => obj.role === role && obj.status === "active"
          ).length
      );

      setUserRoles(uniqueRoles);
      setActiveUserRoles(roleCounts);
    }
  }, [employeesList]);

  const t = useTranslations("header");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    getValues,
    reset,
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(employeeValidationSchema),
  });

  useEffect(() => {
    if (editData) {
      setValue("name", editData?.name);
      setValue("role", editData?.role);
      setValue("status", editData?.status === "active" ? "Active" : "Inactive");
      setValue("phone", editData?.phone);
      setValue("salary", editData?.salary);
    }
  }, [editData]);

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
    reset();
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/employees`
      );
      if (response.status) {
        setEmployeesList(response?.data);
      }
    } catch (error) {
      notifyError("Something Went Wrong");
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const handleCloseConfirmModal = () => {
    setOpenModal(false);
  };

  const onSubmit = async (data, e) => {
    if (e.key === "Enter") {
      setFormData(formData);
    }
    // debugger
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}api/employees`;

    const data2 = {
      name: data?.name,
      role: data?.role,
      phone: data?.phone,
      salary: data?.salary,
      status: data?.status === "Active" ? "active" : "not",
    };
    try {
      const response = editData
        ? await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/employees/${editData?.id}`,
            data2
          )
        : await axios.post(url, data2);
      setOpen(false);

      if (response.status) {
        notifySuccess(
          editData
            ? "Product Updated Successfully"
            : "Product Added Successfully"
        );
        getEmployees();
      }
      reset();
      setEditData(null);

      getEmployees();
    } catch (error) {
      console.log("error");
      notifyError("Something Went Wrong");
    }
    return;
  };

  useEffect(() => {
    if (!open) {
      setEditData(null);
    }
  }, [editData]);

  const deleteEmployee = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/employees/${emploeeId}`
      );
      if (response?.status) {
        notifySuccess("Employee Successfully Deleted");
        getEmployees();
      }
    } catch (error) {
      notifyError("Something Went Wrong");
    }
    setOpenModal(false);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Box sx={{ width: "100%", height: "100%", margin: 5, marginTop: 10 }}>
          <Box mt={5} sx={{}}>
            <Grid
              container
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid item xs={12} sm={3}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: 3,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6">Active Employees</Typography>
                  <Typography variant="h6">{activeEmployeesNumber}</Typography>
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                sm={9}
                textAlign="end"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "200px", sm: "300px", md: "700px" },

                    height: { xs: "100px", sm: "150px", md: "200px" },
                    textAlign: "-webkit-right",
                  }}
                >
                  <LineChart
                    userRoles={userRoles}
                    activeUserRoles={activeUserRoles}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    height: "60px",
                    width: "30%",
                  }}
                  onClick={() => {
                    setEditData(null);
                    setOpen(true);
                  }}
                >
                  {"Add Employee"}
                </Button>
              </Grid>
            </Grid>
          </Box>
          {/* <Box mb={2}>
            <Box
              sx={{
                width: { xs: "200px", sm: "300px", md: "100%" },

                height: { xs: "100px", sm: "150px", md: "200px" },
              }}
            >
              <LineChart />
            </Box>
          </Box> */}

          <TableContainer
            component={Paper}
            sx={{
              mt: 5,
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headings?.map((item) => {
                    return (
                      <TableCell sx={{ fontSize: "bold" }}>{item}</TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {employeesList?.map((row) => (
                  <TableRow
                    key={row?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.name}
                    </TableCell>
                    <TableCell>{row?.role}</TableCell>
                    <TableCell>
                      {row.status === "active" ? (
                        <ToggleOnIcon
                          sx={{
                            color: "green",
                          }}
                        />
                      ) : (
                        <ToggleOffIcon
                          sx={{
                            color: "black",
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{row?.phone}</TableCell>
                    <TableCell>{row?.salary}</TableCell>
                    <TableCell align="start">
                      <IconButton
                        onClick={() => {
                          setEditData(row);
                          setOpen(true);
                        }}
                      >
                        <EditIcon sx={{ color: "#3f51b5", marginRight: 1 }} />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setOpenModal(true);
                          setEmployeeId(row?.id);
                        }}
                      >
                        <DeleteIcon sx={{ color: "#3f51b5" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <CommonHeader heading={"Employees"} subHeading={"A list of all users in your account including your email , role , title and name"} buttonText ={"Add Employees"} />
     <CommonTable /> */}
        </Box>
      </Box>

      <React.Fragment>
        <Dialog
          open={openModal}
          onClose={handleCloseConfirmModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are You Sure you want to delete?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleCloseConfirmModal}>{t("Cancel")}</Button>
            <Button autoFocus variant="contained" onClick={deleteEmployee}>
              {"Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editData ? "Update Employee" : "Add Employee"}
        </DialogTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ textAlign: "-webkit-center" }}
        >
          <DialogContent
            sx={{
              visibility: "hidden",
              height: "1px",
            }}
          >
            <DialogContentText>{t("EnterOldPassword")}</DialogContentText>
          </DialogContent>

          {/* <DialogActions> */}
          <Box sx={{ width: "90%" }}>
            <TextField
              {...register("name")}
              name="name"
              id="name"
              // type="password"
              margin="normal"
              fullWidth
              label={t("Name")}
              // autoComplete="current-password"
              onChangeCapture={(e) => {
                setValue("name", e.target.value);
              }}
              sx={{
                mt: 0,
              }}
            />
            {errors?.name && <ErrorMessage message={errors?.name?.message} />}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel
                    sx={{
                      textAlign: "start",
                    }}
                    htmlFor="role-label"
                  >
                    Role
                  </InputLabel>

                  <Select
                    {...field}
                    labelId="role-label"
                    label="Role"
                    value={getValues().role}
                    onChange={(e) => {
                      // handleChangeCategories(e);
                      field.onChange(e);
                      setValue("role", e.target.value);
                    }}
                    onLoad={(e) => {}}
                    input={
                      <OutlinedInput label="Role" sx={{ textAlign: "start" }} />
                    }
                    MenuProps={MenuProps}
                    fullWidth
                    sx={{ mb: 1, textAlign: "start" }}
                    textAlign={"start"}
                  >
                    {["Admin", "Manager", "IT", "Regular user"].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {errors?.role && <ErrorMessage message={errors?.role?.message} />}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel
                    sx={{
                      textAlign: "start",
                    }}
                    htmlFor="status-label"
                  >
                    Status
                  </InputLabel>
                  <Select
                    {...field}
                    label="Status"
                    labelId="status-label"
                    // multiple
                    value={getValues().status}
                    onChange={(e) => {
                      // handleChangeCategories(e);
                      field.onChange(e);
                      setValue("status", e.target.value);
                    }}
                    onLoad={(e) => {}}
                    input={
                      <OutlinedInput
                        label="Status"
                        sx={{ textAlign: "initial" }}
                      />
                    }
                    MenuProps={MenuProps}
                    fullWidth
                  >
                    {["Active", "Inactive"].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {/* <TextField
            {...register("status")}
        
            name="status"
            id="status"
            // type="number"
            margin="normal"
            fullWidth
            label={"Status"}
            // autoComplete="current-password"
            onChangeCapture={(e) => {
              setValue("status", e.target.value);

              
            }}
          /> */}
            {errors?.status && (
              <ErrorMessage message={errors?.status?.message} />
            )}

            <TextField
              {...register("phone")}
              name="phone"
              id="phone"
              type="number"
              margin="normal"
              fullWidth
              label={"Phone"}
              // autoComplete="current-password"
              onChangeCapture={(e) => {
                setValue("phone", e.target.value);
              }}
            />
            {errors?.phone && <ErrorMessage message={errors?.phone?.message} />}

            <TextField
              {...register("salary")}
              name="salary"
              id="salary"
              type="number"
              margin="normal"
              fullWidth
              label={"Salary"}
              // autoComplete="current-password"
              onChangeCapture={(e) => {
                setValue("salary", e.target.value);
              }}
            />
            {errors?.salary && (
              <ErrorMessage message={errors?.salary?.message} />
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
              sx={{ width: "100%", mb: 1 }}
            >
              {t("Cancel")}
            </Button>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

export default Invoices;

export async function getStaticProps(context) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  };
}
