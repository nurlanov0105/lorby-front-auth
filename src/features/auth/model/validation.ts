import * as yup from 'yup';

export const validationSchema = yup.object({
   email: yup
      .string()
      .email('Неверный адрес электронной почты')
      .required('Требуется адрес электронной почты'),
   login: yup.string().required('Требуется логин'),
   password: yup
      .string()
      .min(8, 'От 8 до 15 символов')
      .max(15, 'От 8 до 15 символов')
      .matches(/[a-z]/, 'Строчные и прописные буквы')
      .matches(/[A-Z]/, 'Строчные и прописные буквы')
      .matches(/\d/, 'Минимум 1 цифра')
      .matches(/[^a-zA-Z0-9]/, 'Минимум 1 спецсимвол (!, ", #, $...)')
      .required('Требуется пароль'),
   passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
      .required('Требуется подтверждение пароля'),
});

export const loginValidationSchema = yup.object({
   login: yup.string(),
   password: yup
      .string()
      .min(8)
      .max(15)
      .matches(/[a-z]/)
      .matches(/[A-Z]/)
      .matches(/\d/)
      .matches(/[^a-zA-Z0-9]/)
      .required(),
});
