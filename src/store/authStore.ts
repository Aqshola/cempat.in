import { UserData } from "types/types";
import create from "zustand";




interface AuthStore {
  isAuth:boolean,
  authData:UserData | null,
  authLoading:boolean,
  setAuthStatus:(value:boolean, authData:UserData|null)=>void,
}

export const authStore = create<AuthStore>((set: any) => ({
  isAuth: false,
  authData: null,
  authLoading: false,
  setAuthStatus: (value: boolean, authData: UserData | null) =>
    set(() => {
      return {
        authData,
        isAuth: value,
        authloading: false,
      };
    }),
}));
