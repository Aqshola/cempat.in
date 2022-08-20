import create from "zustand";

export const sideNavStore = create((set: any) => ({
  sideNav: false,
  mobileNavTitle:"",
  showSideNav: (value: boolean) => set(() => ({ sideNav: value })),
  timelineAction:()=>{},
  setTimelineAction:(value: ({...props}:any)=>any) => set(() => ({ timelineAction: value })),
  setMobileNavTitle:(value: string) => set(() => ({ mobileNavTitle: value })),
}));



