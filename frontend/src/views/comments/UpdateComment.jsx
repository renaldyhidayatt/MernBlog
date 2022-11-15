import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCommentFormSchema } from '../../utils/validation/comment/updatecomment';
import { Navigate } from 'react-router-dom';
import UpdateCategoryForm from '../../components/form/UpdateCategoryForm';
import {
  updateCommentAction,
  fetchCommentAction,
} from '../../redux/slices/commentSlices';
import { useEffect } from 'react';

export default function UpdateComment({
  computedMatch: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentAction(id));
  }, [dispatch, id]);

  const comment = useSelector((state) => state?.comment);
  const { commentDetails, isUpdate } = comment;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: commentDetails?.description,
    },
    onSubmit: (values) => {
      const data = {
        id,
        description: values?.description,
      };
      dispatch(updateCommentAction(data));
    },
    validationSchema: UpdateCommentFormSchema,
  });

  if (isUpdate) return <Navigate to={`/posts`} />;

  return (
    <div className="h-96 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <UpdateCategoryForm formik={formik} />
      </div>
    </div>
  );
}
