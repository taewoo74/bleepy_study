import { create } from 'zustand';

interface popupDataType {
  title: string;
  text: string;
  button: string;
  type: string;
  popupState: boolean;
}

interface popupType {
  popupData: popupDataType;
  setState: (newState: popupDataType) => void;
}

const popupStore = create<popupType>((set) => ({
  popupData: { title: '', text: '', button: '', type: '', popupState: false },
  setState: (newState) => set({ popupData: newState }),
}));

export default popupStore;
