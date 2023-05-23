import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import { useSelector } from "react-redux";
import { useMemo } from 'react';
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom';
import Layout from "scenes/layout";
import Dashboard from 'scenes/dashboard';


function App() {
  //1.to access the state management global variable across all pages
  const mode = useSelector ((state) => state.global.mode);

  //2.to access theme js and decide what theme to be used based on themes stated (either to use light or dark mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode]);

  return ( 
  <div className="App">
    <BrowserRouter>
    {/* 3. decide to use light or dark mode */}
      <ThemeProvider theme ={theme}>
            <CssBaseline />
            <Routes>
              <Route element={<Layout/>}>
                <Route path="/" element={<Navigate to ="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
        </ThemeProvider>
    </BrowserRouter>
    
  </div>);

}

export default App;
