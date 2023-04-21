import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  
   if (isAuthenticated) {
    const { exp } = jwt_decode(token);
    const expirationTime = exp * 1000; // em milissegundos
    const isTokenExpired = Date.now() > expirationTime;
    
    if (isTokenExpired) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
