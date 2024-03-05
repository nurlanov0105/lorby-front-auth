import styles from './styles.module.scss';
import classNames from 'classnames';
import illustrationImg from '@/shared/assets/imgs/auth/illustration.png';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { Link } from 'react-router-dom';

const Main = () => {
   const dispatch = useAppDispatch();

   const handleClick = () => {
      dispatch(showModal('LogoutModal'));
   };

   return (
      <main className={classNames('container', styles.main)}>
         <section className={styles.section}>
            <h2 className={classNames('h3', styles.section__title)}>Добро пожаловать!</h2>
            <h5 className={classNames('h5', styles.section__subtitle)}>
               Lorby - твой личный репетитор
            </h5>
            <img src={illustrationImg} alt='illustration img' className={styles.section__img} />
            <button
               className={classNames('btn btn--light', styles.section__btn)}
               onClick={handleClick}>
               <span>Выйти</span>
            </button>
            <Link
               to='/reset-password'
               className={classNames('btn btn--light', styles.section__btn)}>
               <span>Сбросс пароля</span>
            </Link>
         </section>
      </main>
   );
};

export default Main;
