import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProductPage from './pages/user/UserProductPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import UserProvider from './context/UserProvider';
import NotFound from './pages/NotFoundPage';
import UserCartPage from './pages/user/UserCartPage';
import UserPaymentPage from './pages/user/UserPaymentPage';
import UserBookingPage from './pages/user/UserBookingPage';
import UserPaymentSuccess from './pages/user/UserPaymentSuccess';
import UserPasswordChange from './pages/user/UserPasswordChange';
import UserEditBookingPage from './pages/user/UserEditBookingPage';
import UserCheckout from './pages/user/UserCheckout';
import CreateTripForm from './pages/admin/CreateTripForm';
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
            <Route path="/package/:tripname" element={<UserProductPage />} />
            <Route path="/member" element={<UserDashboardPage />} />
            <Route path="/cart" element={<UserCartPage />} />
            <Route path="/payment" element={<UserPaymentPage />} />
            <Route path="/booking" element={<UserBookingPage />} />
            <Route path="/password-change" element={<UserPasswordChange />} />
            <Route path="/payment-success" element={<UserPaymentSuccess />} />
            <Route path="/booking-edit" element={<UserEditBookingPage />} />
            <Route path="/checkout" element={<UserCheckout />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin" element={<CreateTripForm />} />
          </Routes>
          {/* <Footer /> */}
        </UserProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
