import styles from './styles.module.scss';
import personImg from '@/shared/assets/imgs/header/person.png';

const Header = () => {
   return (
      <header className={styles.header}>
         <div className='container'>
            <div className={styles.row}>
               <div className={styles.info}>
                  <h1>Winter Vacation Trips</h1>
                  <p>
                     Enjoy your winter vacations with warmth and amazing sightseeing on the
                     mountains. Enjoy the best experience with us!
                  </p>
                  <a href='#' className='btn btn--arrow'>
                     <span>Let’s Go!</span>
                     <svg viewBox='0 0 49 16' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M48.7071 8.70711C49.0976 8.31658 49.0976 7.68342 48.7071 7.29289L42.3431 0.928932C41.9526 0.538408 41.3195 0.538408 40.9289 0.928932C40.5384 1.31946 40.5384 1.95262 40.9289 2.34315L46.5858 8L40.9289 13.6569C40.5384 14.0474 40.5384 14.6805 40.9289 15.0711C41.3195 15.4616 41.9526 15.4616 42.3431 15.0711L48.7071 8.70711ZM0 9H48V7H0V9Z' />
                     </svg>
                  </a>
               </div>
               <div className={styles.img}>
                  <img src={personImg} alt='person img' />
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
