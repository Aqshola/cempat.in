import { UserData } from "types/types";
import create from "zustand";

export const authStore = create((set: any) => ({
  isAuth: false,
  authData: null,
  authLoading: true,
  setAuthStatus: (value: boolean, authData: UserData | null) =>
    set(() => {
      return {
        authData,
        isAuth: value,
        authloading: false,
      };
    }),
}));
