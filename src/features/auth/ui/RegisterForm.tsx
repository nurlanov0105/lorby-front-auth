import { FC, useState } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';

import { validationSchema } from '../model/validation';
import styles from './styles.module.scss';
import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';

type Props = {
   handleRegister: (login: string, email: string, password: string) => void;
};

const RegisterForm: FC<Props> = ({ handleRegister }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const formik = useFormik({
      initialValues: {
         email: '',
         login: '',
         password: '',
         passwordConfirm: '',
      },
      initialErrors: {
         email: 'Требуется email',
         login: 'Требуется логин',
         password: 'Требуется пароль',
         passwordConfirm: 'Требуется подтверждение пароля',
      },
      validationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);

         const { login, email, password } = values;
         handleRegister(login, email, password);
      },
      validateOnMount: true,
   });

   // inputs validation
   const emailClassNames = `${styles.form__input} ${
      formik.touched.email && formik.errors.email ? styles.form__input_error : ''
   }`;
   const loginClassNames = `${styles.form__input} ${
      formik.touched.login && formik.errors.login ? styles.form__input_error : ''
   }`;
   const pswClassNames = `${styles.form__input} ${
      formik.touched.password && formik.errors.password ? styles.form__input_error : ''
   }`;
   const pswConfirmClassNames = `${styles.form__input} ${
      formik.touched.passwordConfirm && formik.errors.passwordConfirm
         ? styles.form__input_error
         : ''
   }`;

   // ul list validatioin
   const liLengthClassName = formik.values.password
      ? formik.values.password.length >= 8 && formik.values.password.length <= 15
         ? styles.form__item_success
         : styles.form__item_error
      : styles.form__item;

   const liLetterClassName = formik.values.password
      ? /[a-z]/.test(formik.values.password) && /[A-Z]/.test(formik.values.password)
         ? styles.form__item_success
         : styles.form__item_error
      : styles.form__item;

   const liMinimumClassName = formik.values.password
      ? /\d/.test(formik.values.password)
         ? styles.form__item_success
         : styles.form__item_error
      : styles.form__item;

   const liSpecialClassName = formik.values.password
      ? /[^a-zA-Z0-9]/.test(formik.values.password)
         ? styles.form__item_success
         : styles.form__item_error
      : styles.form__item;

   return (
      <div className={styles.formWrapper}>
         <h3 className='h3'>Создать аккаунт Lorby</h3>
         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.form__col}>
               <input
                  type='email'
                  className={emailClassNames}
                  placeholder='Введи адрес почты'
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
               />
               <input
                  type='text'
                  className={loginClassNames}
                  placeholder='Придумай логин'
                  name='login'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.login}
               />
               <div className={styles.form__validation}>
                  <div className={styles.form__box}>
                     <input
                        type={showPassword ? 'text' : 'password'}
                        className={pswClassNames}
                        placeholder='Создай пароль'
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                     />
                     <img
                        src={showPassword ? eyeOpenedImg : eyeClosedImg}
                        alt='eye opened'
                        className={styles.form__eye}
                        onClick={() => setShowPassword(!showPassword)}
                     />
                  </div>

                  <ul className={styles.form__list}>
                     <li className={liLengthClassName}>
                        От 8 до 15 символов{' '}
                        {formik.values.password
                           ? formik.values.password.length >= 8 &&
                             formik.values.password.length <= 15
                              ? '✅'
                              : '❌'
                           : ''}
                     </li>
                     <li className={liLetterClassName}>
                        Строчные и прописные буквы{' '}
                        {formik.values.password
                           ? /[a-z]/.test(formik.values.password) &&
                             /[A-Z]/.test(formik.values.password)
                              ? '✅'
                              : '❌'
                           : ''}
                     </li>
                     <li className={liMinimumClassName}>
                        Минимум 1 цифра{' '}
                        {formik.values.password
                           ? /\d/.test(formik.values.password)
                              ? '✅'
                              : '❌'
                           : ''}
                     </li>
                     <li className={liSpecialClassName}>
                        Минимум 1 спецсимвол (!, ", #, $...){' '}
                        {formik.values.password
                           ? /[^a-zA-Z0-9]/.test(formik.values.password)
                              ? '✅'
                              : '❌'
                           : ''}
                     </li>
                  </ul>
               </div>

               <div className={styles.form__box}>
                  <input
                     type={showConfirmPassword ? 'text' : 'password'}
                     className={pswConfirmClassNames}
                     placeholder='Повтори пароль'
                     name='passwordConfirm'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.passwordConfirm}
                  />
                  <img
                     src={showConfirmPassword ? eyeOpenedImg : eyeClosedImg}
                     alt='eye opened'
                     className={styles.form__eye}
                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
               </div>
            </div>
            <button
               type='submit'
               className={classNames('btn', styles.form__btn)}
               disabled={!!Object.keys(formik.errors).length}>
               <span>Далее</span>
            </button>
         </form>
      </div>
   );
};

export default RegisterForm;
