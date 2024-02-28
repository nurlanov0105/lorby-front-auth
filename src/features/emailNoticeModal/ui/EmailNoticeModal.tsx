import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/appStore';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '@/widgets/modal';

const EmailNoticeModal = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleClick = () => {
      dispatch(closeModal());
   };
   return (
      <div className={styles.block}>
         <h3 className={styles.block__title}>
            Мы выслали еще одно письмо на указанную тобой почту example@gmail.com
         </h3>
         <p className={styles.block__descr}>Не забудь проверить ящик “Спам”!11!!!!</p>
         <button className={'btn'} onClick={handleClick}>
            <span>Понятно!!1!</span>
         </button>
      </div>
   );
};

export default EmailNoticeModal;
