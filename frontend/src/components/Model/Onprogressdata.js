import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import {useQuery} from "@tanstack/react-query"
import axios from 'axios';
import { base_url } from '../../Constant/ApiUrl';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';



export default function Onprogressdata({filteredUser}) {


  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit=(row)=>{
    console.log(row)
    setOpen(true)
  }


  const onGoing = filteredUser?.filter((users)=>users.StudentPursing==="OnProgress") ||[]


  
const columns = [
  {
    width: 100,
    label: 'UserName',
    dataKey: 'Name',
  },
   {
    width:100,
    label:"PursingDetails",
    dataKey:'StudentPursing'
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
              onClick={() => handleEdit(row)}
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
              onClick={() => handleEdit(row)}
            >
              Delete
            </Button>
            
          )}
          {column.dataKey === 'print' && (
            <Button
              variant="contained"
              size="small"
              sx={{backgroundColor:"blue"}}
              onClick={() => handleEdit(row)}
            >
              print
            </Button>
            
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}





  



  return (
      <Paper style={{ height:'100%', width: '100%' ,borderRadius:'15px'}}>
        {onGoing.length > 0 ?
        <TableVirtuoso
          data={onGoing || ''}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
        :<p>No Data Found</p>}
      </Paper>
      
  
  );
}
