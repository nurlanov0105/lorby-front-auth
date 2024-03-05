export const getUserFromLS = () => {
   const data = localStorage.getItem('currentUser');

   if (data) {
      const { refresh, access, user_info } = JSON.parse(data);

      return {
         refresh,
         access,
         user_info,
      };
   }

   return {
      refresh: null,
      access: null,
      user_info: null,
   };
};
