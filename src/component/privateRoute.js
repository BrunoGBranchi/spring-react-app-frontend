import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  
  useEffect(() => {
    if (isAuthenticated) {
      const { exp } = jwt_decode(token);
      const expirationTime = exp * 1000; // em milissegundos
      const isTokenExpired = Date.now() > expirationTime;
      
      if (isTokenExpired) {
        localStorage.removeItem('token');
        window.location.href = '/login'; // redireciona para a tela de login
      }
    } else {
      window.location.href = '/login'; // redireciona para a tela de login
    }
  }, [isAuthenticated, token]);
  
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
