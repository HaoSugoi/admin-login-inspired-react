import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import Index from './pages/Index';
import AdminDashboard from './pages/AdminDashboard';
import BooksManagement from './pages/BooksManagement';
import AuthorsManagement from './pages/AuthorsManagement';
import CustomersManagement from './pages/CustomersManagement';
import EmployeesManagement from './pages/EmployeesManagement';
import OrdersManagement from './pages/OrdersManagement';
import RentalManagement from './pages/RentalManagement';
import PromotionsManagement from './pages/PromotionsManagement';
import DiscountCodesManagement from './pages/DiscountCodesManagement';
import ShippingManagement from './pages/ShippingManagement';
import UsersManagement from './pages/UsersManagement';
import RolesManagement from './pages/RolesManagement';
import ReportsManagement from './pages/ReportsManagement';
import StatsManagement from './pages/StatsManagement';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Khởi tạo QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
             <Route path="/admin/customers" element={<ProtectedRoute><CustomersManagement /></ProtectedRoute>} />
            <Route path="/admin/employees" element={<ProtectedRoute><EmployeesManagement /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute><ReportsManagement /></ProtectedRoute>} />
            <Route path="/admin/books" element={<ProtectedRoute><BooksManagement /></ProtectedRoute>} />
            <Route path="/admin/rentals" element={<ProtectedRoute><RentalManagement /></ProtectedRoute>} />
            <Route path="/admin/authors" element={<ProtectedRoute><AuthorsManagement /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><OrdersManagement /></ProtectedRoute>} />
            <Route path="/admin/promotions" element={<ProtectedRoute><PromotionsManagement /></ProtectedRoute>} />
            <Route path="/admin/discount-codes" element={<ProtectedRoute><DiscountCodesManagement /></ProtectedRoute>} />
            {/* <Route path="/admin/shipping" element={<ProtectedRoute><ShippingManagement /></ProtectedRoute>} /> */}
            {/* <Route path="/admin/users" element={<ProtectedRoute><UsersManagement /></ProtectedRoute>} /> */}
            {/* <Route path="/admin/roles" element={<ProtectedRoute><RolesManagement /></ProtectedRoute>} /> */}
            {/* <Route path="/admin/stats" element={<ProtectedRoute><StatsManagement /></ProtectedRoute>} /> */}
            {/* Route NotFound để cuối */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
