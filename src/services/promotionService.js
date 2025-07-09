
// Temporary promotion service to fix build error
export const promotionService = {
  getAllPromotions: async () => {
    return [];
  },
  
  createPromotion: async (data) => {
    return data;
  },
  
  updatePromotion: async (id, data) => {
    return data;
  },
  
  deletePromotion: async (id) => {
    return true;
  }
};
