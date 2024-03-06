import { useAppDispatch } from '@/app/appStore';
import styles from './styles.module.scss';
import { closeModal } from '@/widgets/modal';
import { removeUser } from '@/features/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DeleteModal = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   // const refresh = useAppSelector((state) => state.auth.refresh);

   const handleDelete = () => {
      // try {
      //    const res: any = await logout({ refresh });
      //    if (res.error) {
      //       console.log(res.errror);
      //       toast.error('Произошла ошибка при выходе');
      //    } else {
      //       localStorage.removeItem('currentUser');
      //       dispatch(removeUser());
      //       dispatch(closeModal());
      //       navigate('/login');
      //       toast.success('Ты вышел из аккаунта');
      //    }
      // } catch (error: any) {
      //    console.log(error);
      //    toast.error('Произошла ошибка при выходе');
      // }
      localStorage.removeItem('currentUser');
      dispatch(removeUser());
      dispatch(closeModal());
      navigate('/login');
      toast.success('Ты удалил аккаунт');
   };

   const handleStay = () => {
      dispatch(closeModal());
   };

   return (
      <div className={styles.block}>
         <h4 className={styles.block__title}>Удалить?</h4>
         <h5 className={styles.block__subtitle}>Точно удалить?</h5>
         <div className={styles.block__btns}>
            <button className='btn' onClick={handleDelete}>
               <span>Да, точно</span>
            </button>
            <button className='btn btn--light' onClick={handleStay}>
               <span>Нет, остаться</span>
            </button>
         </div>
      </div>
   );
};

export default DeleteModal;
