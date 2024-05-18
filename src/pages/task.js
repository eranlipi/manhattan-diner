import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Modal,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import Dashboard from "./components/Dashboard";
import CommonHeader from "./components/commonHeaderInfo/commonHeader";

import { taskValidationSchema } from "../utils/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "./components/errorMessage";
import { notifySuccess, notifyError } from "../utils/toast";
import { Controller } from "react-hook-form";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DetailsIcon from "@mui/icons-material/Details";
import { useTranslations } from "next-intl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Task = () => {
  const t = useTranslations("header");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const [currentTask, setCurrentTask] = useState(null);
  const [viewTaskDetail, setViewTaskDetail] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    type: "",
    user_id: "",
    due_date: "",
  });

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
    resolver: yupResolver(taskValidationSchema),
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/tasks`
      );
      setTasks(response.data);
      const usersResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/users`
      );
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Failed to fetch tasks or users:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpen = (task) => {
    if (task) {
      // If task is not null, set currentTask and formData for editing
      setCurrentTask(task);
      setFormData({
        name: task.name,
        description: task.description,
        status: task.status,
        type: task.type,
        user_id: task.user_id,
        due_date: task.due_date,
      });
    } else {
      // If task is null, set currentTask to null and formData to default values for adding new task
      setCurrentTask(null);
      setFormData({
        name: "",
        description: "",
        status: "todo", // Default status or the first one
        user_id: "", // Default to no selection or the first user's id
        due_date: "", // Default to no date
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setViewTaskDetail(false);
    fetchTasks();
  };

  useEffect(() => {
    if (currentTask) {
      setValue("name", currentTask?.name);
      setValue("description", currentTask?.description);
      setValue("status", currentTask?.status);
      setValue("type", currentTask?.type);
      setValue("user_id", currentTask?.user_id);
      setValue("due_date", currentTask?.due_date?.slice(0, 10));
    }
  }, [currentTask]);

  console.log("currentTask", currentTask);

  console.log("values", getValues());
  console.log("errors", errors);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/tasks/${id}`
      );
      if (response?.status) {
        notifySuccess("Task Deleted Successfully");
      }
    } catch (error) {
      notifyError("Something Went Wrong");
    }
    setOpenDeleteModal(false);
    fetchTasks();
  };

  const handleSave = async () => {
    if (currentTask) {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/tasks/${currentTask.id}`,
        formData
      );
    } else {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/tasks`,
        formData
      );
    }
    await fetchTasks();
    setOpen(false);
  };

  const onSubmit = async (data, e) => {
    if (e.key === "Enter") {
      setFormData(formData);
    }

    const data2 = {
      name: data?.name,
      description: data?.description,
      status: data?.status,
      type: data?.type,
      user_id: data?.user_id,
      due_date: data?.due_date,
    };

    if (currentTask) {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/tasks/${currentTask.id}`,
          data2
        );
        if (response?.status) {
          notifySuccess("task Updated Successfully");
        }
      } catch (error) {
        notifyError("Something Went Wrong");
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/tasks`,
          data2
        );
        if (response?.status) {
          notifySuccess("task Added Successfully");
        }
      } catch (error) {
        notifyError("Something Went Wrong");
      }
    }

    setOpen(false);
    reset();
    fetchTasks();

    return;
  };

  const categorizeTasks = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <Box sx={{ display: "flex" }}>
      <Dashboard />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: 10,
          margin: 5,
          width: "100%",
          height: "100%",
        }}
      >
        <Box mt={5} mb={5} sx={{}}>
          <Grid
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Tasks</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              textAlign="end"
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                onClick={() => handleOpen(null)}
                size="large"
                variant="contained"
              >
                {"Add Task"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2}>
          {["todo", "doing", "done"].map((status) => (
            <Grid item xs={12} md={4} key={status}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  mb: 2,
                  backgroundColor:
                    status === "todo"
                      ? "#B4EBFF"
                      : status === "doing"
                      ? "#ECFFB5"
                      : "#B5FFD2",
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Typography>
              {categorizeTasks(status).map((task) => (
                <Card key={task.id} sx={{ marginBottom: 2, height: "130px" }}>
                  <CardContent>
                    <Box sx={{ height: "80px" }}>
                      <Typography variant="h5" component="div">
                        {task.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        {task.description}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "20px",
                        alignItems: "end",
                      }}
                    >
                      <EditIcon
                        sx={{ color: "#3f51b5", cursor: "pointer" }}
                        onClick={() => handleOpen(task)}
                      ></EditIcon>
                      <DetailsIcon
                        sx={{ color: "#3f51b5", cursor: "pointer" }}
                        onClick={() => {
                          setViewTaskDetail(true);
                          handleOpen(task);
                        }}
                      ></DetailsIcon>
                      <DeleteIcon
                        sx={{ color: "#ef3d49", cursor: "pointer" }}
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setDeleteTaskId(task.id);
                        }}
                      ></DeleteIcon>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: "50%",
            p: 1,
            height: "60%",
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {viewTaskDetail
                ? "Details of Task"
                : currentTask
                ? "Edit Task"
                : "Add Task"}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  {...register("name")}
                  fullWidth
                  label="Name"
                  name="name"
                  id="name"
                  // value={formData.name}
                  // onChange={handleInputChange}
                  margin="normal"
                  onChangeCapture={(e) => {
                    setValue("name", e.target.value);
                  }}
                  disabled={viewTaskDetail}
                />
                {errors?.name && (
                  <ErrorMessage message={errors?.name?.message} />
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("description")}
                  fullWidth
                  label="Description"
                  name="description"
                  // value={formData.description}
                  // onChange={handleInputChange}
                  margin="normal"
                  onChangeCapture={(e) => {
                    setValue("description", e.target.value);
                  }}
                  disabled={viewTaskDetail}
                />
                {errors?.description && (
                  <ErrorMessage message={errors?.description?.message} />
                )}
              </Grid>
              {/* second line  */}
              <Grid item xs={6}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel
                        sx={{
                          textAlign: "start",
                        }}
                        htmlFor="role-label"
                      >
                        Status
                      </InputLabel>

                      <Select
                        {...field}
                        labelId="role-label"
                        label="Status"
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
                            sx={{ textAlign: "start" }}
                          />
                        }
                        // MenuProps={MenuProps}
                        fullWidth
                        sx={{ mb: 1, textAlign: "start" }}
                        textAlign={"start"}
                        disabled={viewTaskDetail}
                      >
                        {["todo", "doing", "done"].map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
                {errors?.status && (
                  <ErrorMessage message={errors?.status?.message} />
                )}

                {/* <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    {["todo", "doing", "done"].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel
                        sx={{
                          textAlign: "start",
                        }}
                        htmlFor="role-label"
                      >
                        Type
                      </InputLabel>

                      <Select
                        {...field}
                        labelId="role-label"
                        label="Type"
                        value={getValues().type}
                        onChange={(e) => {
                          // handleChangeCategories(e);
                          field.onChange(e);
                          setValue("type", e.target.value);
                        }}
                        onLoad={(e) => {}}
                        input={
                          <OutlinedInput
                            label="Type"
                            sx={{ textAlign: "start" }}
                          />
                        }
                        // MenuProps={MenuProps}
                        fullWidth
                        sx={{ mb: 1, textAlign: "start" }}
                        textAlign={"start"}
                        disabled={viewTaskDetail}
                      >
                        {["overall", "payment", "product"].map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
                {errors?.type && (
                  <ErrorMessage message={errors?.type?.message} />
                )}
                {/* <FormControl fullWidth margin="normal">
                  <InputLabel>type</InputLabel>
                  <Select
                    label="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    {["overall", "payment", "product"].map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </Grid>
              {/* third line  */}
              <Grid item xs={6}>
                <Controller
                  name="user_id"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel
                        sx={{
                          textAlign: "start",
                        }}
                        htmlFor="role-label"
                      >
                        User
                      </InputLabel>

                      <Select
                        {...field}
                        labelId="role-label"
                        label="User"
                        value={getValues().user_id}
                        onChange={(e) => {
                          // handleChangeCategories(e);
                          field.onChange(e);
                          setValue("user_id", e.target.value);
                        }}
                        onLoad={(e) => {}}
                        input={
                          <OutlinedInput
                            label="User"
                            sx={{ textAlign: "start" }}
                          />
                        }
                        // MenuProps={MenuProps}
                        fullWidth
                        sx={{ mb: 1, textAlign: "start" }}
                        textAlign={"start"}
                        disabled={viewTaskDetail}
                      >
                        {users.map((item) => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {item?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
                {errors?.user_id && (
                  <ErrorMessage message={errors?.user_id?.message} />
                )}
                {/* <FormControl fullWidth margin="normal">
                  <InputLabel>User</InputLabel>
                  <Select
                    label="User"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </Grid>{" "}
              <Grid item xs={6}>
                <TextField
                  {...register("due_date")}
                  fullWidth
                  type="date"
                  name="due_date"
                  // value={getValues().due_date}
                  // label="Due data"
                  // value={formData.due_date}
                  // onChange={handleInputChange}
                  margin="normal"
                  onChangeCapture={(e) => {
                    setValue("due_date", e.target.value);
                  }}
                  sx={{ marginTop: "22px" }}
                  disabled={viewTaskDetail}
                />
                {errors?.due_date && (
                  <ErrorMessage message={errors?.due_date?.message} />
                )}
              </Grid>
              {console.log("values", getValues())}
              {console.log("errors", errors)}
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button
                // onClick={handleSave}
                variant="contained"
                sx={{ width: "100%", mb: 1 }}
                color="primary"
                type="submit"
              >
                Save
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{ width: "100%", mb: 1 }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <React.Fragment>
        <Dialog
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are You Sure you want to delete?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => setOpenDeleteModal(false)}>
              {t("Cancel")}
            </Button>
            <Button
              autoFocus
              variant="contained"
              onClick={() => handleDelete(deleteTaskId)}
            >
              {"Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Box>
  );
};

export default Task;

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
