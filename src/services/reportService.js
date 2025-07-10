
import api from './api';

export const reportService = {
  // ===== 1. Tổng quan =====
  getOverviewStatistics: async () => {
    try {
      const response = await api.get('/api/Report');
      console.log('📊 Overview Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching overview statistics:', error);
      throw error;
    }
  },

  // ===== 2. Thống kê Sale Book =====
  // Theo ngày
  getDailySaleStatistics: async () => {
    try {
      const response = await api.get('/api/Report/sale/daily');
      console.log('📅 Daily Sale Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching daily sale statistics:', error);
      throw error;
    }
  },

  // Set ngày cho daily sale
  setDailySaleDate: async (date) => {
    try {
      const response = await api.post('/api/Report/sale/daily/set-date', { date });
      console.log('📅 Set Daily Sale Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting daily sale date:', error);
      throw error;
    }
  },

  // Theo tháng
  getMonthlySaleStatistics: async () => {
    try {
      const response = await api.get('/api/Report/sale/monthly');
      console.log('🗓️ Monthly Sale Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching monthly sale statistics:', error);
      throw error;
    }
  },

  // Set tháng cho monthly sale
  setMonthlySaleDate: async (year, month) => {
    try {
      const response = await api.post('/api/Report/sale/monthly/set-date', { year, month });
      console.log('🗓️ Set Monthly Sale Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting monthly sale date:', error);
      throw error;
    }
  },

  // Theo năm
  getYearlySaleStatistics: async () => {
    try {
      const response = await api.get('/api/Report/sale/yearly');
      console.log('📆 Yearly Sale Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching yearly sale statistics:', error);
      throw error;
    }
  },

  // Set năm cho yearly sale
  setYearlySaleDate: async (year) => {
    try {
      const response = await api.post('/api/Report/sale/yearly/set-date', { year });
      console.log('📆 Set Yearly Sale Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting yearly sale date:', error);
      throw error;
    }
  },

  // ===== 3. Thống kê Rent Book =====
  // Theo ngày
  getDailyRentStatistics: async () => {
    try {
      const response = await api.get('/api/Report/rent/daily');
      console.log('📅 Daily Rent Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching daily rent statistics:', error);
      throw error;
    }
  },

  // Set ngày cho daily rent
  setDailyRentDate: async (date) => {
    try {
      const response = await api.post('/api/Report/rent/daily/set-date', { date });
      console.log('📅 Set Daily Rent Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting daily rent date:', error);
      throw error;
    }
  },

  // Theo tháng
  getMonthlyRentStatistics: async () => {
    try {
      const response = await api.get('/api/Report/rent/monthly');
      console.log('🗓️ Monthly Rent Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching monthly rent statistics:', error);
      throw error;
    }
  },

  // Set tháng cho monthly rent
  setMonthlyRentDate: async (year, month) => {
    try {
      const response = await api.post('/api/Report/rent/monthly/set-date', { year, month });
      console.log('🗓️ Set Monthly Rent Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting monthly rent date:', error);
      throw error;
    }
  },

  // Theo năm
  getYearlyRentStatistics: async () => {
    try {
      const response = await api.get('/api/Report/rent/yearly');
      console.log('📆 Yearly Rent Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching yearly rent statistics:', error);
      throw error;
    }
  },

  // Set năm cho yearly rent
  setYearlyRentDate: async (year) => {
    try {
      const response = await api.post('/api/Report/rent/yearly/set-date', { year });
      console.log('📆 Set Yearly Rent Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting yearly rent date:', error);
      throw error;
    }
  }
};
