import * as Yup from 'yup';

const UpdateCommentFormSchema = Yup.object({
  description: Yup.string().required('Description is required'),
});

export { UpdateCommentFormSchema };
