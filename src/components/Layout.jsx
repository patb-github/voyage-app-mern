import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Landingpage from './Landingpage';
import ProductPage from './ProductPage';
import ProductDetail from './ProductDetail';
import ProductPageV2 from './ProductPageV2';
const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landingpage" element={<Landingpage />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/productPageV2" element={<ProductPageV2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
