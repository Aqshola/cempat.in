import create from "zustand";

export const sideNavStore = create((set: any) => ({
  sideNav: false,
  showSideNav: (value: boolean) => set(() => ({ sideNav: value })),
}));



