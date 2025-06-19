
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import BooksManagement from "./pages/BooksManagement";
import RentalManagement from "./pages/RentalManagement";
import AuthorsManagement from "./pages/AuthorsManagement";
import OrdersManagement from "./pages/OrdersManagement";
import CustomersManagement from "./pages/CustomersManagement";
import EmployeesManagement from "./pages/EmployeesManagement";
import ReportsManagement from "./pages/ReportsManagement";
import StatsManagement from "./pages/StatsManagement";
import RolesManagement from "./pages/RolesManagement";
import PromotionsManagement from "./pages/PromotionsManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<CustomersManagement />} />
          <Route path="/admin/employees" element={<EmployeesManagement />} />
          <Route path="/admin/books" element={<BooksManagement />} />
          <Route path="/admin/rental" element={<RentalManagement />} />
          <Route path="/admin/authors" element={<AuthorsManagement />} />
          <Route path="/admin/orders" element={<OrdersManagement />} />
          <Route path="/admin/promotions" element={<PromotionsManagement />} />
          <Route path="/admin/reports" element={<ReportsManagement />} />
          <Route path="/admin/stats" element={<StatsManagement />} />
          <Route path="/admin/roles" element={<RolesManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
