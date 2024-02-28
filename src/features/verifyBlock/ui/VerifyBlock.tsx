import { FC } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';

const VerifyBlock: FC = () => {
   const dispatch = useAppDispatch();
   const handleClick = () => {
      dispatch(showModal('EmailNoticeModal'));
   };

   return (
      <div className={styles.block}>
         <h4 className={styles.block__title}>
            Выслали письмо со ссылкой для завершения регистрации на example@gmail.com
         </h4>
         <div className={styles.block__descr}>
            <p>
               Если письмо не пришло, не спеши ждать совиную почту - лучше
               <b> проверь ящик “Спам”</b>
            </p>
            <p className={styles.block__smile}>(´｡• ω •｡`)</p>
         </div>
         <button className={classNames('btn btn--light', styles.block__btn)} onClick={handleClick}>
            <span>Письмо не пришло</span>
         </button>
      </div>
   );
};

export default VerifyBlock;
