import * as Yup from 'yup';

const UpdateProfileformSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required'),
  bio: Yup.string().required('Bio is required'),
});

export { UpdateProfileformSchema };
