
import React from 'react';
import { useSlideManagement } from '../hooks/useSlideManagement';
import AdminSidebar from '../components/admin/AdminSidebar';
import SlidesManagementContent from '../components/admin/SlidesManagementContent';
import AddEditSlideDialog from '../components/admin/dialogs/AddEditSlideDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import '../styles/AdminIndex.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SlidesManagement = () => {
  const slideData = useSlideManagement();

  return (
    <div className="admin-index-container">
      <div className="row g-0">
        <AdminSidebar {...slideData} />
        <SlidesManagementContent {...slideData} />
      </div>

      {/* Add Slide Dialog */}
      <AddEditSlideDialog
        isOpen={slideData.showAddDialog}
        onClose={() => slideData.setShowAddDialog(false)}
        onSubmit={slideData.handleAddSlide}
        isEdit={false}
      />

      {/* Edit Slide Dialog */}
      <AddEditSlideDialog
        isOpen={slideData.showEditDialog}
        onClose={() => {
          slideData.setShowEditDialog(false);
          slideData.setSelectedSlide(null);
        }}
        onSubmit={slideData.handleEditSlide}
        slide={slideData.selectedSlide}
        isEdit={true}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={slideData.showDeleteDialog} 
        onOpenChange={slideData.setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa slide</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa slide này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              slideData.setShowDeleteDialog(false);
              slideData.setSelectedSlide(null);
            }}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={slideData.handleDeleteSlide}>
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SlidesManagement;
