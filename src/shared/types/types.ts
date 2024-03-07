export type ErrorCodeType = {
   [key: number]: string;
   401: string;
   403: string;
   404: string;
   409: string;
   500: string;
};

export type TokensType = {
   access: string;
   refresh: string;
};
