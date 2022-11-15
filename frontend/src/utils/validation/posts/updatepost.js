import * as Yup from 'yup';

const UpdatePostformSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.object().required('Category is required'),
});

export { UpdatePostformSchema };
