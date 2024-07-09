import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchResultsPage from './pages/SearchResultsPage';
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
import UserPaymentSuccessPage from './pages/user/UserPaymentSuccessPage';
// admin section
import AdminCreateTripPage from './pages/admin/AdminCreateTripPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminEditTripPage from './pages/admin/AdminEditTripPage';
import Footer from './components/Footer';
import {
  ProtectedAdminRoute,
  ProtectedUserRoute,
} from './routes/ProtectedRoutes';
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
            <Route path="/search-results" element={<SearchResultsPage />} />
            {/* user route */}
            <Route element={<ProtectedUserRoute />}>
              <Route path="/member" element={<UserDashboardPage />} />
              <Route path="/cart" element={<UserCartPage />} />
              <Route path="/payment" element={<UserPaymentPage />} />
              <Route path="/booking" element={<UserBookingPage />} />
              <Route path="/password-change" element={<UserPasswordChange />} />
              <Route path="/booking-edit" element={<UserEditBookingPage />} />
              <Route path="/checkout" element={<UserCheckout />} />
              <Route
                path="/payment-success"
                element={<UserPaymentSuccessPage />}
              />
            </Route>

            {/* admin route */}
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route
                path="/admin/create-trip"
                element={<AdminCreateTripPage />}
              />
              <Route
                path="/admin/edit-trip/:id"
                element={<AdminEditTripPage />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
