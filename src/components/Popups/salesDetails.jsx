import { useState } from "react";
import PopUpModal from "../PopupModal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";

const columns = [
  { id: "customerName", label: "Customer Name", minWidth: 250, align: "left" },
  { id: "customerEmail", label: "Customer Email Address", minWidth: 200, align: "center" },
  {
    id: "salesMode",
    label: "Sale Mode",
    minWidth: 100,
    align: "center",
  },
  {
    id: "details",
    label: "Color, Quantity, Size",
    minWidth: 170,
    align: "center",
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
    minWidth: 100,
    align: "center",
  },
  {
    id: "sellingPrice",
    label: "Payment Made",
    minWidth: 150,
    align: "center",
  },
  {
    id: "createdAt",
    label: "Date Purchased",
    minWidth: 170,
    align: "center",
  },
];

function SalesDetails({ showSalesDetails, handleClose, selected }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <PopUpModal
        openPopUp={showSalesDetails}
        handleClose={handleClose}
        borderRadius="15px"
        maxWidth="md"
        sx={{ pl: "68px", pr: "68px" }}
      >
        <Paper
          sx={{
            width: "100%",
            boxShadow: "none",
          }}
        >
          <TableContainer
            sx={{
              border: "1px solid #F5F5F5",
              borderRadius: 5,
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#F1F5F9",
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "700",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {selected
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          if(column.id === "details"){
                            let value = `${row.color} : ${row.quantity} : ${row.size}`
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          } else if (column.id === "createdAt") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleRowClick(row)}
                              >
                                {format(
                                  new Date(value),
                                  "dd-MM-yyyy HH:mm:ss"
                                )}
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={selected.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </PopUpModal>
    </div>
  );
}

export default SalesDetails;
