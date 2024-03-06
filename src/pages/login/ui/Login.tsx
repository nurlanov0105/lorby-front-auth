import {
   LoginForm,
   addCurrentUser,
   removeEmail,
   useLoginMutation,
   useResendEmailMutation,
} from '@/features/auth';
import styles from './styles.module.scss';
import mobIllustImg from '@/shared/assets/imgs/auth/mobile-illustration.png';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const email = useAppSelector((state) => state.auth.email);
   const [login, { isLoading }] = useLoginMutation();
   const [resendEmail] = useResendEmailMutation();

   const handleLogin = async (username: string, password: string) => {
      try {
         const res: any = await login({ username, password });

         if (res.error && res.error.data.Error === 'Username email is not verified!') {
            toast.error(res.error.data.Error);

            resendEmail({ email })
               .unwrap()
               .then((res: any) => {
                  if (res) {
                     navigate('/verification');
                  }
               })
               .catch((error: any) => {
                  console.error(error);
                  toast.error('Произошла ошибка при отправке письма');
               });
         } else if (res.error) {
            toast.error(res.error.data.Error);
            console.log(res.error, 'try');
         } else {
            const { refresh, access, user_info } = res.data;

            // add user info
            dispatch(addCurrentUser({ refresh, access, user_info }));
            const currentUserJson = JSON.stringify({ refresh, access, user_info });
            localStorage.setItem('currentUser', currentUserJson);

            // remove email ls
            if (email) {
               dispatch(removeEmail());
               localStorage.removeItem('currentUserEmail');
            }

            toast.success('Успешно залогинился!');
            navigate('/');
         }
      } catch (error: any) {
         console.log(error, 'catch');
         toast.error('Неверный логин или пароль catch');
      }
   };
   return (
      <section className={styles.section}>
         <img src={mobIllustImg} alt='mobile illustartion' className={styles.mobImg} />
         <LoginForm handleLogin={handleLogin} isLoading={isLoading} />
      </section>
   );
};

export default Login;
