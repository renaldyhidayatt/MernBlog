import * as Yup from 'yup';

const PasswordResetFormSchema = Yup.object({
  password: Yup.string().required('Password is required'),
});

export { PasswordResetFormSchema };
