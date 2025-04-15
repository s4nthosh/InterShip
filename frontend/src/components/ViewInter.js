import React, { useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { toast, Toaster } from "react-hot-toast";
import axios from 'axios';
import { base_url } from '../Constant/ApiUrl';
import EditData from './EditData';
import Grid from '@mui/material/Grid';


export default function ViewInter({ filteredUser, refetch }) {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState([]);
  const [printData, setPrintData] = useState(null);
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // For delete confirmation dialog
  const [deleteUserId, setDeleteUserId] = useState(null); // Store the user ID to delete
  const printref = useRef(null);

  const showdata = filteredUser;

  const handleEdit = async (userId) => {
    setOpen(true);
    try {
      const userToEdit = showdata?.find((user) => user.Id === userId);
      setEditData(userToEdit);
    } catch (error) {
      console.error(`Error in editing data: ${error}`);
    }
  };

  const handlePrint = (Id) => {
    const Data = showdata.find((user) => user.Id === Id);
    if (Data) {
      setPrintData(Data);
      setOpenPrintDialog(true);
    }
  };

  const deleteData = async (userId) => {
    try {
      const res = await axios.delete(`${base_url}/IntershipDetails.php`, {
        data: { Id: userId },
        headers: { "Content-Type": "application/json" }
      });
      if (res.data.success) {
        toast.success(res.data.message || 'Deleted successfully!');
        refetch();
      } else {
        toast.error(res.data.message || 'Failed to delete data.');
      }
    } catch (error) {
      console.error(`Error in deleting data: ${error}`);
      toast.error('Error in deleting data. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (deleteUserId) {
      await deleteData(deleteUserId);
      setOpenDeleteDialog(false); // Close the delete confirmation dialog
      setDeleteUserId(null); // Reset the user ID
    }
  };

  const handleOpenDeleteDialog = (userId) => {
    setDeleteUserId(userId); // Set the user ID to delete
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); // Close the delete confirmation dialog
    setDeleteUserId(null); // Reset the user ID
  };

  const triggerPrint = () => {
    if (printref.current) {
      const printWindow = window.open();
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(printref.current.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const columns = [
    { width: 100, label: 'UserName', dataKey: 'Name' },
    { width: 100, label: 'Email', dataKey: 'Email' },
    { width: 50, label: 'City', dataKey: 'City' },
    { width: 110, label: 'State', dataKey: 'State' },
    { width: 130, label: 'Phone Number', dataKey: 'Phone' },
    { width: 100, label: 'Edit', dataKey: 'edit' },
    { width: 100, label: 'Delete', dataKey: 'delete' },
    { width: 100, label: 'Print', dataKey: 'print' }
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{ backgroundColor: 'background.paper' }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {column.dataKey === 'edit' ? (
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "blue" }}
                onClick={() => handleEdit(row.Id)}
              >
                Edit
              </Button>
            ) : (
              row[column.dataKey]
            )}
            {column.dataKey === 'delete' && (
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "blue" }}
                onClick={() => handleOpenDeleteDialog(row.Id)}
              >
                Delete
              </Button>
            )}
            {column.dataKey === 'print' && (
              <Button
                variant="outlined"
                size="small"
                color="neutral"
                sx={{ backgroundColor: "blue", color: 'white' }}
                onClick={() => handlePrint(row?.Id)}
                startIcon={<PrintIcon fontSize="inherit" />}
              >
                Print
              </Button>
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Toaster position="top-center" reverseOrder={false} />

      <Paper style={{ height: '100%', width: '100%', borderRadius: '15px' }}>
        {showdata?.length > 0 ? (
          <TableVirtuoso
            data={showdata}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        ) : (
          <p>No Data Found</p>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this data?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} sx={{ backgroundColor: "red", color: "white" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Inter Details</DialogTitle>
        <DialogContent>
          <Box>
            <EditData editData={editData} refetch={refetch} setOpen={setOpen} />
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} fullWidth>
  <DialogTitle>Inter Details</DialogTitle>
  <DialogContent>
    {printData && (
      <Box ref={printref} sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <strong>Name:</strong> {printData.Name}
          </Grid>
          <Grid item xs={6}>
            <strong>Email:</strong> {printData.Email}
          </Grid>
          <Grid item xs={6}>
            <strong>Address:</strong> {printData.Address}
          </Grid>
          <Grid item xs={6}>
            <strong>City:</strong> {printData.City}
          </Grid>
          <Grid item xs={6}>
            <strong>State:</strong> {printData.State}
          </Grid>
          <Grid item xs={6}>
            <strong>Pincode:</strong> {printData.PinCode}
          </Grid>
          <Grid item xs={6}>
            <strong>Country:</strong> {printData.Country}
          </Grid>
          <Grid item xs={6}>
            <strong>Phone:</strong> {printData.Phone}
          </Grid>
          <Grid item xs={6}>
            <strong>College:</strong> {printData.College}
          </Grid>
          <Grid item xs={6}>
            <strong>Pursing Degree:</strong> {printData.PursingDegree}
          </Grid>
          <Grid item xs={6}>
            <strong>Project Topic:</strong> {printData.ProjectTopic}
          </Grid>
          <Grid item xs={6}>
            <strong>Application Date:</strong> {printData.ApplicationDate}
          </Grid>
          <Grid item xs={6}>
            <strong>Begin Date:</strong> {printData.BeginDate}
          </Grid>
          <Grid item xs={6}>
            <strong>End Date:</strong> {printData.EndDate}
          </Grid>
          <Grid item xs={6}>
            <strong>Resume and Bonafide Updated:</strong> {printData.ResumeBonafide}
          </Grid>
          <Grid item xs={6}>
            <strong>Relevant Experience:</strong> {printData.PrjReleventExp}
          </Grid>
          <Grid item xs={6}>
            <strong>Total Amount:</strong> {printData.TotalAmount}
          </Grid>
          <Grid item xs={6}>
            <strong>Progression:</strong> {printData.StudentPursing}
          </Grid>
          <Grid item xs={6}>
            <strong>Mode of Payment:</strong> {printData.ModeofPayment}
          </Grid>
          <Grid item xs={6}>
            <strong>Method of Payment:</strong> {printData.MethodOfPayment}
          </Grid>
          <Grid item xs={6}>
            <strong>Online Amount:</strong> {printData.OnlineAmount}
          </Grid>
          <Grid item xs={6}>
            <strong>Amount:</strong> {printData.Amount}
          </Grid>
          <Grid item xs={6}>
            <strong>Remaining Amount:</strong> {printData.RemainingAmount}
          </Grid>
        </Grid>
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenPrintDialog(false)} color="secondary">
      Close
    </Button>
    <Button onClick={triggerPrint} sx={{ backgroundColor: "blue" }} variant="contained">
      Print
    </Button>
  </DialogActions>
</Dialog>
    </div>
  );
}