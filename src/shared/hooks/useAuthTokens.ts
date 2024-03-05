import { useEffect, useState } from 'react';
import { useRefreshMutation } from '@/features/auth';
import { jwtDecode } from 'jwt-decode';
import { useAppSelector } from '@/app/appStore';

const useAuthTokens = () => {
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
         refreshTokenMutation({})
            .unwrap()
            .then((res: any) => {
               if (res) {
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
