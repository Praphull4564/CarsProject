import { v4 as uuidv4 } from 'uuid';

// Pre-populated car data
let cars = [
  {
    id: uuidv4(),
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    color: 'Midnight Black',
    price: 28500,
    description: 'A reliable and fuel-efficient sedan perfect for daily commuting. Features advanced safety systems and a spacious interior.',
    imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/192443/camry-exterior-right-front-three-quarter-14.jpeg?isig=0&q=80'
  },
  {
    id: uuidv4(),
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    color: 'Pearl White',
    price: 26200,
    description: 'Compact car with exceptional reliability and modern technology. Great for city driving with excellent fuel economy.',
    imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/27074/civic-exterior-right-front-three-quarter-148156.jpeg?q=80'
  },
  {
    id: uuidv4(),
    make: 'Ford',
    model: 'Mustang',
    year: 2022,
    color: 'Racing Red',
    price: 45000,
    description: 'Iconic American muscle car with powerful V8 engine. Perfect blend of performance and classic styling.',
    imageUrl: 'https://imgd.aeplcdn.com/664x374/cw/ec/23766/Ford-Mustang-Exterior-126883.jpg?wm=0&q=80'
  },
  {
    id: uuidv4(),
    make: 'BMW',
    model: '330i',
    year: 2023,
    color: 'Alpine White',
    price: 42500,
    description: 'Luxury sport sedan with premium interior and dynamic driving experience. German engineering at its finest.',
    imageUrl: 'https://imgd.aeplcdn.com/664x374/n/3veu4ua_1563215.jpg?q=80'
  },
  {
    id: uuidv4(),
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    color: 'Obsidian Black',
    price: 48000,
    description: 'Elegant luxury sedan with cutting-edge technology and sophisticated design. Comfort meets performance.',
    imageUrl: 'https://imgd.aeplcdn.com/310x174/n/cw/ec/178535/c-class-exterior-left-front-three-quarter-2.jpeg?isig=0&q=80&q=80'
  },
  {
    id: uuidv4(),
    make: 'Audi',
    model: 'Q5',
    year: 2022,
    color: 'Quantum Gray',
    price: 52000,
    description: 'Premium compact SUV with Quattro all-wheel drive. Perfect for families who demand luxury and practicality.',
    imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/53591/q5-exterior-right-front-three-quarter-36.jpeg?isig=0&q=80'
  },
  {
    id: uuidv4(),
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    color: 'Deep Blue Metallic',
    price: 38990,
    description: 'Revolutionary electric sedan with autopilot capabilities. Zero emissions with incredible acceleration.',
    imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/37138/model-3-exterior-right-front-three-quarter.jpeg?isig=0&q=80'
  },
  {
    id: uuidv4(),
    make: 'Chevrolet',
    model: 'Corvette',
    year: 2022,
    color: 'Torch Red',
    price: 68000,
    description: 'American supercar with mid-engine design. Incredible performance and stunning looks.',
    imageUrl: 'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2025/performance/stingray/mov/02-images/accent-package/2025-stingray-design-package-01.jpg?imwidth=3000'
  },
  {
    id: uuidv4(),
    make: 'Lexus',
    model: 'RX 350',
    year: 2023,
    color: 'Eminent White',
    price: 46000,
    description: 'Luxury SUV with renowned reliability and premium amenities. Perfect for families seeking comfort.',
    imageUrl: 'https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fcolors%2Flexus%2Flx%2Flexus-lx-eminent-white-pearl.jpg%3Fv%3D1746610893&w=750&q=75'
  },
  {
    id: uuidv4(),
    make: 'Porsche',
    model: '911',
    year: 2022,
    color: 'Guards Red',
    price: 115000,
    description: 'Iconic sports car with timeless design and exceptional performance. The ultimate driving machine.',
    imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/39232/911-exterior-right-front-three-quarter-154382.jpeg?isig=0&wm=1&q=80'
  },
  {
    id: uuidv4(),
    make: 'Subaru',
    model: 'Outback',
    year: 2023,
    color: 'Wilderness Green',
    price: 32000,
    description: 'Versatile crossover SUV with standard all-wheel drive. Perfect for outdoor adventures and daily driving.',
    imageUrl: 'https://s7d1.scene7.com/is/image/scom/SDB_default_frontwheelturned_left?$1450wa$'
  },
  {
    id: uuidv4(),
    make: 'Mazda',
    model: 'CX-5',
    year: 2023,
    color: 'Soul Red Crystal',
    price: 29500,
    description: 'Stylish compact SUV with premium interior and engaging driving dynamics. Japanese craftsmanship.',
    imageUrl: 'https://www.mazdausa.com/siteassets/vehicles/2025/cx-5/01_vlp/002_design/d_gallery/desktop/2025-mazda-cx-5-crossover-suv-2.5-turbo-premium_desktop?w={width}'
  },
  {
    id: uuidv4(),
    make: 'Volkswagen',
    model: 'Golf GTI',
    year: 2022,
    color: 'Pure White',
    price: 34000,
    description: 'Hot hatch with turbocharged performance and European refinement. Fun to drive with practical versatility.',
    imageUrl: 'https://assets.volkswagen.com/is/image/volkswagenag/golf-gti-model-page-banner?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw=='
  },
  {
    id: uuidv4(),
    make: 'Acura',
    model: 'TLX',
    year: 2023,
    color: 'Platinum White',
    price: 39000,
    description: 'Sport luxury sedan with advanced technology and powerful V6 engine. Performance meets sophistication.',
    imageUrl: 'https://www.acura.com/platform/api/v4/images/Exterior/03?config=M:UB7F0SGW$EC:NH-912P$IC:EN%26width=880'
  },
  {
    id: uuidv4(),
    make: 'Infiniti',
    model: 'Q50',
    year: 2022,
    color: 'Liquid Platinum',
    price: 41000,
    description: 'Luxury sport sedan with twin-turbo V6 and advanced driver assistance. Bold design with premium comfort.',
    imageUrl: 'https://www.infinitiusa.com/content/dam/Infiniti/US/vehicles/discontinued/q50/pfa/infiniti-q50-luxury-sedan-xl.jpg'
  },
  {
    id: uuidv4(),
    make: 'Cadillac',
    model: 'Escalade',
    year: 2023,
    color: 'Shadow Metallic',
    price: 78000,
    description: 'Full-size luxury SUV with commanding presence and premium amenities. American luxury at its finest.',
    imageUrl: 'https://www.cadillac.com/content/dam/cadillac/na/us/english/index/vehicles/future-and-concept/future-vehicles/escalade-mcm/my25-escalade-mov-gallery-grid-exterior-front-grille-v2.jpg?imwidth=3000'
  },
  {
    id: uuidv4(),
    make: 'Genesis',
    model: 'G90',
    year: 2023,
    color: 'Ceramic Silver',
    price: 72000,
    description: 'Full-size luxury sedan with exceptional refinement and advanced technology. Korean luxury redefined.',
    imageUrl: 'https://s7d1.scene7.com/is/image/hyundai/2025-g90-35t-std-awd-savilesilver-blackmonotone-frontpassangle-studio:16-9?wid=800&hei=450&fmt=webp'
  },
  {
    id: uuidv4(),
    make: 'Jeep',
    model: 'Wrangler',
    year: 2022,
    color: 'Firecracker Red',
    price: 38000,
    description: 'Iconic off-road SUV with removable doors and roof. Built for adventure and outdoor exploration.',
    imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/174975/wrangler-exterior-right-front-three-quarter-33.jpeg?isig=0&q=80'
  },
  {
    id: uuidv4(),
    make: 'Land Rover',
    model: 'Range Rover',
    year: 2023,
    color: 'Santorini Black',
    price: 95000,
    description: 'Luxury SUV with unparalleled off-road capability and refined on-road manners. British luxury heritage.',
    imageUrl: 'https://imgd.aeplcdn.com/227x128/n/cw/ec/55215/defender-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80'
  },
  {
    id: uuidv4(),
    make: 'Volvo',
    model: 'XC90',
    year: 2023,
    color: 'Crystal White',
    price: 56000,
    description: 'Three-row luxury SUV with advanced safety features and Scandinavian design. Family-focused luxury.',
    imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/198257/xc90-facelift-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80'
  }
];

export const getCars = () => cars;

export const getCarById = (id) => {
  return cars.find(car => car.id === id);
};

export const addCar = (car) => {
  const newCar = {
    id: uuidv4(),
    ...car
  };
  cars.push(newCar);
  return newCar;
};

export const updateCar = (id, updates) => {
  const index = cars.findIndex(car => car.id === id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...updates };
    return cars[index];
  }
  return null;
};

export const deleteCar = (id) => {
  const index = cars.findIndex(car => car.id === id);
  if (index !== -1) {
    const deletedCar = cars[index];
    cars.splice(index, 1);
    return deletedCar;
  }
  return null;
};