import { FC, useState } from 'react';
import { useFormik } from 'formik';
import { singlePswValidationSchema } from '../model/validation';
import classNames from 'classnames';
import styles from './styles.module.scss';

import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { getInputClassNames } from '../model/getInputClassNames';
import ErrorMessage from './ErrorMessage';

type Props = {
   handleSendedPsw: (password: string) => void;
};

const CheckSendedForm: FC<Props> = ({ handleSendedPsw }) => {
   const dispatch = useAppDispatch();
   const [showPassword, setShowPassword] = useState(false);

   const handlePasswordShow = () => setShowPassword(!showPassword);

   const handleClick = () => {
      dispatch(showModal('EmailNoticeModal'));
   };

   const formik = useFormik({
      initialValues: {
         password: '',
      },

      validationSchema: singlePswValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const { password } = values;
         handleSendedPsw(password);
      },
      validateOnMount: true,
   });

   // inputs validations
   const pswClassNames = getInputClassNames(formik, 'password');

   return (
      <div className={styles.formWrapper}>
         <div className={styles.heading}>
            <h3 className='h3'>Сбросс пароля</h3>
            <h4>На твою почту отправили новый пароль</h4>
         </div>

         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.form__col}>
               <div className={styles.form__box}>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     className={pswClassNames}
                     placeholder='Введи пароль'
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
                  <ErrorMessage formik={formik} name='password' />
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
            <button className={classNames('btn btn--light', styles.btnLight)} onClick={handleClick}>
               <span>Не получил{'(а)'} пароль</span>
            </button>
         </div>
      </div>
   );
};

export default CheckSendedForm;
