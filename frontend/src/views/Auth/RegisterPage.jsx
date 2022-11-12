import { useFormik } from 'formik';
import { redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterFormSchema } from '../../utils/validation/auth/register';
import RegisterForm from '../../components/form/RegisterForm';

function RegisterPage() {
  const dispatch = useDispatch();

  const formikValidation = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
    },
    validationSchema: RegisterFormSchema,
  });

  const storeData = useSelector((store) => store?.users);
  const { loading, appErr, serverErr, registered } = storeData;

  if (registered) {
    return <redirect to="/" />;
  }

  return (
    <section className="relative py-20 2xl:py-40 bg-gray-800 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md">
                <span className="text-lg text-blue-400 font-bold">
                  Register Account
                </span>
                <h2 className="mt-8 mb-12 text-5xl font-bold font-heading text-white">
                  Create an account and start pending down your ideas
                </h2>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gray-600 rounded-lg">
                <RegisterForm
                  loading={loading}
                  formik={formikValidation}
                  appErr={appErr}
                  serverErr={serverErr}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
