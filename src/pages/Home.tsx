import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, Filter } from 'lucide-react';

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

const Home: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('make');

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    filterAndSortCars();
  }, [cars, searchTerm, sortBy]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCars = () => {
    let filtered = cars.filter(car =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.color.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'make':
          return a.make.localeCompare(b.make);
        case 'year':
          return b.year - a.year;
        case 'price':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredCars(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={fetchCars}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to CarVerse
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Discover your perfect car from our premium collection
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by make, model, or color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="make">Sort by Make</option>
                <option value="year">Sort by Year (Newest)</option>
                <option value="price">Sort by Price (Low to High)</option>
                <option value="priceDesc">Sort by Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCars.length} of {cars.length} cars
          </p>
        </div>

        {/* Cars Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No cars found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;