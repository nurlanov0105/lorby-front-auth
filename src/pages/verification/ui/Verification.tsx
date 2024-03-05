import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { useResendEmailMutation } from '@/features/auth';
import { VerifyBlock } from '@/features/verifyBlock';
import { showModal } from '@/widgets/modal';

const Verification = () => {
   const dispatch = useAppDispatch();
   const email = useAppSelector((state) => state.auth.email);
   const [resendEmail] = useResendEmailMutation();

   const handelEmailResend = async () => {
      const res = await resendEmail({ email });
      if (res) {
         dispatch(showModal('EmailNoticeModal'));
      }
   };

   return (
      <>
         <VerifyBlock handelEmailResend={handelEmailResend} />
      </>
   );
};

export default Verification;
