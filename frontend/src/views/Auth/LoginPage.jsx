import LoginForm from '../../components/form/LoginForm';
import { LoginformSchema } from '../../utils/validation/auth/login';
import poster from '../../assets/poster.png';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { loginUserAction } from '../../redux/slices/usersSlices';

function Loginpage() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(loginUserAction());
    },
    validationSchema: LoginformSchema,
  });

  const store = useSelector((state) => state?.users);
  const { userAuth, loading, serverErr, appErr } = store;
  if (userAuth) return <Navigate to={`/profile/${userAuth?._id}`} />;

  return (
    <>
      <section className="min-h-screen relative py-20 2xl:py-40 bg-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 lg:bottom-0 h-full lg:h-auto w-full lg:w-4/12 bg-violet-500 lg:overflow-hidden">
          <img
            className="hidden lg:block h-full w-full object-cover"
            src={poster}
            alt=""
          />
        </div>
        <div className="relative container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full lg:w-2/5 px-4">
                <div className="px-6 lg:px-12 py-12 lg:py-24 bg-white shadow-lg rounded-lg">
                  <LoginForm
                    loading={loading}
                    serverErr={serverErr}
                    appErr={appErr}
                    formik={formik}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Loginpage;
