import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Car, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('admin');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    // Do not autofill username/password, just show info
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <Car className="h-7 w-7 text-blue-600" /> Login to CarVerse
            </h2>
            {/* <p className="text-gray-500 mt-2 text-sm">Demo users:<br />
              <span className="font-mono">admin / admin123</span> (admin),
              <span className="font-mono">editor / editor123</span> (editor),
              <span className="font-mono">user / user123</span> (user)
            </p>
            <p className="text-xs text-gray-400 mt-1">Access: Admin can add/edit/delete, Editor can edit, User can only view.</p> */}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Role Selection */}
          <div className="flex justify-center gap-2 mb-4">
            <button type="button" onClick={() => handleRoleSelect('admin')} className={`px-3 py-1 rounded transition-colors duration-200 shadow-sm border ${selectedRole === 'admin' ? 'bg-blue-600 text-white border-blue-700' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'}`}>Admin</button>
            <button type="button" onClick={() => handleRoleSelect('editor')} className={`px-3 py-1 rounded transition-colors duration-200 shadow-sm border ${selectedRole === 'editor' ? 'bg-blue-600 text-white border-blue-700' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'}`}>Editor</button>
            <button type="button" onClick={() => handleRoleSelect('user')} className={`px-3 py-1 rounded transition-colors duration-200 shadow-sm border ${selectedRole === 'user' ? 'bg-blue-600 text-white border-blue-700' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'}`}>User</button>
          </div>
          {/* Role Info */}
          <div className="mb-6 text-center">
            {selectedRole === 'admin' && (
              <div className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded p-2 inline-block font-mono">admin<br /><span className="text-gray-500">Full access: add, edit, delete</span></div>
            )}
            {selectedRole === 'editor' && (
              <div className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 rounded p-2 inline-block font-mono">editor<br /><span className="text-gray-500">Edit access only</span></div>
            )}
            {selectedRole === 'user' && (
              <div className="text-xs text-gray-700 bg-gray-50 border border-gray-100 rounded p-2 inline-block font-mono">user<br /><span className="text-gray-500">View only</span></div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your username"
                autoComplete="new-username"
                spellCheck={false}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;