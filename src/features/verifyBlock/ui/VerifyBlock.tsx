import { FC } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
   handelEmailResend: () => void;
};

const VerifyBlock: FC<Props> = ({ handelEmailResend }) => {
   // const [countdown, setCountdown] = useState(10);
   // const [isShowBtn, setIsShowBtn] = useState(false);

   const handleClick = () => {
      handelEmailResend();
   };

   // useEffect(() => {
   //    const timer = setInterval(() => {
   //       setCountdown((prevCountdown) => prevCountdown - 1);
   //    }, 1000);

   //    if (countdown === 0) {
   //       clearInterval(timer);
   //       setIsShowBtn(true);
   //    }

   //    return () => {
   //       clearInterval(timer);
   //    };
   // }, [countdown]);

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

         {/* {isShowBtn ? (
            <button
               className={classNames('btn btn--light', styles.block__btn)}
               onClick={handleClick}>
               <span>Письмо не пришло</span>
            </button>
         ) : (
            <div className={styles.block__descr}>
               <p>
                  Ты сможешь запросить письмо подвтерждения электронной почты повторно через:{' '}
                  <b>{countdown}</b>
               </p>
            </div>
         )} */}

         <button className={classNames('btn btn--light', styles.block__btn)} onClick={handleClick}>
            <span>Письмо не пришло</span>
         </button>
      </div>
   );
};

export default VerifyBlock;
