import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Palette, DollarSign } from 'lucide-react';

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

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Link
      to={`/car/${car.id}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300"
    >
      <div className="aspect-w-16 aspect-h-10 relative overflow-hidden">
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-800">
            ${car.price.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
          {car.make} {car.model}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Palette className="h-4 w-4" />
            <span>{car.color}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {car.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
            <DollarSign className="h-4 w-4" />
            <span>{car.price.toLocaleString()}</span>
          </div>
          <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;