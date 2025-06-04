
import React from 'react';
import AdminTopbar from './AdminTopbar';
import UsersListSection from './sections/UsersListSection';
import UserStatisticsSection from './sections/UserStatisticsSection';

const UsersManagementContent = (props) => {
  return (
    <div className="col-md-9 col-lg-10 main-content">
      <AdminTopbar {...props} />
      
      <div className="content-section">
        <div className="row">
          <div className="col-12 mb-4">
            <h4 className="text-success fw-bold">Quản Lý Người Dùng</h4>
          </div>
        </div>

        <div className="row">
          <UserStatisticsSection statistics={props.statistics} />
        </div>

        <div className="row">
          <UsersListSection 
            users={props.users}
            onAdd={props.addUser}
            onUpdate={props.updateUser}
            onDelete={props.deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersManagementContent;
