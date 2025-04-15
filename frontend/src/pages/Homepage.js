import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Routes, Route } from "react-router-dom"
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Nav from '../components/nav'
import Dashboard from '../components/Dashboard';
import InterShipForm from '../components/IntershipForm'
import { Link } from 'react-router-dom'
import ViewInter from '../components/ViewInter'
import ReportInter from '../components/ReportInter'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import FormsIcon from '@mui/icons-material/Description'; 
import TableChartIcon from '@mui/icons-material/TableChart';
import { base_url } from '../Constant/ApiUrl';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



const drawerWidth = 240;

export default function Homepage() {
  const iconMap = {
    Dashboard: <DashboardIcon />,
    View: <VisibilityIcon />,
    ReportInter: <BarChartIcon />,
    Logout: <LogoutIcon />,
    Forms: <FormsIcon />,
    Tables: <TableChartIcon />
  };


  const [selectedPage, setSelectedPage] = useState('Dashboard');
  const[search,setSearch]=useState('')
  

  const [openView, setOpenView] = useState(false);

  const handleViewClick = () => {
    setOpenView(!openView);
    setSelectedPage("View");
  };
  const {data:showdata ,isLoading,isError,refetch}=useQuery({
    queryKey:["alldata"],
    queryFn:async()=>{
      const res = await axios.get(`${base_url}/IntershipDetails.php`)
      return res.data
      
        }
  })

  if(isLoading){
    <p>isLoading</p>
  }
  if(isError){
    <p>Error</p>
  }

  const filteredUser = showdata?.filter((user) =>
    user.Name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => a.Name.localeCompare(b.Name))

  return (
    <Box sx={{ display: 'flex', height: '100', backgroundColor: '#F4F7FE' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, backgroundColor: "#F4F7FE", color: 'black', ml: `${drawerWidth}px` }}
      >

        <Toolbar>
          <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', }}>
            <Box sx={{ width: '100%' }}>{selectedPage}</Box>
            <Nav search={search} setSearch={setSearch} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            display: 'flex',
            justifyContent: 'start',
          },
          '& .MuiDivider-root': {
            display: 'none'
          },
          '& .MuiButtonBase-root': {
            paddingY: '10px'
          },
          '& .MuiToolbar-root': {
            display: 'none'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography sx={{ display: 'flex', width: '100', justifyContent: 'center', height: '70px', alignItems: 'center', fontSize: '2rem', fontWeight: 'bold' }} component='h1'>
          Logo
        </Typography>
      

        <Divider />
        <List sx={{ border: 'none', py: '20px' }}>
  {['Dashboard', 'View', 'ReportInter', 'Logout'].map((text) => (
    <React.Fragment key={text}>
      <ListItem disablePadding>
      <ListItemButton
          component={text === 'View' ? 'button' : text === 'Logout' ? 'button' : Link}
          to={text === 'View' || text === 'Logout' ? undefined : `/${text.toLowerCase()}`}
          onClick={
            text === 'View'
              ? handleViewClick
              : text === 'Logout'
              ? () => {
                  setSelectedPage(''); // Clear selectedPage
                  // Optionally redirect to login or perform logout logic
                }
              : () => setSelectedPage(text)
          }
          sx={{
            borderRight: selectedPage === text ? '4px solid blue' : '4px solid transparent',
            '&:hover': {
              borderRight: '4px solid blue',
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: selectedPage === text ? 'blue' : 'inherit',
            }}
          >
            {iconMap[text]}
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              fontSize: '1.2rem',
              fontWeight: 'medium',
              py: '1px',
              color: selectedPage === text ? 'blue' : 'inherit',
            }}
          />
          {text === 'View' && (openView ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>

      {/* Submenu for "View" */}
      {text === 'View' && (
        <Collapse in={openView} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/forms"
                onClick={() => setSelectedPage("InterShip-Form")}
                sx={{
                  borderRight: selectedPage === 'InterShip-Form' ? '4px solid blue' : '4px solid transparent',
                  '&:hover': {
                    borderRight: '4px solid blue',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedPage === 'InterShip-Form' ? 'blue' : 'inherit',
                  }}
                >
                  <FormsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="InterShip-Form"
                  primaryTypographyProps={{
                    color: selectedPage === 'InterShip-Form' ? 'blue' : 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/tables"
                onClick={() => setSelectedPage("Details")}
                sx={{
                  borderRight: selectedPage === 'Details' ? '4px solid blue' : '4px solid transparent',
                  '&:hover': {
                    borderRight: '4px solid blue',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedPage === 'Details' ? 'blue' : 'inherit',
                  }}
                >
                  <TableChartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Details"
                  primaryTypographyProps={{
                    color: selectedPage === 'Details' ? 'blue' : 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      )}
    </React.Fragment>
  ))}
</List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#F4F7FE', p: 3, height: '100vh',}}
      >
        <Toolbar />

        <Routes>
          <Route path='/dashboard' element={<Dashboard filteredUser={filteredUser} refetch={refetch} />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/forms' element={<InterShipForm/>}/>
          <Route path='/tables' element={<ViewInter filteredUser={filteredUser} refetch={refetch}/>}/>
          <Route path='/reportinter' element={<ReportInter />} />

        </Routes>


      </Box>
    </Box>
  );
}
