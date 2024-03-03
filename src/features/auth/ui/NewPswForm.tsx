import { FC, useState } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import styles from './styles.module.scss';

import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';
import { pswValidationSchema } from '../model/validation';
import ErrorMessage from './ErrorMessage';
import { getInputClassNames } from '../model/getInputClassNames';
import { getValidationListItem } from './getValidationListItem';

type Props = {
   handleNewPsw: (password: string) => void;
};

const NewPswForm: FC<Props> = ({ handleNewPsw }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const handlePasswordShow = () => setShowPassword(!showPassword);
   const handleConfirmPasswordShow = () => setShowConfirmPassword(!showConfirmPassword);

   const formik = useFormik({
      initialValues: {
         password: '',
         passwordConfirm: '',
      },

      validationSchema: pswValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const { password } = values;
         handleNewPsw(password);
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
            <h4>Создай новый пароль</h4>
         </div>
         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.form__col}>
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
               disabled={!!Object.keys(formik.errors).length}>
               <span>Отправить</span>
            </button>
         </form>
      </div>
   );
};

export default NewPswForm;
