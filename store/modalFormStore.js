import { create } from 'zustand'

const useModalFormStore = create((set) => ({
  formData: null,
  setFormData: (data) => set({ formData: data }),
  sendFormData: async (data, category, subCategory) => {
    try {
      const response = await fetch(`https://tg-chat.zwei.fun/${category}/${subCategory}`, {
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
      return result;
    } catch (error) {
      console.error('Error sending form data:', error);
      throw error;
    }
  }
}))

export default useModalFormStore