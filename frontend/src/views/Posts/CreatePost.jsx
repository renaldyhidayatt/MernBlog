import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePostFormSchema } from '../../utils/validation/posts/createpost';
import { createpostAction } from '../../redux/slices/postSlices';
import { Navigate } from 'react-router-dom';
import CreateCommentForm from '../../components/form/CreateCommentForm';

export default function CreatePost() {
  const dispatch = useDispatch();

  const post = useSelector((state) => state?.post);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      image: '',
    },
    onSubmit: (values) => {
      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values?.description,
        image: values?.image,
      };
      dispatch(createpostAction(data));
    },
    validationSchema: CreatePostFormSchema,
  });

  if (isCreated) return <Navigate to="/posts" />;

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create Post
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-green-600 hover:text-indigo-500">
              Share your ideas to the word. Your post must be free from
              profanity
            </p>
          </p>
          {appErr || serverErr ? (
            <p className="mt-2 text-center text-lg text-red-600">
              {serverErr} {appErr}
            </p>
          ) : null}
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <CreateCommentForm loading={loading} formik={formik} />
          </div>
        </div>
      </div>
    </>
  );
}
