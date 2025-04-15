import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { base_url } from '../Constant/ApiUrl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as XLSX from 'xlsx'; // Import xlsx library

export default function ReportInter() {
  const { data: showdata, isLoading, isError } = useQuery({
    queryKey: ["alldata"],
    queryFn: async () => {
      const res = await axios.get(`${base_url}/IntershipDetails.php`);
      return res.data;
    }
  });

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleOpenDialog = (row) => {
    setSelectedUser(row); // Set the selected user's data
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setSelectedUser(null); // Reset the selected user
  };

  const handleDownloadExcel = () => {
    if (!selectedUser) return;

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheetData = Object.entries(selectedUser).map(([key, value]) => ({
      Field: key,
      Value: value,
    }));

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Details");

    // Trigger the download
    XLSX.writeFile(workbook, `${selectedUser.Name}_Details.xlsx`);
  };

  const columns = [
    {
      width: 100,
      label: 'UserName',
      dataKey: 'Name',
    },
    {
      width: 100,
      label: 'Email',
      dataKey: 'Email',
    },
    {
      width: 50,
      label: 'City',
      dataKey: 'City',
    },
    {
      width: 110,
      label: 'State',
      dataKey: 'State',
    },
    {
      width: 130,
      label: 'Phone Number',
      dataKey: 'Phone',
    },
    {
      width: 100,
      label: "Get Report",
      dataKey: 'Report'
    }
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
            {column.dataKey === 'Report' ? (
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "blue" }}
                onClick={() => handleOpenDialog(row)}
              >
                REPORT
              </Button>
            ) : (
              row[column.dataKey]
            )}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Paper style={{ height: '100%', width: '100%', borderRadius: '15px' }}>
      <TableVirtuoso
        data={showdata}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />

      {/* Dialog for showing user details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                {Object.entries(selectedUser).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <strong>{key}:</strong> {value}
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
          <Button onClick={handleDownloadExcel} sx={{ backgroundColor: "blue" }} variant="contained">
            Download Excel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}