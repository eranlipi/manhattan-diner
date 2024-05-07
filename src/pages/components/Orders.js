import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Utility to prevent default action
function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('https://api.circlescrm.net/api/invoices')
      .then(response => response.json())
      .then(data => {
        // Assuming the data structure matches what is needed
        // Otherwise, map or transform the data as needed
        setRows(data.map(item => ({
          id: item.id,
          description: item.description,  // Assuming 'name' is analogous to 'description'
          status: item.status,
          month: item.month,
          year: item.year,
          amount: item.amount
        })));
      })
      .catch(error => console.error('Failed to fetch data:', error));
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Invoices</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Year</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.month}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Invoices
      </Link>
    </React.Fragment>
  );
}
