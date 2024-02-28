import { LoginForm, addCurrentUser } from '@/features/auth';
import styles from './styles.module.scss';
import mobIllustImg from '@/shared/assets/imgs/auth/mobile-illustration.png';
import { useLoginMutation } from '@/features/auth/api/authApi';
import { useAppDispatch } from '@/app/appStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const [login] = useLoginMutation();

   const handleLogin = async (email: string, password: string) => {
      try {
         const res: any = await login({ email, password });
         if (res.error) {
            switch (res.status) {
               case 401:
                  toast.error('Не авторизован');
                  console.error(res);
                  break;
               case 403:
                  toast.error('аутентификация отключена');
                  console.error(res);
                  break;
               case 404:
                  toast.error('пользователь не найден');
                  console.error(res);
                  break;
               case 409:
                  toast.error('Конфликт');
                  console.error(res);
                  break;
               case 500:
                  toast.error('Внутренняя ошибка сервера');
                  console.error(res);
                  break;
               default:
                  toast.error('Произошла ошибка');
                  console.error(res);
            }
         } else {
            const { fullName, email, password } = res.data.data;
            const token = res.data.token;

            dispatch(addCurrentUser({ fullName, email, password, token }));
            const currentUserJson = JSON.stringify({ login: fullName, email, token });
            localStorage.setItem('currentUser', currentUserJson);

            toast.success('Успешно залогинился!');
            navigate('/');
         }
      } catch (error: any) {
         switch (error.status) {
            case 401:
               toast.error('Не авторизован');
               console.error(error);
               break;
            case 403:
               toast.error('аутентификация отключена');
               console.error(error);
               break;
            case 404:
               toast.error('пользователь не найден');
               console.error(error);
               break;
            case 409:
               toast.error('Конфликт');
               console.error(error);
               break;
            case 500:
               toast.error('Внутренняя ошибка сервера');
               console.error(error);
               break;
            default:
               toast.error('Произошла ошибка');
               console.error(error);
         }
      }
   };
   return (
      <section className={styles.section}>
         <img src={mobIllustImg} alt='mobile illustartion' className={styles.mobImg} />
         <LoginForm handleLogin={handleLogin} />
      </section>
   );
};

export default Login;
