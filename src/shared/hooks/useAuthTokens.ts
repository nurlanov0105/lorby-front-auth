import { useEffect, useState } from 'react';
import { tokenRefresh, useRefreshMutation } from '@/features/auth';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { getUserFromLS } from '../utils/getCurrentUserFromLS';

const useAuthTokens = () => {
   const dispatch = useAppDispatch();
   const [refreshTokenMutation] = useRefreshMutation();

   const [isAccessTokenExpired, setIsAccessTokenExpired] = useState(false);
   const [isRefreshTokenExpired, setIsRefreshTokenExpired] = useState(false);

   const accessToken = useAppSelector((state) => state.auth.access);
   const refreshToken = useAppSelector((state) => state.auth.refresh);

   const checkTokenExpiration = (token: string, setTokenExpired: any) => {
      if (!token) {
         setTokenExpired(true);
      } else {
         const decodedToken = jwtDecode(token);
         const currentTime = Date.now() / 1000;
         if (decodedToken.exp && decodedToken.exp < currentTime) {
            setTokenExpired(true);
         } else {
            setTokenExpired(false);
         }
      }
   };

   useEffect(() => {
      checkTokenExpiration(accessToken, setIsAccessTokenExpired);
      checkTokenExpiration(refreshToken, setIsRefreshTokenExpired);

      // Refresh access token if it's expired
      if (isAccessTokenExpired && !isRefreshTokenExpired) {
         refreshTokenMutation({ refreshToken })
            .unwrap()
            .then((res: any) => {
               if (res) {
                  dispatch(tokenRefresh({ accessToken: res.access, refreshToken: res.refresh }));

                  const data = getUserFromLS();
                  if (data) {
                     data.access = res.access;
                     data.refresh = res.refresh;
                     localStorage.setItem('currentUser', JSON.stringify(data));
                  }

                  setIsAccessTokenExpired(false);
                  console.log(res);
               }
            })
            .catch((error: any) => {
               console.error(error);
            });
      }

      const intervalId = setInterval(() => {
         checkTokenExpiration(accessToken, setIsAccessTokenExpired);
         checkTokenExpiration(refreshToken, setIsRefreshTokenExpired);
      }, 10 * 60 * 1000);

      return () => clearInterval(intervalId);
   }, [refreshTokenMutation]);

   return { isRefreshTokenExpired };
};

export default useAuthTokens;
