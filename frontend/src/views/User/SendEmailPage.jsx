import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SendEmailForm from '../../components/form/SendEmailForm';
import { sendMailAction } from '../../redux/slices/emailSlices';
import { SendEmailFormSchema } from '../../utils/validation/users/sendEmail';

function SendEmailPage({ location: { state } }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      recipientEmail: state?.email,
      subject: '',
      message: '',
    },
    onSubmit: (values) => {
      dispatch(sendMailAction(values));
    },
    validationSchema: SendEmailFormSchema,
  });

  const sendMail = useSelector((state) => state?.sendMail);
  const { mailSent, loading, appErr, serverErr, isMailSent } = sendMail;

  if (isMailSent) return <Navigate to={`/profile/${state?.id}`} />;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Send Mesage
          <span className="text-green-300">email title</span>
        </h2>

        <p className="mt-2 text-center text-lg text-red-500">
          {serverErr || appErr ? (
            <h2>
              {serverErr} {appErr}
            </h2>
          ) : null}
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">Dota</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SendEmailForm formik={formik} loading={loading} />
        </div>
      </div>
    </div>
  );
}
export default SendEmailPage;
