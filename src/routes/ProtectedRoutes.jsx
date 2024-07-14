import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export const ProtectedUserRoute = () => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>; // หรือ loading component อื่นๆ
  }

  return user && !user.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedAdminRoute = () => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>; // หรือ loading component อื่นๆ
  }

  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};
