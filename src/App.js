import React, { useEffect, useState } from 'react';
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
import NovoUsuario from './pages/usuarios/novo';
import FloatingAlert from './component/floatingAlert';
const App = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [errorCode, setErrorCode] = useState('');
  useEffect(() => {
    const savedMessage = localStorage.getItem('message');
    if (savedMessage) {
      setMessage(savedMessage);
      setOpen(true);
      localStorage.removeItem('message'); // remova a mensagem após ser exibida
    }
  },[]);

  function addMessage(mensagem, errorCode) {
    setMessage(mensagem);
    setErrorCode(errorCode);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
};
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
                <Route path="/usuarios" element={<UsersListPage  />} />
                <Route path="/usuarios/novo" element={<NovoUsuario addMessage={addMessage}/>} />
              </Route>
            </Route>
            <Route path='/login' element={<Login addMessage={addMessage}/>} />
          </Routes>
        </Router>
        <FloatingAlert open={open} message={message} onClose={handleClose} errorCode={errorCode} />
      </ThemeProvider>
    </Container>
  );
};

export default App;
