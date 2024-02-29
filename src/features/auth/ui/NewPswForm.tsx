import { FC, useState } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import styles from './styles.module.scss';

import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';
import { pswValidationSchema } from '../model/validation';

type Props = {
   handleNewPsw: (password: string) => void;
};

const NewPswForm: FC<Props> = ({ handleNewPsw }) => {
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
         handleNewPsw(password);
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
            <h4>Создай новый пароль</h4>
         </div>
         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.form__col}>
               <div className={styles.form__box}>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     className={pswClassNames}
                     placeholder='Введи новый пароль'
                     name='password'
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     value={formik.values.password}
                     required={true}
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
               <span>Отправить</span>
            </button>
         </form>
      </div>
   );
};

export default NewPswForm;
