import { useEmailVerifyMutation } from '@/features/auth';
import { ConfirmBlock } from '@/features/confirmBlock';
import { errorMessages } from '@/shared/api/errorMessages';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import styles from './styles.module.scss';

const Confirm = () => {
   const [searchParams] = useSearchParams();
   const [emailVerify, { isLoading, isSuccess, error }] = useEmailVerifyMutation();

   const handleConfirm = async (token: string) => {
      try {
         const response: any = await emailVerify({ token });
         if (response.error) {
            console.log(response.error);
         } else {
            console.log(response);
         }
      } catch (error: any) {
         const message = errorMessages[error.status as keyof typeof errorMessages];
         if (message) {
            toast.error(message);
         } else {
            toast.error('Произошла ошибка верификации');
         }
      }
   };

   useEffect(() => {
      const token = searchParams.get('token');
      if (token) {
         console.log(token);
         handleConfirm(token);
      }
   }, []);
   return <ConfirmBlock isLoading={isLoading} error={error} isSuccess={isSuccess} />;
};

export default Confirm;
