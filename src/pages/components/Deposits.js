import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [activeEmployeesCount, setActiveEmployeesCount] = useState(0);

  useEffect(() => {
    fetch('https://api.circlescrm.net/api/employees')
      .then(response => response.json())
      .then(data => {
        // Filter the data to count only active employees
        const activeCount = data.filter(employee => employee.status === 'active').length;
        setActiveEmployeesCount(activeCount);
      })
      .catch(error => console.error('Failed to fetch data:', error));
  }, []);

  return (
    <React.Fragment>
      <Title>Employees</Title>
      <Typography component="p" variant="h4">
        {activeEmployeesCount}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        active
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View employees
        </Link>
      </div>
    </React.Fragment>
  );
}
