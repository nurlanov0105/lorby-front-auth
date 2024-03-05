import { FC, useState } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';

import { validationSchema } from '../model/validation';
import styles from './styles.module.scss';
import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';
import ErrorMessage from './ErrorMessage';
import { getInputClassNames } from '../model/getInputClassNames';
import { getValidationListItem } from './getValidationListItem';

type Props = {
   handleRegister: (login: string, email: string, password: string) => void;
   isLoading: boolean;
};

const RegisterForm: FC<Props> = ({ handleRegister, isLoading }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const handlePasswordShow = () => setShowPassword(!showPassword);
   const handleConfirmPasswordShow = () => setShowConfirmPassword(!showConfirmPassword);

   const formik = useFormik({
      initialValues: {
         email: '',
         login: '',
         password: '',
         passwordConfirm: '',
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
   const emailClassNames = getInputClassNames(formik, 'email');
   const loginClassNames = getInputClassNames(formik, 'login');
   const pswClassNames = getInputClassNames(formik, 'password');
   const pswConfirmClassNames = getInputClassNames(formik, 'passwordConfirm');

   return (
      <div className={styles.formWrapper}>
         <h3 className='h3'>Создать аккаунт Lorby</h3>
         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.form__col}>
               <div className={styles.form__box}>
                  <input
                     type='email'
                     className={emailClassNames}
                     placeholder='Введи адрес почты'
                     name='email'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.email}
                  />

                  <ErrorMessage formik={formik} name='email' />
               </div>
               <div className={styles.form__box}>
                  <input
                     type='text'
                     className={loginClassNames}
                     placeholder='Придумай логин'
                     name='login'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.login}
                  />
                  <ErrorMessage formik={formik} name='login' />
               </div>

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
                        onClick={handlePasswordShow}
                     />
                  </div>

                  <ul className={styles.form__list}>
                     {getValidationListItem(
                        formik,
                        formik.values.password.length >= 8 && formik.values.password.length <= 15,
                        'От 8 до 15 символов'
                     )}
                     {getValidationListItem(
                        formik,
                        /[a-z]/.test(formik.values.password) &&
                           /[A-Z]/.test(formik.values.password),
                        'Строчные и прописные буквы'
                     )}
                     {getValidationListItem(
                        formik,
                        /\d/.test(formik.values.password),
                        'Минимум 1 цифра'
                     )}
                     {getValidationListItem(
                        formik,
                        /[^a-zA-Z0-9]/.test(formik.values.password),
                        'Минимум 1 спецсимвол (!, ", #, $...)'
                     )}
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
                     onClick={handleConfirmPasswordShow}
                  />
                  <ErrorMessage formik={formik} name='passwordConfirm' />
               </div>
            </div>
            <button
               type='submit'
               className={classNames('btn', styles.form__btn)}
               disabled={!!Object.keys(formik.errors).length || isLoading}>
               {isLoading ? <span>Отправка...</span> : <span>Далее</span>}
            </button>
         </form>
      </div>
   );
};

export default RegisterForm;
