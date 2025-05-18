import { create } from "zustand";

interface MobileNavSheet {
isOpen:boolean;
onOpen:()=>void;
onClose:()=>void;
}

const useMobileNavSheet = create<MobileNavSheet>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useMobileNavSheet;