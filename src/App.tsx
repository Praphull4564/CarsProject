import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CarDetail from './pages/CarDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/add-car"
              element={
                <ProtectedRoute>
                  <AddCar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-car/:id"
              element={
                <ProtectedRoute>
                  <EditCar />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;