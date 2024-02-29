import { RegisterForm } from '@/features/auth';
import { useRegisterMutation } from '@/features/auth/api/authApi';
import { useNavigate } from 'react-router-dom';
// import styles from './styles.module.scss';

const Register = () => {
   const navigate = useNavigate();

   const [register] = useRegisterMutation();
   const handleRegister = async (login: string, email: string, password: string) => {
      try {
         const res = await register({ login, email, password });

         if (res) {
            navigate('/verification');
         }
      } catch (error) {
         alert('Registration error');
         console.log(error);
      }
   };
   return <RegisterForm handleRegister={handleRegister} />;
};

export default Register;
