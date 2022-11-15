import { BookOpenIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UpdateCategoryForm from '../../components/form/UpdateCategoryForm';
import {
  fetchCategoryAction,
  updateCategoriesAction,
} from '../../redux/slices/categorySlices';
import { UpdateCategoryFormSchema } from '../../utils/validation/category/updatecategory';

export default function UpdateCategoryPage({
  computedMatch: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
  }, []);

  const state = useSelector((state) => state?.category);

  const { loading, appErr, serverErr, category, isEdited, isDeleted } = state;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: category?.title,
    },
    onSubmit: (values) => {
      dispatch(updateCategoriesAction({ title: values.title, id }));
    },
    validationSchema: UpdateCategoryFormSchema,
  });

  if (isEdited || isDeleted) {
    return <Navigate to="/category-list" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className='className="max-w-md w-full space-y-8"'>
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Category
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
        <UpdateCategoryForm formik={formik} loading={loading} />
      </div>
    </div>
  );
}
