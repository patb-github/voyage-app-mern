import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Landingpage from './Landingpage';
import ProductPageV2 from './ProductPageV2';
import UserData from './UserData';
import Cart from './Cart';
import UserProvider from './UserProvider';
import PaymentSuccess from './PaymentSuccess';
import Payment from './Payment';
import NotFound from './NotFound';
import PasswordChange from './PasswordChange';
import MyTrips from './MyTrips';

const Layout = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingPage" element={<Landingpage />} />
          <Route path="/productPage" element={<ProductPageV2 />} />
          <Route path="/user-data" element={<UserData />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/password-change" element={<PasswordChange />} />
          <Route path="/my-trips" element={<MyTrips />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default Layout;
