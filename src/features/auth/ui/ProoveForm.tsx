import { FC, useState } from 'react';
import { useFormik } from 'formik';
import { pswValidationSchema } from '../model/validation';
import classNames from 'classnames';
import styles from './styles.module.scss';

import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';
import { Link } from 'react-router-dom';

type Props = {
   handleOldPsw: (password: string) => void;
};

const ProoveForm: FC<Props> = ({ handleOldPsw }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const formik = useFormik({
      initialValues: {
         password: '',
         passwordConfirm: '',
      },
      initialErrors: {
         password: 'Требуется пароль',
         passwordConfirm: 'Требуется подтверждение пароля',
      },
      validationSchema: pswValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const { password } = values;
         handleOldPsw(password);
      },
      validateOnMount: true,
   });

   // inputs validations
   const pswClassNames = `${styles.form__input} ${
      formik.touched.password && formik.errors.password ? styles.form__input_error : ''
   }`;
   const pswConfirmClassNames = `${styles.form__input} ${
      formik.touched.passwordConfirm && formik.errors.passwordConfirm
         ? styles.form__input_error
         : ''
   }`;

   return (
      <div className={styles.formWrapper}>
         <div className={styles.heading}>
            <h3 className='h3'>Сбросс пароля</h3>
            <h4>Подтверди старый пароль</h4>
         </div>

         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.form__col}>
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
                     onClick={() => setShowPassword(!showPassword)}
                  />
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
         <div className={styles.btns}>
            <Link to='/forget-password' className={classNames('btn btn--light', styles.btnLight)}>
               <span>Забыл{`(а)`} пароль</span>
            </Link>
         </div>
      </div>
   );
};

export default ProoveForm;
