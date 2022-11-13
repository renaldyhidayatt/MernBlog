import * as Yup from 'yup';

const SendEmailFormSchema = Yup.object({
  recipientEmail: Yup.string().required('Recipent Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

export { SendEmailFormSchema };
