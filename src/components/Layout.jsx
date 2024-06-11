import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Register from './Register';
import Login from './Login';
const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
