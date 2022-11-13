import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { updatePostAction } from '../../redux/slices/postSlices';

export default function UpdatePost(props) {
  const {
    computedMatch: {
      params: { id },
    },
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch]);

  const postData = useSelector((state) => state.post);
  const { postDetails } = postData;

  const postUpdate = useSelector((state) => state.post);
  const { loading, appErr, serverErr, isUpdated } = postUpdate;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postDetails?.title,
      description: postDetails?.description,
      category: '',
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        id,
      };
      dispatch(updatePostAction(data));
    },
    validationSchema: formSchema,
  });
  if (isUpdated) {
    return <Navigate to="/posts" />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Are you sure you want to edit {''}
          <span className="text-green-300">{postDetails?.title}</span>
        </h2>
        {appErr || serverErr ? (
          <h1 className="text-red-400 text-xl text-center">
            {serverErr} {appErr}
          </h1>
        ) : null}
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <UpdatePost formik={formik} loading={loading} />
        </div>
      </div>
    </div>
  );
}
