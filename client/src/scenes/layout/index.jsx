import React,{useState} from 'react';
import { Box,useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { SetMealOutlined } from '@mui/icons-material';

const Layout = () => {
  //we create a boolean to determine if it is using mobile or desktop version
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen,setIsSidebarOpen] = useState(true);
return (
  //Box is used for Material UI. Which allows us to pass in CSS properties in javascript.
  <Box display={isNonMobile ? "flex" : "block"} width= "100%" height="100%">
    
    <Sidebar
    isNonMobile={isNonMobile}
    drawerWidth="250px"
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
    />
    <Box>
      <Navbar
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet/>
    </Box>
  </Box>
)
}

export default Layout;