import * as Yup from 'yup';

const PasswordResetTokenFormSchema = Yup.object({
  email: Yup.string().required('Email is required'),
});

export { PasswordResetTokenFormSchema };
