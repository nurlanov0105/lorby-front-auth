import { RegisterForm, useRegisterMutation } from '@/features/auth';
import { errorMessages } from '@/shared/api/errorMessages';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import styles from './styles.module.scss';

const Register = () => {
   const navigate = useNavigate();

   const [register, { isLoading }] = useRegisterMutation();
   const handleRegister = async (login: string, email: string, password: string) => {
      try {
         const res: any = await register({ login, email, password });

         if (res) {
            navigate('/verification');
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
   return <RegisterForm handleRegister={handleRegister} isLoading={isLoading} />;
};

export default Register;
