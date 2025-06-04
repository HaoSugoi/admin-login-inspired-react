
import React from 'react';
import AdminTopbar from './AdminTopbar';
import RolesListSection from './sections/RolesListSection';

const RolesManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Vai Trò</h4>
          </div>
        </div>

        <div className="row">
          <RolesListSection 
            roles={props.roles}
            onAdd={props.addRole}
            onUpdate={props.updateRole}
            onDelete={props.deleteRole}
          />
        </div>
      </div>
    </div>
  );
};

export default RolesManagementContent;
