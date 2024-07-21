import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProvider from './context/UserProvider';
import {
  ProtectedAdminRoute,
  ProtectedUserRoute,
} from './routes/ProtectedRoutes';

// Lazy loaded components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const UserProductPage = lazy(() => import('./pages/user/UserProductPage'));
const UserDashboardPage = lazy(() => import('./pages/user/UserDashboardPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));
const UserCartPage = lazy(() => import('./pages/user/UserCartPage'));
const UserPaymentPage = lazy(() => import('./pages/user/UserPaymentPage'));
const UserBookingPage = lazy(() => import('./pages/user/UserBookingPage'));
const ExploreMorePage = lazy(() => import('./pages/ExploreMorePage'));

const UserPasswordChange = lazy(() =>
  import('./pages/user/UserPasswordChange')
);
const UserEditBookingPage = lazy(() =>
  import('./pages/user/UserEditBookingPage')
);
const UserCheckout = lazy(() => import('./pages/user/UserCheckout'));
const UserPaymentSuccessPage = lazy(() =>
  import('./pages/user/UserPaymentSuccessPage')
);
const UserCartEditPage = lazy(() => import('./pages/user/UserCartEditPage'));
const AdminCreateTripPage = lazy(() =>
  import('./pages/admin/AdminCreateTripPage')
);
const AdminDashboardPage = lazy(() =>
  import('./pages/admin/AdminDashboardPage')
);
const AdminEditTripPage = lazy(() => import('./pages/admin/AdminEditTripPage'));
const AdminCreateCouponPage = lazy(() =>
  import('./pages/admin/AdminCreateCouponPage')
);
const AdminEditCouponPage = lazy(() =>
  import('./pages/admin/AdminEditCouponPage')
);

function ErrorFallback({ error }) {
  return (
    <div role="alert" className="error-boundary">
      <h2>Oops! Something went wrong.</h2>
      <p>Error: {error.message}</p>
    </div>
  );
}

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
        <UserProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/package/:id" element={<UserProductPage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />
              <Route path="/explore-more" element={<ExploreMorePage />} />
              {/* Protected User Routes */}
              <Route element={<ProtectedUserRoute />}>
                <Route path="/member" element={<UserDashboardPage />} />
                <Route path="/cart" element={<UserCartPage />} />
                <Route
                  path="/cart/edit/:cartItemId"
                  element={<UserCartEditPage />}
                />
                <Route
                  path="/payment/:bookingId"
                  element={<UserPaymentPage />}
                />
                <Route path="/bookings" element={<UserBookingPage />} />
                <Route
                  path="/password-change"
                  element={<UserPasswordChange />}
                />
                <Route
                  path="/booking-edit/:bookingId"
                  element={<UserEditBookingPage />}
                />
                <Route path="/checkout/:id" element={<UserCheckout />} />
                <Route
                  path="/payment-success"
                  element={<UserPaymentSuccessPage />}
                />
              </Route>

              {/* Protected Admin Routes */}
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
                <Route
                  path="/admin/create-coupon/"
                  element={<AdminCreateCouponPage />}
                />
                <Route
                  path="/admin/edit-coupon/:id"
                  element={<AdminEditCouponPage />}
                />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
