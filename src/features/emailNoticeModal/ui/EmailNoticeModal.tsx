import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { closeModal } from '@/widgets/modal';

const EmailNoticeModal = () => {
   const dispatch = useAppDispatch();
   const email = useAppSelector((state) => state.auth.email);

   const handleClick = () => {
      dispatch(closeModal());
   };
   return (
      <div className={styles.block}>
         <h3 className={styles.block__title}>
            Мы выслали еще одно письмо на указанную тобой почту <span>{email ? email : null}</span>
         </h3>
         <p className={styles.block__descr}>Не забудь проверить ящик “Спам”!11!!!!</p>
         <button className={'btn'} onClick={handleClick}>
            <span>Понятно!!1!</span>
         </button>
      </div>
   );
};

export default EmailNoticeModal;
