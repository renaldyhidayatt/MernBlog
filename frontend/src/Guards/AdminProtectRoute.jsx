import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

function AdminProtectRoute({ children }) {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  if (!userAuth?.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminProtectRoute;
