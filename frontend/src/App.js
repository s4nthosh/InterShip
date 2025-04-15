import React from 'react'
import {Routes, Route} from "react-router-dom"
import Homepage from "./pages/Homepage"
import LoginPage from "./pages/Loginpage"
import Box from '@mui/material/Box';

const App = () => {




  return (
    <Box sx={{backgroundColor:'#F4F7FE'}}>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/*' element={<Homepage/>}/>
      </Routes>
      </Box>
  )
}

export default App