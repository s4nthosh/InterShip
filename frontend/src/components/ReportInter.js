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
import { base_url } from '../Constant/ApiUrl';
import Button from '@mui/material/Button';



const handleEdit=()=>{
  console.log("edit")
}


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
    label:"Get Report",
    dataKey:'Report'
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
              sx={{backgroundColor:"blue"}}
              onClick={() => handleEdit(row)}
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

export default function ReportInter() {

  const {data:showdata ,isLoading,isError}=useQuery({
  queryKey:["alldata"],
  queryFn:async()=>{
    const res = await axios.get(`${base_url}/IntershipDetails.php`)
    return res.data
  }
})



  return (
      <Paper style={{ height:'100%', width: '100%' ,borderRadius:'15px'}}>
        <TableVirtuoso
          data={showdata}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        
        />
      </Paper>
  );
}
