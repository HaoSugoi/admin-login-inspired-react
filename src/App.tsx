
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
import SalesOrdersManagement from './pages/SalesOrdersManagement';
import RentBooksManagement from './pages/RentBooksManagement';
import RentalOrdersManagement from './pages/RentalOrdersManagement';
import EmployeeActivitiesManagement from './pages/EmployeeActivitiesManagement';
import SlidesManagement from './pages/SlidesManagement';
import PromotionsManagement from './pages/PromotionsManagement';
import DiscountCodesManagement from './pages/DiscountCodesManagement';
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
            <Route path="/admin/rent-books" element={<ProtectedRoute><RentBooksManagement /></ProtectedRoute>} />
            <Route path="/admin/rental-orders" element={<ProtectedRoute><RentalOrdersManagement /></ProtectedRoute>} />
            <Route path="/admin/authors" element={<ProtectedRoute><AuthorsManagement /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><OrdersManagement /></ProtectedRoute>} />
            <Route path="/admin/sales-orders" element={<ProtectedRoute><SalesOrdersManagement /></ProtectedRoute>} />
            <Route path="/admin/employee-activities" element={<ProtectedRoute><EmployeeActivitiesManagement /></ProtectedRoute>} />
            <Route path="/admin/slides" element={<ProtectedRoute><SlidesManagement /></ProtectedRoute>} />
            <Route path="/admin/promotions" element={<ProtectedRoute><PromotionsManagement /></ProtectedRoute>} />
            <Route path="/admin/discount-codes" element={<ProtectedRoute><DiscountCodesManagement /></ProtectedRoute>} />
            <Route path="/admin/stats" element={<ProtectedRoute><StatsManagement /></ProtectedRoute>} />
            {/* Route NotFound để cuối */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
