import { FC, useState } from 'react';
import { useFormik } from 'formik';
import { allPasswordSchema } from '../model/validation';
import classNames from 'classnames';
import styles from './styles.module.scss';

import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import { getInputClassNames } from '../model/getInputClassNames';
import { getValidationListItem } from './getValidationListItem';

type Props = {
   handleData: (oldPassword: string, newPassword: string) => void;
   isLoading: boolean;
};

const ProoveForm: FC<Props> = ({ handleData, isLoading = false }) => {
   const [showOldPassword, setShowOldPassword] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const handleOldPasswordShow = () => setShowOldPassword(!showOldPassword);
   const handlePasswordShow = () => setShowPassword(!showPassword);
   const handleConfirmPasswordShow = () => setShowConfirmPassword(!showConfirmPassword);

   const formik = useFormik({
      initialValues: {
         oldPassword: '',
         password: '',
         passwordConfirm: '',
      },

      validationSchema: allPasswordSchema,

      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);

         const { oldPassword, password } = values;
         handleData(oldPassword, password);
      },
      validateOnMount: true,
   });

   // inputs validations
   const oldPasswordClassNames = getInputClassNames(formik, 'oldPassword');
   const pswClassNames = getInputClassNames(formik, 'password');
   const pswConfirmClassNames = getInputClassNames(formik, 'passwordConfirm');

   return (
      <div className={styles.formWrapper}>
         <div className={styles.heading}>
            <h3 className='h3'>Сбросс пароля</h3>
         </div>

         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.form__col}>
               <div className={styles.form__outbox}>
                  <div className={styles.form__box}>
                     <input
                        type={showOldPassword ? 'text' : 'password'}
                        className={oldPasswordClassNames}
                        placeholder='Напиши старый пароль'
                        name='oldPassword'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.oldPassword}
                     />
                     <img
                        src={showOldPassword ? eyeClosedImg : eyeOpenedImg}
                        alt='eye opened'
                        className={styles.form__eye}
                        onClick={handleOldPasswordShow}
                     />
                  </div>
                  <ErrorMessage formik={formik} name='oldPassword' />
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
                        src={showPassword ? eyeClosedImg : eyeOpenedImg}
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
                     {getValidationListItem(
                        formik,
                        formik.values.oldPassword !== formik.values.password,
                        'не совпадает со старым паролем'
                     )}
                  </ul>
               </div>

               <div className={styles.form__outbox}>
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
                        src={showConfirmPassword ? eyeClosedImg : eyeOpenedImg}
                        alt='eye opened'
                        className={styles.form__eye}
                        onClick={handleConfirmPasswordShow}
                     />
                  </div>
                  <ErrorMessage formik={formik} name='passwordConfirm' />
               </div>
            </div>

            <button
               type='submit'
               className={classNames('btn', styles.form__btn)}
               disabled={!!Object.keys(formik.errors).length || isLoading}>
               {isLoading ? <span>Загрузка...</span> : <span>Отправить</span>}
            </button>
         </form>

         <div className={styles.btns}>
            <Link to='/forget-password' className={classNames('btn btn--light', styles.btnLight)}>
               <span>Забыл{`(а)`} пароль</span>
            </Link>
         </div>
      </div>
   );
};

export default ProoveForm;
