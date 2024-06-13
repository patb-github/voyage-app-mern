import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Landingpage from './Landingpage';
import ProductPage from './ProductPage';
import UserData from './UserData';
import Cart from './Cart';
import UserProvider from './UserProvider';
import Payment from './Payment';
import PaymentSuccess from './PaymentSuccess';
import MyTrips from './MyTrips';
import ProductPageV2 from './ProductPageV2';

const Layout = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingPage" element={<Landingpage />} />
          <Route path="/productPage" element={<ProductPage />} />
          <Route path="/userData" element={<UserData />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/mytrips" element={<MyTrips />} />
          <Route path="/productpagev2" element={<ProductPageV2 />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default Layout;
