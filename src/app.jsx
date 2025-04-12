import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Header from './components/header';
import GST from './pages/gst';
import SWT from './pages/swt';
import CIT from './pages/cit';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/gst"
          element={isAuthenticated ? <GST /> : <Navigate to="/login" />}
        />
        <Route
          path="/swt"
          element={isAuthenticated ? <SWT /> : <Navigate to="/login" />}
        />
        <Route
          path="/cit"
          element={isAuthenticated ? <CIT /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;