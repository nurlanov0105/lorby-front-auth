import * as yup from 'yup';

const loginSchema = yup
   .string()
   .min(4, 'Минимум 4 символа')
   .matches(/^[A-Za-z]*$/, 'Только латинские буквы разрешены')
   .required('Требуется логин');

const passwordSchema = yup
   .string()
   .min(8, 'От 8 до 15 символов')
   .max(15, 'От 8 до 15 символов')
   .matches(/[a-z]/, 'Строчные и прописные буквы')
   .matches(/[A-Z]/, 'Строчные и прописные буквы')
   .matches(/\d/, 'Минимум 1 цифра')
   .matches(/[^a-zA-Z0-9]/, 'Минимум 1 спецсимвол (!, ", #, $...)')
   .required('Требуется пароль');

const passwordConfirmSchema = yup
   .string()
   .oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
   .required('Пароли должны совпадать');

// register
export const validationSchema = yup.object({
   email: yup
      .string()
      .email('Неверный адрес электронной почты')
      .required('Требуется адрес электронной почты'),
   login: loginSchema,
   password: passwordSchema,
   passwordConfirm: passwordConfirmSchema,
});

// login
export const loginValidationSchema = yup.object({
   login: loginSchema,
   password: passwordSchema,
});

// singles
export const singlePswValidationSchema = yup.object({
   password: passwordSchema,
});
export const singleEmailValidationSchema = yup.object({
   email: yup
      .string()
      .email('Неверный адрес электронной почты')
      .required('Требуется адрес электронной почты'),
});

// password
export const pswValidationSchema = yup.object({
   password: passwordSchema,
   passwordConfirm: passwordConfirmSchema,
});

// new password
export const newPswValidationSchema = yup.object({
   newPassword: passwordSchema,
   newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref('newPassword'), undefined], 'Пароли должны совпадать')
      .required('Пароли должны совпадать'),
});

export const allPasswordSchema = yup.object({
   oldPassword: passwordSchema,
   password: passwordSchema.notOneOf(
      [yup.ref('oldPassword')],
      'Новый пароль не должен совпадать со старым'
   ),
   passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
      .required('Пароли должны совпадать'),
});
