import { create } from 'zustand'

const useModalFormStore = create((set) => ({
    formData: null,
    successMessage: '',
    errorMessage: '',
    setFormData: (data) => set({ formData: data }),
    setSuccessMessage: (message) => set({ successMessage: message }),
    clearFormData: () => set({ formData: null }),
    clearMessage: () => set({ successMessage: '' }),
    setErrorMessage: (message) => set({ errorMessage: message }),
    clearErrorMessage: () => set({ errorMessage: '' }),


    sendAttributeFormData: async (data, { category, subCategory }) => {
        if (!category || !subCategory) {
            throw new Error('Missing required parameters');
          }
    try {
      const url = `https://tg-chat.zwei.fun/${category}/${subCategory}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
      
      const result = await response.json();
      set({ 
        formData: null,
        successMessage: 'Аттрибут успешно отправлен!'
      });
      return result;
    } catch (error) {
      console.error('Error sending form data:', error);
      throw error;
    }
  },

  sendOptionFormData: async (data, { category, subCategory, attributeKode }) => {
    if (!category || !subCategory || !attributeKode) {
        throw new Error('Missing required parameters');
      }
    try {
      const url = `https://tg-chat.zwei.fun/${category}/${subCategory}/attribute/${attributeKode}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
      
      const result = await response.json();
      set({ 
        formData: null,
        successMessage: 'Опция успешно отправлена!'
      });
      return result;
    } catch (error) {
      console.error('Error sending form data:', error);
      throw error;
    }
  }
}))

export default useModalFormStore