
import React from 'react';
import AdminTopbar from './AdminTopbar';
import EmployeesListSection from './sections/EmployeesListSection';
import EmployeeStatisticsSection from './sections/EmployeeStatisticsSection';

const EmployeesManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Nhân Viên</h4>
          </div>
        </div>

        <div className="row">
          <EmployeeStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <EmployeesListSection 
            employees={props.employees}
            onAdd={props.addEmployee}
            onUpdate={props.updateEmployee}
            onDelete={props.deleteEmployee}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeesManagementContent;
