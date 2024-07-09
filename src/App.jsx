import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// user section
import UserProductPage from './pages/user/UserProductPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import UserProvider from './context/UserProvider';
import NotFound from './pages/NotFoundPage';
import UserCartPage from './pages/user/UserCartPage';
import UserPaymentPage from './pages/user/UserPaymentPage';
import UserBookingPage from './pages/user/UserBookingPage';
import UserPasswordChange from './pages/user/UserPasswordChange';
import UserEditBookingPage from './pages/user/UserEditBookingPage';
import UserCheckout from './pages/user/UserCheckout';
// admin section
import AdminCreateTripPage from './pages/admin/AdminCreateTripPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEditTripPage from './pages/admin/AdminEditTripPage';
import AdminCreateCouponPage from './pages/admin/AdminCreateCouponPage';
import AdminEditCouponPage from './pages/admin/AdminEditCouponPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/package/:id" element={<UserProductPage />} />
            <Route path="/member" element={<UserDashboardPage />} />
            <Route path="/cart" element={<UserCartPage />} />
            <Route path="/payment" element={<UserPaymentPage />} />
            <Route path="/booking" element={<UserBookingPage />} />
            <Route path="/password-change" element={<UserPasswordChange />} />
            <Route path="/booking-edit" element={<UserEditBookingPage />} />
            <Route path="/checkout" element={<UserCheckout />} />
            <Route path="/checkout/:id" element={<UserCheckout />} />
            <Route path="*" element={<NotFound />} />
            {/* admin section */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/create-trip" element={<AdminCreateTripPage />} />
            <Route path="/admin/create-coupon" element={<AdminCreateCouponPage />} />
            <Route path="/admin/edit-trip/:id" element={<AdminEditTripPage />} />
            <Route path="/admin/edit-coupon/:id" element={<AdminEditCouponPage />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
