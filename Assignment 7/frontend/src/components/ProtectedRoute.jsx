import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
  const userInfoStr = localStorage.getItem('userInfo');
  let user = null;
  
  if (userInfoStr) {
    try {
      user = JSON.parse(userInfoStr);
    } catch {}
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
