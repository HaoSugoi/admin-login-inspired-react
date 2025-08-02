
import apiClient from './api';

// Service cho quản lý báo cáo thống kê
export const reportService = {
  // ===== 1. Tổng quan - GET /api/Report =====
  getOverviewStatistics: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Report');
      console.log('📊 Overview Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching overview statistics:', error);
      throw error;
    }
  },

  // ===== 2. Sale Statistics =====
  // GET /api/Report/sale/daily
  getDailySaleStatistics: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Report/sale/daily');
      console.log('📅 Daily Sale Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching daily sale statistics:', error);
      throw error;
    }
  },

  // POST /api/Report/sale/daily/set-date
  setDailySaleDate: async (date) => {
    try {
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Report/sale/daily/set-date', { date });
      console.log('📅 Set Daily Sale Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting daily sale date:', error);
      throw error;
    }
  },

  // GET /api/Report/sale/monthly
  getMonthlySaleStatistics: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Report/sale/monthly');
      console.log('🗓️ Monthly Sale Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching monthly sale statistics:', error);
      throw error;
    }
  },

  // POST /api/Report/sale/monthly/set-date
  setMonthlySaleDate: async (year, month) => {
    try {
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Report/sale/monthly/set-date', { year, month });
      console.log('🗓️ Set Monthly Sale Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting monthly sale date:', error);
      throw error;
    }
  },

  // GET /api/Report/sale/yearly
  getYearlySaleStatistics: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Report/sale/yearly');
      console.log('📆 Yearly Sale Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching yearly sale statistics:', error);
      throw error;
    }
  },

  // POST /api/Report/sale/yearly/set-date
  setYearlySaleDate: async (year) => {
    try {
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Report/sale/yearly/set-date', { year });
      console.log('📆 Set Yearly Sale Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting yearly sale date:', error);
      throw error;
    }
  },

  // ===== 3. Rent Statistics =====
  // GET /api/Report/rent/daily
  getDailyRentStatistics: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Report/rent/daily');
      console.log('📅 Daily Rent Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching daily rent statistics:', error);
      throw error;
    }
  },

  // POST /api/Report/rent/daily/set-date
  setDailyRentDate: async (date) => {
    try {
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Report/rent/daily/set-date', { date });
      console.log('📅 Set Daily Rent Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting daily rent date:', error);
      throw error;
    }
  },

  // GET /api/Report/rent/monthly
  getMonthlyRentStatistics: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Report/rent/monthly');
      console.log('🗓️ Monthly Rent Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching monthly rent statistics:', error);
      throw error;
    }
  },

  // POST /api/Report/rent/monthly/set-date
  setMonthlyRentDate: async (year, month) => {
    try {
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Report/rent/monthly/set-date', { year, month });
      console.log('🗓️ Set Monthly Rent Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting monthly rent date:', error);
      throw error;
    }
  },

  // GET /api/Report/rent/yearly
  getYearlyRentStatistics: async () => {
    try {
      const response = await apiClient.get('https://chosachonline-datn.onrender.com/api/Report/rent/yearly');
      console.log('📆 Yearly Rent Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching yearly rent statistics:', error);
      throw error;
    }
  },

  // POST /api/Report/rent/yearly/set-date
  setYearlyRentDate: async (year) => {
    try {
      const response = await apiClient.post('https://chosachonline-datn.onrender.com/api/Report/rent/yearly/set-date', { year });
      console.log('📆 Set Yearly Rent Date Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting yearly rent date:', error);
      throw error;
    }
  }
};

export default reportService;
