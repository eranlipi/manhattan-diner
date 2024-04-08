import React, { useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

//styles

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
  fontWeight: (props) => (props.isHeader ? "bold" : "normal"), // Bold for headers

  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
  },
}));

const CommonTable = ({ headings, tableData }) => {
  // dummy data
  const rows = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      name: "Courtney Henry",
      title: "Designer",
      email: "courtney.henry@example.com",
      role: "Admin",
    },
    {
      name: "Tom Cook",
      title: "Director of Product",
      email: "tom.cook@example.com",
      role: "Member",
    },
    {
      name: "Whitney Francis",
      title: "Copywriter",
      email: "whitney.francis@example.com",
      role: "Admin",
    },
    {
      name: "Leonard Krasner",
      title: "Senior Designer",
      email: "leonard.krasner@example.com",
      role: "Owner",
    },
  ];
  const tableDataToIterate = tableData ? tableData : rows;

  const headingsToIterate = headings
    ? headings
    : ["Name", "Title", "Email", "Role", "Edit"];

  return (
    <TableContainer component={Box} mt={5} >
      <Table>
        <TableHead>
          <TableRow>
            {headingsToIterate.map((header) => (
              <StyledTableCell
                key={header}
                isHeader={true}
                sx={{ fontWeight: "bold" }}
              >
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody >
          {tableDataToIterate.map((row, index) => (
            <TableRow key={row.name}>
              {Object.keys(row).map((key) => (
                <StyledTableCell
                  key={key}
                  sx={{ fontWeight: key === "name" || key === "id" ? "bold" : "" }}
                >
                  {row[key]}
                </StyledTableCell>
              ))}
              {!tableData && (
                <TableCell align="inherit">
                  <IconButton>
                    <EditIcon sx={{ color: "#3f51b5" }} />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
