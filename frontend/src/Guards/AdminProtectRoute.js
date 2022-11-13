import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

function AdminProtectRoute({ children }) {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  return (
    <Route
      {...res}
      element={() => {
        userAuth ? children : <Navigate to="/login" />
      }}
    />
  );
}

export default AdminProtectRoute;
