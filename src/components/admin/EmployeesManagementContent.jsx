
import React, { useState, useEffect, useRef } from 'react';
import AdminTopbar from './AdminTopbar';
import EmployeesListSection from './sections/EmployeesListSection';
import EmployeeStatisticsSection from './sections/EmployeeStatisticsSection';
import { userService } from '../../../src/services/employeeService';
const EmployeesManagementContent = (props) => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await userService.getAllUsers();
    setEmployees(res);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const createEmployee = async (newEmployee) => {
    await userService.createUser(newEmployee);
    await fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await userService.deleteUser(id);
    await fetchEmployees();
  };
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />

      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Nhân Viên</h4>
          </div>
        </div>

        {/* <div className="row">
          <EmployeeStatisticsSection statistics={props.statistics} />
        </div> */}

        <div className="row">
        <EmployeesListSection
  employees={employees}
  onAdd={createEmployee}
  onUpdate={fetchEmployees}
  onDelete={deleteEmployee}
/>

        </div>
      </div>
    </div>
  );
};

export default EmployeesManagementContent;
