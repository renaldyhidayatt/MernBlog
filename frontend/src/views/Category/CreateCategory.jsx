import { BookOpenIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../redux/slices/categorySlices';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import CreateCategoryForm from '../../components/form/CreateCategoryForm';

export default function CreateCategoryPage(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: (values) => {
      //dispath the action
      dispatch(createCategoryAction(values));
    },
    validationSchema: formSchema,
  });

  const state = useSelector((state) => state?.category);

  const { loading, appErr, serverErr, isCreated } = state;

  if (isCreated) return <Navigate to="/category-list" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
            <div>
              {appErr || serverErr ? (
                <h2 className="text-red-500 text-center text-lg">
                  {serverErr} {appErr}
                </h2>
              ) : null}
            </div>
          </p>
        </div>
        <CreateCategoryForm loading={loading} formik={formik} />
      </div>
    </div>
  );
}
