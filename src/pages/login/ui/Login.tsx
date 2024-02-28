import { LoginForm } from '@/features/auth';
import styles from './styles.module.scss';
import mobIllustImg from '@/shared/assets/imgs/auth/mobile-illustration.png';

const Login = () => {
   return (
      <section className={styles.section}>
         <img src={mobIllustImg} alt='mobile illustartion' />
         <LoginForm />
      </section>
   );
};

export default Login;
