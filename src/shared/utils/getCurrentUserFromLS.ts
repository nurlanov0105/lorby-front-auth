export const getUserFromLS = () => {
   const data = localStorage.getItem('currentUser');

   if (data) {
      const { login, email, token } = JSON.parse(data);

      return {
         login,
         email,
         token,
      };
   }

   return {
      login: null,
      email: null,
      token: null,
   };
};
