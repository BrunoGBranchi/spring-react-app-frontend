import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PrivateRoute from './component/privateRoute';
import Home from './pages/home';
import Login from './pages/login';
import { Container } from '@mui/material';
import MeuAppBar from './component/appBar';
import UsersListPage from './pages/usuarios/UsersListPage';
import { Outlet } from 'react-router-dom';
const App = () => {

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MeuAppBar></MeuAppBar>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Outlet />}>
                <Route path="/" element={<Home />} />
                <Route path="/usuarios" element={<UsersListPage />} />
              </Route>
            </Route>
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Container>
  );
};

export default App;
