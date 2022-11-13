const UpdateCategoryFormSchema = Yup.object({
  title: Yup.string().required('Title is required'),
});

export { UpdateCategoryFormSchema };
