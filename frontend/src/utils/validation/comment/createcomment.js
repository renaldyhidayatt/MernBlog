const CreateCommentFormSchema = Yup.object({
  description: Yup.string().required('Description is required'),
});

export { CreateCommentFormSchema };
