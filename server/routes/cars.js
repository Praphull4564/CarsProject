import express from 'express';
import { getCars, getCarById, addCar, updateCar, deleteCar } from '../data/cars.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all cars (public)
router.get('/', (req, res) => {
  try {
    const cars = getCars();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get car by ID (public)
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const car = getCarById(id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add new car (protected)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { make, model, year, color, price, description, imageUrl } = req.body;

    if (!make || !model || !year || !color || !price) {
      return res.status(400).json({ message: 'Make, model, year, color, and price are required' });
    }

    if (year < 1900 || year > new Date().getFullYear() + 1) {
      return res.status(400).json({ message: 'Invalid year' });
    }

    if (price < 0) {
      return res.status(400).json({ message: 'Price must be positive' });
    }

    const newCar = addCar({
      make,
      model,
      year: parseInt(year),
      color,
      price: parseFloat(price),
      description: description || '',
      imageUrl: imageUrl || `https://placehold.co/600x400/1e40af/ffffff?text=${encodeURIComponent(make + '+' + model)}`
    });

    res.status(201).json({
      message: 'Car added successfully',
      car: newCar
    });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update car (protected)
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, year, color, price, description, imageUrl } = req.body;

    const existingCar = getCarById(id);
    if (!existingCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const updates = {};
    if (make) updates.make = make;
    if (model) updates.model = model;
    if (year) {
      if (year < 1900 || year > new Date().getFullYear() + 1) {
        return res.status(400).json({ message: 'Invalid year' });
      }
      updates.year = parseInt(year);
    }
    if (color) updates.color = color;
    if (price !== undefined) {
      if (price < 0) {
        return res.status(400).json({ message: 'Price must be positive' });
      }
      updates.price = parseFloat(price);
    }
    if (description !== undefined) updates.description = description;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;

    const updatedCar = updateCar(id, updates);

    res.json({
      message: 'Car updated successfully',
      car: updatedCar
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete car (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedCar = deleteCar(id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({
      message: 'Car deleted successfully',
      car: deletedCar
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;