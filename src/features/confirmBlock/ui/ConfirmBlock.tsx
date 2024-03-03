import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const ConfirmBlock = () => {
   const [countdown, setCountdown] = useState(10);
   const navigate = useNavigate();

   useEffect(() => {
      const timer = setInterval(() => {
         setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
         clearInterval(timer);
         navigate('/login');
      }

      return () => {
         clearInterval(timer);
      };
   }, [countdown]);
   return (
      <div className={styles.confirm}>
         <h2 className={styles.confirm__title}>Подтверждение аккаунта прошло успешно!</h2>
         <div className={styles.confirm__block}>
            Через <b>{countdown}</b> секунд вас перенест на главную страницу.
         </div>
      </div>
   );
};

export default ConfirmBlock;
