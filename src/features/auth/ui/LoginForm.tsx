import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import classNames from 'classnames';

import { loginValidationSchema } from '../model/validation';
import styles from './styles.module.scss';
import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';
import ErrorMessage from './ErrorMessage';
import { getInputClassNames } from '../model/getInputClassNames';

type Props = {
   handleLogin: (username: string, password: string) => void;
   isLoading: boolean;
};

const LoginForm: FC<Props> = ({ handleLogin, isLoading }) => {
   const [showPassword, setShowPassword] = useState(false);

   const handlePasswordShow = () => setShowPassword(!showPassword);

   const formik = useFormik({
      initialValues: {
         login: '',
         password: '',
      },

      validationSchema: loginValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const { login: username, password } = values;
         handleLogin(username, password);
      },
      validateOnMount: true,
   });

   const loginClassNames = getInputClassNames(formik, 'login');
   const pswClassNames = getInputClassNames(formik, 'password');

   return (
      <div className={styles.formWrapper}>
         <h3 className='h3'>Вэлком бэк!</h3>
         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.form__col}>
               <div className={styles.form__box}>
                  <input
                     type='text'
                     className={loginClassNames}
                     placeholder='Введи туда-сюда логин'
                     name='login'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.login}
                  />

                  <ErrorMessage formik={formik} name='login' />
               </div>
               <div className={styles.form__outbox}>
                  <div className={styles.form__box}>
                     <input
                        type={showPassword ? 'text' : 'password'}
                        className={pswClassNames}
                        placeholder='Пароль (тоже введи)'
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                     />
                     <img
                        src={showPassword ? eyeClosedImg : eyeOpenedImg}
                        alt='eye opened'
                        className={styles.form__eye}
                        onClick={handlePasswordShow}
                     />
                  </div>

                  <ErrorMessage formik={formik} name='password' />
               </div>
            </div>
            <button
               type='submit'
               className={classNames('btn', styles.form__btn)}
               disabled={!!Object.keys(formik.errors).length || isLoading}>
               {isLoading ? <span>Загрузка...</span> : <span>Войти</span>}
            </button>
         </form>
         <div className={styles.btns}>
            <Link to='/forget-password' className={classNames('btn btn--light', styles.btnLight)}>
               <span>Забыл{'(а)'} пароль</span>
            </Link>
            <Link to='/register' className={classNames('btn btn--light', styles.btnLight)}>
               <span>У меня еще нет аккаунта</span>
            </Link>
         </div>
      </div>
   );
};

export default LoginForm;
