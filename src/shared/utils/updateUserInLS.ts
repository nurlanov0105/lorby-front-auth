import { getUserFromLS } from './getCurrentUserFromLS';

export const updateUserInLS = (tokens: any) => {
   const { access, refresh } = tokens;
   const userData = getUserFromLS();
   const updatedUserData = {
      ...userData,
      access: access,
   };

   localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
};
