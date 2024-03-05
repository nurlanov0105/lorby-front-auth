import { useAppDispatch, useAppSelector } from '@/app/appStore';
import styles from './styles.module.scss';
import { closeModal } from '@/widgets/modal';
import { removeUser, useLogoutMutation } from '@/features/auth';

const LogoutModal = () => {
   const dispatch = useAppDispatch();
   const refreshToken = useAppSelector((state) => state.auth.refresh);
   const [logout] = useLogoutMutation();

   const handleLogOut = async () => {
      const res = await logout({ refreshToken });

      if (res) {
         localStorage.removeItem('currentUser');
         dispatch(removeUser());
         dispatch(closeModal());
      }
   };

   const handleStay = () => {
      dispatch(closeModal());
   };

   return (
      <div className={styles.block}>
         <h4 className={styles.block__title}>Выйти?</h4>
         <h5 className={styles.block__subtitle}>Точно выйти?</h5>
         <div className={styles.block__btns}>
            <button className='btn' onClick={handleLogOut}>
               <span>Да, точно</span>
            </button>
            <button className='btn btn--light' onClick={handleStay}>
               <span>Нет, остаться</span>
            </button>
         </div>
      </div>
   );
};

export default LogoutModal;
