
import { api } from './api';

/*
HƯỚNG DẪN TÍCH HỢP API CHO EMPLOYEE SERVICE:

1. Các API endpoints cần thiết:
   - GET /api/employees - Lấy danh sách nhân viên
   - GET /api/employees/{id} - Lấy thông tin một nhân viên
   - POST /api/employees - Tạo nhân viên mới
   - PUT /api/employees/{id} - Cập nhật thông tin nhân viên
   - DELETE /api/employees/{id} - Xóa nhân viên
   - GET /api/employees/statistics - Lấy thống kê nhân viên

2. Format data mong đợi từ API:
   {
     "id": number,
     "name": string,
     "email": string,
     "phone": string,
     "position": string,
     "department": string,
     "status": "Hoạt động" | "Tạm nghỉ" | "Nghỉ việc",
     "joinDate": string (DD/MM/YYYY format),
     "salary": string | number,
     "avatar": string (URL)
   }

3. Xử lý đặc biệt cho Employee:
   - Salary có thể cần format hiển thị (thêm dấu phẩy, VND)
   - Position và Department có thể cần validate
   - Permissions/Role handling nếu có
*/

// TODO: Uncomment và implement khi có API thực tế
/*
export const getEmployees = async () => {
  try {
    const response = await api.get('/employees');
    
    console.log('Employees API Response:', response.data);
    
    const transformedData = response.data.map(employee => ({
      ...employee,
      joinDate: formatDate(employee.joinDate),
      salary: formatSalary(employee.salary)
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/employees', employeeData);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};
*/

export default {
  // getEmployees,
  // createEmployee,
  // updateEmployee,
  // deleteEmployee,
  // getEmployeesStatistics
};
