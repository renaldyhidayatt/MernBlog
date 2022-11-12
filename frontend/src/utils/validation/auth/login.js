import * as Yup from 'yup';

const LoginformSchema = Yup.object({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export { LoginformSchema };
