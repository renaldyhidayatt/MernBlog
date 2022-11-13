const UpdateCommentFormSchema = Yup.object({
  description: Yup.string().required('Description is required'),
});

export { UpdateCommentFormSchema };
