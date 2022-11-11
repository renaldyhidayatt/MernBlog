import * as Yup from 'yup';

const RegisterFormSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export { RegisterFormSchema };
