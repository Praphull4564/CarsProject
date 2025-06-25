import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Palette, DollarSign, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  description: string;
  imageUrl: string;
}

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCar = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/cars/${id}`);
      setCar(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setError('Failed to load car details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!car || !window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      setDeleting(true);
      await axios.delete(`/api/cars/${car.id}`);
      navigate('/', { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        alert('Failed to delete car');
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Cars</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <img
                src={car.imageUrl}
                alt={`${car.make} ${car.model}`}
                className="w-full h-96 lg:h-full object-cover"
              />
              <div className="absolute top-6 right-6 bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-lg font-bold text-gray-800">
                  ${car.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {car.make} {car.model}
                  </h1>
                  <div className="flex items-center space-x-6 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="h-5 w-5" />
                      <span className="font-medium">{car.color}</span>
                    </div>
                  </div>
                </div>

                {user && (
                  <div className="flex space-x-2">
                    <Link
                      to={user.role === 'admin' || user.role === 'editor' ? `/edit-car/${car.id}` : '#'}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${user.role === 'admin' || user.role === 'editor' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                      tabIndex={user.role === 'admin' || user.role === 'editor' ? 0 : -1}
                      aria-disabled={user.role === 'user'}
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                    {user.role === 'admin' && (
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex items-center space-x-1 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl mb-6">
                <div className="flex items-center space-x-2 text-emerald-700">
                  <DollarSign className="h-6 w-6" />
                  <span className="text-2xl font-bold">{car.price.toLocaleString()}</span>
                </div>
                <p className="text-emerald-600 mt-1">Competitive pricing</p>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {car.description || 'No description available.'}
                </p>
              </div>

              {/* Specifications */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Make</p>
                    <p className="font-semibold text-gray-900">{car.make}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Model</p>
                    <p className="font-semibold text-gray-900">{car.model}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-semibold text-gray-900">{car.year}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-semibold text-gray-900">{car.color}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;