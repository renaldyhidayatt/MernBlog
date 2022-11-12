import { useFormik } from 'formik';
import React from 'react';

import { useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';
import UpdateProfilePhotoForm from '../../components/form/UpdateProfilePhotoForm';
import { uploadProfilePhotoAction } from '../../redux/slices/usersSlices';
import { UpdatePhotoProfileformSchema } from '../../utils/validation/profile/updatephotoprofile';

export default function UploadProfilePhotoPage() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      image: '',
    },
    onSubmit: (values) => {
      dispatch(uploadProfilePhotoAction(values));
    },
    validationSchema: UpdatePhotoProfileformSchema,
  });

  const users = useSelector((state) => state?.users);
  const { profilePhoto, loading, appErr, serverErr, userAuth } = users;

  if (profilePhoto) {
    <redirect to={`/profile/${userAuth?._id}`} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Upload profile photo
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <UpdateProfilePhotoForm
            appErr={appErr}
            serverErr={serverErr}
            loading={loading}
            formik={formik}
          />
        </div>
      </div>
    </div>
  );
}
