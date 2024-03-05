import { useAppDispatch } from '@/app/appStore';
import { RegisterForm, addEmail, useRegisterMutation } from '@/features/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import styles from './styles.module.scss';

const Register = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const [register, { isLoading }] = useRegisterMutation();
   const handleRegister = async (login: string, email: string, password: string) => {
      try {
         const res: any = await register({ login, email, password });

         if (res.error && res.error.data.email) {
            console.log(res.error);
            toast.error(res.error.data.email[0]);
         } else if (res.error && res.error.data.username) {
            console.log(res.error);
            toast.error(res.error.data.username[0]);
         } else if (res.error) {
            console.log(res.error);
            toast.error('Произошла ошибка при регистрации try');
         } else {
            dispatch(addEmail(res.data.email));
            const currentUserEmailJson = JSON.stringify({ email: res.data.email });
            localStorage.setItem('currentUserEmail', currentUserEmailJson);

            navigate('/verification');
         }
      } catch (error: any) {
         console.log(error);
         toast.error('Произошла ошибка при регистрации catch');
      }
   };
   return <RegisterForm handleRegister={handleRegister} isLoading={isLoading} />;
};

export default Register;
