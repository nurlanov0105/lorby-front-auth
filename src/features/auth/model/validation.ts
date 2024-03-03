import * as yup from 'yup';

const passwordSchema = yup
   .string()
   .min(8, 'От 8 до 15 символов')
   .max(15, 'От 8 до 15 символов')
   .matches(/[a-z]/, 'Строчные и прописные буквы')
   .matches(/[A-Z]/, 'Строчные и прописные буквы')
   .matches(/\d/, 'Минимум 1 цифра')
   .matches(/[^a-zA-Z0-9]/, 'Минимум 1 спецсимвол (!, ", #, $...)')
   .required('Требуется пароль');

const loginSchema = yup
   .string()
   .min(4, 'Минимум 4 символа')
   .matches(/^[A-Za-z]*$/, 'Только латинские буквы разрешены')
   .required('Требуется логин');

const passwordConfirmSchema = yup
   .string()
   .oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
   .required('Пароли должны совпадать');

export const validationSchema = yup.object({
   email: yup
      .string()
      .email('Неверный адрес электронной почты')
      .required('Требуется адрес электронной почты'),
   login: loginSchema,
   password: passwordSchema,
   passwordConfirm: passwordConfirmSchema,
});

export const loginValidationSchema = yup.object({
   login: loginSchema,
   password: passwordSchema,
});

export const pswValidationSchema = yup.object({
   password: passwordSchema,
   passwordConfirm: passwordConfirmSchema,
});

export const singlePswValidationSchema = yup.object({
   password: passwordSchema,
});
