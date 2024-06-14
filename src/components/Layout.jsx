import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Landingpage from './Landingpage';
import UserData from './UserData';
import Cart from './Cart';
import UserProvider from './UserProvider';
import PaymentSuccess from './PaymentSuccess';
import Payment from './Payment';
import NotFound from './NotFound';
import ProductPageV2 from './ProductPageV2';
import MyTrips from './MyTrips';
const Layout = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landingpage" element={<Landingpage />} />
          <Route path="/user-data" element={<UserData />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/landingpage/:tripname" element={<ProductPageV2 />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
export default Layout;