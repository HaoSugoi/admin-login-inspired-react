
import api from './api';

export const reportService = {
  // Lấy tất cả thống kê (Overview + Daily + Weekly + Monthly)
  getBookStatistics: async () => {
    try {
      const response = await api.get('/api/reports/book-statistics');
      console.log('📊 Book Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching book statistics:', error);
      throw error;
    }
  },

  // Lấy thống kê tổng quan
  getOverviewStatistics: async () => {
    try {
      const response = await api.get('/api/reports/overview-statistics');
      console.log('📈 Overview Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching overview statistics:', error);
      throw error;
    }
  },

  // Lấy thống kê hôm nay
  getDailyStatistics: async () => {
    try {
      const response = await api.get('/api/reports/daily-statistics');
      console.log('📅 Daily Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching daily statistics:', error);
      throw error;
    }
  },

  // Lấy thống kê tuần này
  getWeeklyStatistics: async () => {
    try {
      const response = await api.get('/api/reports/weekly-statistics');
      console.log('📆 Weekly Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching weekly statistics:', error);
      throw error;
    }
  },

  // Lấy thống kê tháng này
  getMonthlyStatistics: async () => {
    try {
      const response = await api.get('/api/reports/monthly-statistics');
      console.log('🗓️ Monthly Statistics Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching monthly statistics:', error);
      throw error;
    }
  }
};
