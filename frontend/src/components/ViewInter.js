import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import {useQuery  } from "@tanstack/react-query"
import axios from 'axios';
import { base_url } from '../Constant/ApiUrl';
import Button from '@mui/material/Button';
import { useState ,useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import EditData from './EditData';
import DialogActions from '@mui/material/DialogActions';










export default function ViewInter({filteredUser,refetch}) {


  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState([]); 
  const [printData, setPrintData] = useState(null);
  const [openPrintDialog, setOpenPrintDialog] = useState(false)
  const printref = useRef(null)

  
  const showdata = filteredUser

  const handleEdit=async(userId)=>{
    setOpen(true)
    try{
      const userToEdit = showdata?.find((user)=>user.Id === userId);
      setEditData(userToEdit)
      }
    catch(error){
  
    }
  }



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
      headers:{"Content-Type":"application.json"}
    });
    refetch()
    console.log(res.data);
  } catch (error) {
    console.log(`Error in deleting data: ${error}`);
  }
};

  const handleDelete = async(userId)=>{
  try{
    await deleteData(userId)
    showdata?.filter((data)=>data.Id !==userId)
    refetch()
  }
  catch(error){
    console.log(`Error in deleting data ${error}`)
  }
}

  const handleClosePrintDialog = () => {
    setOpenPrintDialog(false); 
        setPrintData(null);
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
    width:100,
    label:"Edit",
    dataKey:'edit'
  },
  {
    width:100,
    label:"Delete",
    dataKey:'delete'
  },
  {
    width:100,
    label:"Print",
    dataKey:'print'
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
          {column.dataKey === 'edit' ? (
            <Button
              variant="contained"
              size="small"
              sx={{backgroundColor:"blue"}}
              onClick={()=>handleEdit(row.Id)}
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
              sx={{backgroundColor:"blue"}}
              onClick={() => handleDelete(row.Id)}
            >
              Delete
            </Button>
            
          )}
          {column.dataKey === 'print' && (
            <Button
            variant="outlined"
            size="small"
            color="neutral"
            sx={{backgroundColor:"blue", color:'white'}}
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
      
      
      <Paper style={{ height:'100%', width: '100%' ,borderRadius:'15px'}}>
        {showdata?.length >0 ?
        <TableVirtuoso
          data={showdata}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        
        />:<p>No Data Found</p>
        }
      </Paper>


      
      <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Inter Details</DialogTitle>
        <DialogContent>
          <Box>
            <EditData editData={editData} refetch={refetch} setOpen={setOpen}/>
          </Box>

        </DialogContent>
      </Dialog>




      <Dialog open={openPrintDialog} onClose={handleClosePrintDialog} fullWidth>
        <DialogTitle>Inter Details</DialogTitle>
        <DialogContent>
          {printData && (
            <Box ref={printref}>
              <p>
                <strong>Name:</strong> {printData.Name}
              </p>
              <p>
                <strong>Email:</strong> {printData.Email}
              </p>
              <p>
                <strong>City:</strong> {printData.City}
              </p>
              <p>
                <strong>State:</strong> {printData.State}
              </p>
              <p>
                <strong>Phone:</strong> {printData.Phone}
              </p>
              <p>
                <strong>Progression:</strong>{printData.StudentPursing}
              </p>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrintDialog} color="secondary">
            Close
          </Button>
          <Button onClick={triggerPrint} sx={{backgroundColor:"blue"}} variant="contained">
            Print
          </Button>
        </DialogActions>
      </Dialog>
      

      </div>
  
  );
}
