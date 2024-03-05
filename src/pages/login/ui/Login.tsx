import { LoginForm, addCurrentUser, useLoginMutation } from '@/features/auth';
import styles from './styles.module.scss';
import mobIllustImg from '@/shared/assets/imgs/auth/mobile-illustration.png';
import { useAppDispatch } from '@/app/appStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { errorMessages } from '@/shared/api/errorMessages';

const Login = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [login, { isLoading }] = useLoginMutation();

   const handleLogin = async (username: string, password: string) => {
      try {
         const res: any = await login({ username, password });

         if (res) {
            const { refresh, access, user_info } = res.data.data;

            dispatch(addCurrentUser({ refresh, access, user_info }));
            const currentUserJson = JSON.stringify({ refresh, access, user_info });
            localStorage.setItem('currentUser', currentUserJson);

            toast.success('Успешно залогинился!');
            navigate('/');
         }
      } catch (error: any) {
         const message = errorMessages[error.status as keyof typeof errorMessages];
         if (message) {
            toast.error(message);
         } else {
            toast.error('Произошла ошибка при логине');
         }
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
