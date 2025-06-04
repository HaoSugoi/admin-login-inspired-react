
import { useState } from 'react';

export const useShippingManagement = () => {
  const [activeSection, setActiveSection] = useState('shipping');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [shipments, setShipments] = useState([
    {
      id: 1,
      orderId: "DH001",
      customerName: "Nguyễn Văn A",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      status: "Đang giao",
      shippingDate: "02/12/2024",
      estimatedDelivery: "05/12/2024"
    },
    {
      id: 2,
      orderId: "DH002",
      customerName: "Trần Thị B",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      status: "Đã giao",
      shippingDate: "01/12/2024",
      estimatedDelivery: "03/12/2024"
    }
  ]);

  const [statistics] = useState({
    totalShipments: 156,
    pendingShipments: 23,
    inTransitShipments: 45,
    deliveredShipments: 88
  });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const updateShipmentStatus = (shipmentId, newStatus) => {
    setShipments(shipments.map(shipment => 
      shipment.id === shipmentId ? { ...shipment, status: newStatus } : shipment
    ));
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    shipments,
    statistics,
    updateShipmentStatus,
    handleLogout
  };
};
