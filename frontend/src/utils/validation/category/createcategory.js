import * as Yup from 'yup';

const CreateCategoryFormSchema = Yup.object({
  title: Yup.string().required('Title is required'),
});

export { CreateCategoryFormSchema };
