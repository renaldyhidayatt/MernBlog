import { PasswordResetTokenFormSchema } from '../../utils/validation/password/passwordResetToken';
import { passwordResetTokenAction } from '../../redux/slices/usersSlices';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

function PasswordResetToken() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      dispatch(passwordResetTokenAction(values?.email));
    },
    validationSchema: PasswordResetTokenFormSchema,
  });
  const users = useSelector((state) => state?.users);
  const { passwordToken, loading, appErr, serverErr } = users;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Password Reset Form
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <div className="font-medium text-indigo-600 hover:text-indigo-500">
              Reset your password if you have forgotten
            </div>
          </p>
        </div>
        {/* Err msg */}
        <div className="text-red-500 text-center">
          {appErr || serverErr ? (
            <h3>
              {serverErr} {appErr}
            </h3>
          ) : null}
        </div>

        {/* Sucess msg */}
        <div className="text-green-700 text-center">
          {passwordToken && (
            <h3>
              Email is successfully sent to your email. Verify it within 10
              minutes.
            </h3>
          )}
        </div>
        <PasswordResetToken formik={formik} loading={loading} />
      </div>
    </div>
  );
}

export default PasswordResetToken;
