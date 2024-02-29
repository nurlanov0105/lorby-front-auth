import { useAppSelector } from '@/app/appStore';

export function useAuth() {
   const { token } = useAppSelector((state) => state.auth);

   return {
      isAuth: !!token,
   };
}
