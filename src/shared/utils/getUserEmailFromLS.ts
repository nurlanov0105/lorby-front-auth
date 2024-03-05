export const getUserEmailFromLS = () => {
   const data = localStorage.getItem('currentUserEmail');

   if (data) {
      const { email } = JSON.parse(data);

      return {
         email,
      };
   }

   return {
      email: null,
   };
};
