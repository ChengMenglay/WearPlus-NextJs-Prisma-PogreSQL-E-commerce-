import { create } from "zustand";

interface Sheet {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useOpenSheet = create<Sheet>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useOpenSheet;
