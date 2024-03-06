import { FC, useState } from 'react';
import { useFormik } from 'formik';
import { newPswValidationSchema, pswValidationSchema } from '../model/validation';
import classNames from 'classnames';
import styles from './styles.module.scss';

import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import { getInputClassNames } from '../model/getInputClassNames';
import { getValidationListItem } from './getValidationListItem';

type Props = {
   type: string;
   handleData: (data: string) => void;
};

const ProoveForm: FC<Props> = ({ type = 'password', handleData }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const [showNewPassword, setNewShowPassword] = useState(false);
   const [showNewConfirmPassword, setNewShowConfirmPassword] = useState(false);

   const handlePasswordShow = () => setShowPassword(!showPassword);
   const handleConfirmPasswordShow = () => setShowConfirmPassword(!showConfirmPassword);

   const handleNewPasswordShow = () => setNewShowPassword(!showNewPassword);
   const handleNewConfirmPasswordShow = () => setNewShowConfirmPassword(!showNewConfirmPassword);

   const formik = useFormik({
      initialValues: {
         password: '',
         passwordConfirm: '',
         newPassword: '',
         newPasswordConfirm: '',
      },

      validationSchema: type === 'password' ? pswValidationSchema : newPswValidationSchema,

      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const data = type === 'password' ? values.password : values.newPassword;
         handleData(data);
      },
      validateOnMount: true,
   });

   // inputs validations
   const pswClassNames = getInputClassNames(formik, 'password');
   const pswConfirmClassNames = getInputClassNames(formik, 'passwordConfirm');

   return (
      <div className={styles.formWrapper}>
         <div className={styles.heading}>
            <h3 className='h3'>Сбросс пароля</h3>
            {type === 'password' ? <h4>Подтверди старый пароль</h4> : <h4>Создай новый пароль</h4>}
         </div>

         <form onSubmit={formik.handleSubmit} className={styles.form}>
            {type === 'password' ? (
               <div className={styles.form__col}>
                  <div className={styles.form__validation}>
                     <div className={styles.form__box}>
                        <input
                           type={showPassword ? 'text' : 'password'}
                           className={pswClassNames}
                           placeholder='Введи старый пароль'
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
                           formik.values.password.length >= 8 &&
                              formik.values.password.length <= 15,
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
                           src={showConfirmPassword ? eyeOpenedImg : eyeClosedImg}
                           alt='eye opened'
                           className={styles.form__eye}
                           onClick={handleConfirmPasswordShow}
                        />
                     </div>
                     <ErrorMessage formik={formik} name='passwordConfirm' />
                  </div>
               </div>
            ) : (
               <div className={styles.form__col}>
                  <div className={styles.form__validation}>
                     <div className={styles.form__box}>
                        <input
                           type={showNewPassword ? 'text' : 'password'}
                           className={pswClassNames}
                           placeholder='Введи новый пароль'
                           name='newPassword'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.newPassword}
                        />
                        <img
                           src={showNewPassword ? eyeOpenedImg : eyeClosedImg}
                           alt='eye opened'
                           className={styles.form__eye}
                           onClick={handleNewPasswordShow}
                        />
                     </div>

                     <ul className={styles.form__list}>
                        {getValidationListItem(
                           formik,
                           formik.values.newPassword.length >= 8 &&
                              formik.values.newPassword.length <= 15,
                           'От 8 до 15 символов'
                        )}
                        {getValidationListItem(
                           formik,
                           /[a-z]/.test(formik.values.newPassword) &&
                              /[A-Z]/.test(formik.values.newPassword),
                           'Строчные и прописные буквы'
                        )}
                        {getValidationListItem(
                           formik,
                           /\d/.test(formik.values.newPassword),
                           'Минимум 1 цифра'
                        )}
                        {getValidationListItem(
                           formik,
                           /[^a-zA-Z0-9]/.test(formik.values.newPassword),
                           'Минимум 1 спецсимвол (!, ", #, $...)'
                        )}
                     </ul>
                  </div>
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type={showNewConfirmPassword ? 'text' : 'password'}
                           className={pswConfirmClassNames}
                           placeholder='Повтори пароль'
                           name='newPasswordConfirm'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.newPasswordConfirm}
                        />
                        <img
                           src={showNewConfirmPassword ? eyeOpenedImg : eyeClosedImg}
                           alt='eye opened'
                           className={styles.form__eye}
                           onClick={handleNewConfirmPasswordShow}
                        />
                     </div>
                     <ErrorMessage formik={formik} name='newPasswordConfirm' />
                  </div>
               </div>
            )}

            <button
               type='submit'
               className={classNames('btn', styles.form__btn)}
               disabled={!!Object.keys(formik.errors).length}>
               <span>Далее</span>
            </button>
         </form>
         {type === 'password' ? (
            <div className={styles.btns}>
               <Link
                  to='/forget-password'
                  className={classNames('btn btn--light', styles.btnLight)}>
                  <span>Забыл{`(а)`} пароль</span>
               </Link>
            </div>
         ) : (
            ''
         )}
      </div>
   );
};

export default ProoveForm;
