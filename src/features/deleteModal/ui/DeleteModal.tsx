import { useAppDispatch, useAppSelector } from '@/app/appStore';
import styles from './styles.module.scss';
import { closeModal } from '@/widgets/modal';
import { removeUser, useDeleteMutation } from '@/features/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DeleteModal = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const refresh = useAppSelector((state) => state.auth.refresh);
   const [deleteAccount, { isLoading }] = useDeleteMutation();

   const handleDelete = async () => {
      try {
         const res: any = await deleteAccount({ refresh_token: refresh });
         if (res.error) {
            console.log(res.errror);
            toast.error('Произошла ошибка при выходе');
         } else {
            localStorage.removeItem('currentUser');
            dispatch(removeUser());
            dispatch(closeModal());
            navigate('/login');
            toast.success('Аккаунт успешно удален!');
         }
      } catch (error: any) {
         console.log(error);
         toast.error('Произошла ошибка при выходе');
      }
   };

   const handleStay = () => {
      dispatch(closeModal());
   };

   return (
      <div className={styles.block}>
         <h4 className={styles.block__title}>Удалить?</h4>
         <h5 className={styles.block__subtitle}>Точно удалить?</h5>
         <div className={styles.block__btns}>
            <button className='btn' onClick={handleDelete} disabled={isLoading}>
               {isLoading ? <span>Загрузка...</span> : <span>Да, точно</span>}
            </button>
            <button className='btn btn--light' onClick={handleStay} disabled={isLoading}>
               <span>Нет, остаться</span>
            </button>
         </div>
      </div>
   );
};

export default DeleteModal;
