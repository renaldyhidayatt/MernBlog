import * as Yup from 'yup';

const CreatePostFormSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.object().required('Category is required'),
  image: Yup.string().required('Image is required'),
});

export { CreatePostFormSchema };
