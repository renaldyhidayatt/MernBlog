import * as Yup from 'yup';

const UpdatePhotoProfileformSchema = Yup.object({
  image: Yup.string().required('Image is required'),
});

export { UpdatePhotoProfileformSchema };
