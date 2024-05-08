import React, { useState, useEffect } from 'react';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslations } from 'next-intl';

// Styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
  fontWeight: (props) => (props.isHeader ? 'bold' : 'normal'), // Bold for headers
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
  },
}));

const CommonTable = ({ headings }) => {
  const [tableData, setTableData] = useState([]);
  const t = useTranslations('CommonTable');

  useEffect(() => {
    fetch('https://api.circlescrm.net/api/employees')
      .then(response => response.json())
      .then(data => {
        const mappedData = data.map(emp => ({
          name: emp.name,
          phone: emp.phone,
          status: emp.status,
          role: emp.role,
          salary: emp.salary
        }));
        setTableData(mappedData);
      })
      .catch(error => console.error('Failed to fetch data:', error));
  }, []);

  const headingsToIterate = headings || ['Name', 'Phone', 'Status', 'Role', 'Salary'];

  return (
    <TableContainer component={Box} mt={5}>
      <Table>
        <TableHead>
          <TableRow>
            {headingsToIterate.map((header) => (
              <StyledTableCell
                key={header}
                isHeader={true}
                sx={{ fontWeight: 'bold' }}
              >
                {t(header)}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              {headingsToIterate.map((header) => (
                <StyledTableCell key={header}>
                  {row[header.toLowerCase()]}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
