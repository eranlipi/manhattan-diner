import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent, Typography, Grid, Button, Modal, TextField, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import Dashboard from './components/Dashboard';
import CommonHeader from './components/commonHeaderInfo/commonHeader';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
    type:'',
    user_id: '',
    due_date: ''
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/tasks`);
      setTasks(response.data);
      const usersResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/users`);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Failed to fetch tasks or users:', error);
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
        due_date: task.due_date
      });
    } else {
      // If task is null, set currentTask to null and formData to default values for adding new task
      setCurrentTask(null);
      setFormData({
        name: '',
        description: '',
        status: 'todo', // Default status or the first one
        user_id: '', // Default to no selection or the first user's id
        due_date: '' // Default to no date
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    if (currentTask) {
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}api/tasks/${currentTask.id}`, formData);
    } else {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/tasks`, formData);
    }
    await fetchTasks();
    setOpen(false);
  };

  const categorizeTasks = (status) => tasks.filter(task => task.status === status);

  return (
    <Box sx={{ display: 'flex' }}>
      <Dashboard />
      <Box sx={{ flexGrow: 1, p: 3, marginTop: 10, margin: 5, width: '100%', height: '100%' }}>
      <Box mt={5} mb={5} sx={{}}>
 
        <Grid container sx={{justifyContent:"center" , alignItems:"center" }}>
        <Grid item xs={12} sm={6} >
          <Typography variant="h5">Tasks</Typography>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="end" sx={{
          display:"flex",
          justifyContent:"space-around"
        }}>
          <Button onClick={() => handleOpen(null)} size="large" variant="contained" >{"Add Task"}</Button>

        </Grid>
      </Grid>
        </Box>
        <Grid container spacing={2}>
          {['todo', 'doing', 'done'].map((status) => (
            <Grid item xs={12} md={4} key={status}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2 }}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Typography>
              {categorizeTasks(status).map((task) => (
                <Card key={task.id} sx={{ marginBottom: 2 }} onClick={() => handleOpen(task)}>
                  <CardContent>
                    <Typography variant="h5" component="div">{task.name}</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">{task.description}</Typography>
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
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {currentTask ? 'Edit Task' : 'Add Task'}
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              {['todo', 'doing', 'done'].map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
            <InputLabel>type</InputLabel>
            <Select
              label="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              {['overall', 'payment', 'product'].map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>User</InputLabel>
            <Select
              label="User"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleInputChange}
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Button onClick={handleSave} 
            variant="contained"
             sx={{ width: "100%", mb: 1 }}
            color="primary">
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
        </Box>
      </Modal>
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
      messages: (await import(`../../messages/${context.locale}.json`)).default
    }
  };
}
