import * as Yup from 'yup';

const UpdatePasswordSchema = Yup.object({
  password: Yup.string().required('Password is required'),
});

export { UpdatePasswordSchema };
