import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CreateCommentFormSchema } from '../../utils/validation/comment/createcomment';
import { createCommentAction } from '../../redux/slices/commentSlices';
import CreateCommentForm from '../form/CreateCommentForm';

export default function CreateComment({ postId }) {
  const dispatch = useDispatch();

  const comment = useSelector((state) => state?.comment);
  const { loading, appErr, serverErr } = comment;

  const formik = useFormik({
    initialValues: {
      description: '',
    },
    onSubmit: (values) => {
      const data = {
        postId,
        description: values?.description,
      };
      dispatch(createCommentAction(data));
    },
    validationSchema: CreateCommentFormSchema,
  });
  return (
    <div className="flex flex-col justify-center items-center">
      {serverErr || appErr ? (
        <h2 className="text-red-400 pb-2">
          {serverErr} {appErr}
        </h2>
      ) : null}
      <CreateCommentForm loading={loading} formik={formik} />
    </div>
  );
}
