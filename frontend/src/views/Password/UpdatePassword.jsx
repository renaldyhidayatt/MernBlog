import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { updatePasswordAction } from '../../redux/slices/usersSlices';
import { UpdatePasswordSchema } from '../../utils/validation/password/updatepassword';
import { Navigate } from 'react-router-dom';
import UpdatePasswordForm from '../../components/form/UpdatePasswordForm';

function UpdatePassword() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: (values) => {
      dispatch(updatePasswordAction(values?.password));
    },
    validationSchema: UpdatePasswordSchema,
  });

  const users = useSelector((state) => state?.users);
  const { isPasswordUpdated, loading, appErr, serverErr, userAuth } = users;

  //redirect
  if (isPasswordUpdated) return <Navigate to={`profile/${userAuth?._id}`} />;

  return (
    <div className="min-h-screen bg-gray-700  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Change your password
        </h2>
        <h3 className="text-center pt-2 text-red-400">
          {serverErr || appErr ? (
            <p>
              {serverErr} {appErr}
            </p>
          ) : null}
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <UpdatePasswordForm formik={formik} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
