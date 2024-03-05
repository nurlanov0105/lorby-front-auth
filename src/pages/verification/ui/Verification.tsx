import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { useResendEmailMutation } from '@/features/auth';
import { VerifyBlock } from '@/features/verifyBlock';
import { showModal } from '@/widgets/modal';
import { toast } from 'react-toastify';

const Verification = () => {
   const dispatch = useAppDispatch();
   const email = useAppSelector((state) => state.auth.email);
   const [resendEmail] = useResendEmailMutation();

   const handelEmailResend = async () => {
      try {
         const res: any = await resendEmail({ email });
         if (res.error) {
            console.log('Email - ', email);
            console.error(res.error);
            toast.error('Произошла ошибка отправке письма try');
         } else {
            console.log('Email - ', email);
            console.log(res);
            dispatch(showModal('EmailNoticeModal'));
         }
      } catch (error) {
         console.error(error);
         toast.error('Произошла ошибка отправке письма catch');
      }
   };

   return (
      <>
         <VerifyBlock handelEmailResend={handelEmailResend} />
      </>
   );
};

export default Verification;
