import { FC } from 'react';
import styles from './styles.module.scss';
import authImage from '@/shared/assets/imgs/auth/illustration.png';

const AuthIntro: FC = () => {
   return (
      <div className={styles.block}>
         <img src={authImage} alt='auth image' className={styles.block__img} />
         <div className={styles.block__col}>
            <h2 className={styles.block__title}>Lorby </h2>
            <p className={styles.block__descr}>Твой личный репетитор</p>
         </div>
      </div>
   );
};

export default AuthIntro;
