import { useAppSelector } from '@/app/appStore';

export function useAuth() {
   const { email } = useAppSelector((state) => state.auth);

   return {
      isAuth: !!email,
   };
}
