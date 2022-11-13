import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PasswordResetForm from '../../components/form/PasswordResetForm';
import { PasswordResetFormSchema } from '../../utils/validation/password/passwordreset';
import { useNavigate } from 'react-router-dom';

function PasswordReset(props) {
  const token = props.match.params.token;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: (values) => {
      const data = {
        password: values?.password,
        token,
      };
      dispatch(passwordResetAction(data));
    },
    validationSchema: PasswordResetFormSchema,
  });

  const users = useSelector((state) => state?.users);
  const { passwordReset, loading, appErr, serverErr } = users;

  useEffect(() => {
    setTimeout(() => {
      if (passwordReset) navigate('/login');
    }, 5000);
  }, [passwordReset]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Password Reset
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              Reset your password if you have forgotten
            </a>
          </p>
        </div>

        <div className="text-red-500 text-center">
          {appErr || serverErr ? (
            <h3>
              {serverErr} {appErr}
            </h3>
          ) : null}
        </div>

        <div className="text-green-700 text-center">
          {passwordReset && (
            <h3>
              Password Reset Successfully. You will be redirected to login with
              5 seconds
            </h3>
          )}
        </div>
        <PasswordResetForm formik={formik} loading={loading} />
      </div>
    </div>
  );
}

export default PasswordReset;
