import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, User, LogOut, Plus, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 transition-colors">
            <Car className="h-8 w-8" />
            <span className="text-xl font-bold">CarVerse</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/add-car"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/add-car') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-blue-700 hover:bg-gray-100'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Car</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1 text-gray-600">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.username}</span>
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/login') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-blue-700 hover:bg-gray-100'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${
                    isActive('/register') ? 'bg-blue-700' : ''
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;