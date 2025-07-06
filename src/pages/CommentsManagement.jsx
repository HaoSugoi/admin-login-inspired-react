
import React from 'react';
import { useCommentsManagement } from '../hooks/useCommentsManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import CommentsManagementContent from '../components/admin/CommentsManagementContent';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentsManagement = () => {
  const commentsData = useCommentsManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...commentsData} />
        <CommentsManagementContent {...commentsData} />
      </div>
    </div>
  );
};

export default CommentsManagement;
