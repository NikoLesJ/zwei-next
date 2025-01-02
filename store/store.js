import { create } from 'zustand';

const useStore = create((set) => ({
  category: '',
  subCategory: '',
  setCategory: (category) => set({ category }),
  setSubCategory: (subCategory) => set({ subCategory }),
  resetState: () => set({ category: null, subCategory: null }),

  attributNames: [],
  optionNames: [],
  attributeKode: '',
  setAttributNames: (attributNames) => set({ attributNames }),
  setOptionNames: (optionNames) => set({ optionNames }),
  setAttributeKode: (attributeKode) => set({ attributeKode }),
  resetAttributeKode: () => set({ attributeKode: null })
}));

export default useStore;
