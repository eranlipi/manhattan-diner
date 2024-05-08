import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';

const TaskSummary = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/tasks`);
        const activeTasks = response.data.filter(task => task.status !== 'done');
        setTasks(activeTasks);
     
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Categorize tasks by type
  const taskCounts = tasks.reduce((acc, task) => {
    acc[task.type] = (acc[task.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>active tasks</TableCell>
            <TableCell align="right">count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(taskCounts).map(([type, count]) => (
            <TableRow key={type}>
              <TableCell component="th" scope="row">
                {type}
              </TableCell>
              <TableCell align="right">{count}</TableCell>
            </TableRow>
          ))}
          {Object.keys(taskCounts).length === 0 && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Typography variant="caption" display="block" gutterBottom>
                  No tasks found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskSummary;
