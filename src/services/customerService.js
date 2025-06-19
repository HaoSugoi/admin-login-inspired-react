
import { api } from './api';

/*
HƯỚNG DẪN TÍCH HỢP API CHO CUSTOMER SERVICE:

1. Các API endpoints cần thiết:
   - GET /api/customers - Lấy danh sách khách hàng
   - GET /api/customers/{id} - Lấy thông tin một khách hàng
   - POST /api/customers - Tạo khách hàng mới
   - PUT /api/customers/{id} - Cập nhật thông tin khách hàng
   - DELETE /api/customers/{id} - Xóa khách hàng
   - GET /api/customers/statistics - Lấy thống kê khách hàng

2. Format data mong đợi từ API:
   {
     "id": number,
     "name": string,
     "email": string,
     "phone": string,
     "address": string,
     "status": "Hoạt động" | "Tạm khóa" | "Đã khóa",
     "joinDate": string (DD/MM/YYYY format),
     "avatar": string (URL)
   }

3. Khi nhận được data từ API, kiểm tra:
   - Response status (200, 201, 400, 401, 404, 500...)
   - Data structure có đúng như mong đợi không
   - Cần transform data không (ví dụ: convert date format)
   - Error handling cho từng trường hợp
*/

// TODO: Uncomment và implement khi có API thực tế
/*
export const getCustomers = async () => {
  try {
    const response = await api.get('/customers');
    
    // Log để debug data structure
    console.log('Customers API Response:', response.data);
    
    // Transform data nếu cần
    const transformedData = response.data.map(customer => ({
      ...customer,
      // Ví dụ transform date format nếu cần
      joinDate: formatDate(customer.joinDate)
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomer = async (id) => {
  try {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await api.post('/customers', customerData);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await api.put(`/customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    await api.delete(`/customers/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export const getCustomersStatistics = async () => {
  try {
    const response = await api.get('/customers/statistics');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers statistics:', error);
    throw error;
  }
};
*/

// Helper function để format date
const formatDate = (dateString) => {
  // Implement logic để convert từ format API về format hiển thị
  // Ví dụ: từ "2024-11-15" thành "15/11/2024"
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

export default {
  // getCustomers,
  // getCustomer,
  // createCustomer,
  // updateCustomer,
  // deleteCustomer,
  // getCustomersStatistics
};
