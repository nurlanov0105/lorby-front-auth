import { FC, useState } from 'react';
import { useFormik } from 'formik';
import { singleEmailValidationSchema, singlePswValidationSchema } from '../model/validation';
import classNames from 'classnames';
import styles from './styles.module.scss';

import eyeOpenedImg from '@/shared/assets/imgs/auth/eye-opened.svg';
import eyeClosedImg from '@/shared/assets/imgs/auth/eye-closed.svg';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { getInputClassNames } from '../model/getInputClassNames';
import ErrorMessage from './ErrorMessage';

type Props = {
   type: string;
   handleData: (data: string) => void;
};

const ForgetPasswordForm: FC<Props> = ({ type = 'email', handleData }) => {
   const dispatch = useAppDispatch();
   const [showPassword, setShowPassword] = useState(false);

   const handlePasswordShow = () => setShowPassword(!showPassword);

   const handleClick = () => {
      dispatch(showModal('EmailNoticeModal'));
   };

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: type === 'email' ? singleEmailValidationSchema : singlePswValidationSchema,
      onSubmit: (values, { setSubmitting }) => {
         setSubmitting(false);
         const data = type === 'email' ? values.email : values.password;
         handleData(data);
      },
      validateOnMount: true,
   });

   // inputs validations
   const emailClassNames = getInputClassNames(formik, 'email');
   const pswClassNames = getInputClassNames(formik, 'password');

   return (
      <div className={styles.formWrapper}>
         <div className={styles.heading}>
            <h3 className='h3'>Сбросс пароля</h3>
            {type === 'email' ? (
               <h4>Напиши почту на которую отправят новый пароль</h4>
            ) : (
               <h4>На твою почту отправили новый пароль</h4>
            )}
         </div>

         <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.form__col}>
               {type === 'email' ? (
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type='email'
                           className={emailClassNames}
                           placeholder='Введи адрес почты'
                           name='email'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           // @ts-ignore
                           value={formik.values.email}
                        />
                     </div>
                     <ErrorMessage formik={formik} name='email' />
                  </div>
               ) : (
                  <div className={styles.form__outbox}>
                     <div className={styles.form__box}>
                        <input
                           type={showPassword ? 'text' : 'password'}
                           className={pswClassNames}
                           placeholder='Введи пароль'
                           name='password'
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           // @ts-ignore
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
               )}
            </div>

            <button
               type='submit'
               className={classNames('btn', styles.form__btn)}
               disabled={!!Object.keys(formik.errors).length}>
               <span>Далее</span>
            </button>
         </form>
         {type !== 'email' ? (
            <div className={styles.btns}>
               <button
                  className={classNames('btn btn--light', styles.btnLight)}
                  onClick={handleClick}>
                  <span>Не получил{'(а)'} пароль</span>
               </button>
            </div>
         ) : (
            ''
         )}
      </div>
   );
};

export default ForgetPasswordForm;
