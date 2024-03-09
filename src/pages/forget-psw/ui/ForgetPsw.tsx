import { ForgetPasswordForm, addEmail, useEmailSendMutation } from '@/features/auth';
import { showModal } from '@/widgets/modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ForgetPsw = () => {
   const dispatch = useDispatch();
   const [sendEmail, { isLoading }] = useEmailSendMutation();

   const handleEmailSend = async (email: string) => {
      try {
         console.log(email);
         const res: any = await sendEmail({ email });

         console.log(res);
         if (res.error && res.error.status === 400) {
            toast.error('Аккаунта с такой почтой не существует');
         } else if (res.error) {
            toast.error('Произошла ошибка');
            console.log(res.error);
         } else {
            console.log(res);
            dispatch(addEmail(email));
            dispatch(showModal('EmailNoticeModal'));
         }
      } catch (error) {
         console.log(error);
      }
   };

   return <ForgetPasswordForm handleData={handleEmailSend} type='email' isLoading={isLoading} />;
};

export default ForgetPsw;
