import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import { LoginPage } from '../auth';
import { Loader } from '../auth/pages/Loader';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {
  const { status: authStatus, checkAuthToken } = useAuthStore();

  // const authStatus = 'not-authenticated'; //'authenticated - not-authenticated - checking';

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (authStatus === 'checking') {
    return <Loader />;
  }

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <>
          <Route path='/auth/*' element={<LoginPage />} />
          <Route path='/*' element={<Navigate to='/auth/login' />} />
        </>
      ) : (
        <>
          <Route path='/' element={<CalendarPage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </>
      )}

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
