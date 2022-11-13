import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateUserAction,
  fetchUserDetailsAction,
} from '../../redux/slices/usersSlices';
import { UpdateProfileformSchema } from '../../utils/validation/profile/updateprofile';
import { Navigate } from 'react-router-dom';
import UpdateProfileForm from '../../components/form/UpdateProfileForm';

function UpdateProfilePage({
  computedMatch: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetailsAction(id));
  }, [dispatch, id]);

  const users = useSelector((state) => state.users);
  const { userDetails, isUpdated, loading, appErr, serverErr } = users;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      bio: userDetails?.bio,
    },
    onSubmit: (values) => {
      dispatch(updateUserAction(values));
    },
    validationSchema: UpdateProfileformSchema,
  });
  if (isUpdated) {
    return <Navigate to={`/profile/${id}`} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="mt-6 text-center text-2xl font-extrabold text-gray-300">
          Hei buddy{' '}
          <span className="text-green-300">
            {userDetails?.firstName} {userDetails?.lastName}
          </span>{' '}
          Do want to update your profile?
        </h3>

        {serverErr || appErr ? (
          <h2 className="text-red-300 text-center">
            {serverErr} {appErr}
          </h2>
        ) : null}
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <UpdateProfileForm formik={formik} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
