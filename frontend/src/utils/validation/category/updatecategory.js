import * as Yup from 'yup';

const UpdateCategoryFormSchema = Yup.object({
  title: Yup.string().required('Title is required'),
});

export { UpdateCategoryFormSchema };
