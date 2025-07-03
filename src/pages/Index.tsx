
import AdminLogin from '../components/AdminLogin.jsx';
import SlideBanner from '../components/SlideBanner.jsx';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="container mx-auto px-4 py-8">
        <SlideBanner />
      </div>
      
      {/* Login Section */}
      <AdminLogin />
    </div>
  );
};

export default Index;
