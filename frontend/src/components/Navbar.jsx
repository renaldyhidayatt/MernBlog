import React from 'react';
import { useSelector } from 'react-redux';
import AccountVerificationAlertWarning from './alerts/AccountVerificationAlertWarning';
import AccountVerificationSuccessAlert from './alerts/AccountVerificationSuccessAlert';
import AdminNavbar from './navigation/AdminNavbar';
import PrivateNavbar from './navigation/PrivateNavbar';
import PublicNavbar from './navigation/PublicNavbar';

const Navbar = () => {
  const state = useSelector((state) => state.users);
  const { userAuth, profile } = state;
  const isAdmin = userAuth?.isAdmin;

  const account = useSelector((state) => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;

  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {userAuth && !userAuth.isVerified && <AccountVerificationAlertWarning />}
      {loading && <h2 className="text-center">Loading please wait...</h2>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;
