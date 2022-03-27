import create from "zustand";

export const authStore = create((set: any) => ({
  isAuth: false,
  authLoading:true,
  setAuthStatus: (value: boolean) => set(() => ({ isAuth: value })),

}));



