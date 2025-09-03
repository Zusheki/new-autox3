import { MaterialItem, Vehicle } from '../types';

// Sri Lankan districts for location filtering
export const sriLankanDistricts = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Moneragala', 'Ratnapura', 'Kegalle'
];

// Material categories
export const materialCategories = [
  {
    id: 'sand',
    name: 'Sand',
    description: 'River sand, sea sand, and construction sand',
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'soil',
    name: 'Soil',
    description: 'Garden soil, topsoil, and fill dirt',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'gravel',
    name: 'Gravel',
    description: 'Crushed stone, pea gravel, and aggregate',
    image: 'https://images.pexels.com/photos/1029641/pexels-photo-1029641.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'metal',
    name: 'Metal',
    description: 'Steel rods, iron bars, and metal sheets',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'bricks',
    name: 'Bricks',
    description: 'Clay bricks, concrete blocks, and pavers',
    image: 'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  }
];

// Vehicle categories
export const vehicleCategories = [
  {
    id: 'jcb',
    name: 'JCB',
    description: 'Backhoe loaders for excavation and loading',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'excavator',
    name: 'Excavator',
    description: 'Heavy excavators for digging and demolition',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'tipper',
    name: 'Tipper',
    description: 'Dump trucks for material transportation',
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'lorry',
    name: 'Lorry',
    description: 'Transport trucks for cargo and materials',
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'bowser',
    name: 'Bowser',
    description: 'Water tankers for site water supply',
    image: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'crane',
    name: 'Crane',
    description: 'Mobile cranes for heavy lifting',
    image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'concrete_mixer',
    name: 'Concrete Mixer',
    description: 'Concrete mixing trucks',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'road_roller',
    name: 'Road Roller',
    description: 'Compaction equipment for road construction',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'bus',
    name: 'Bus',
    description: 'Passenger buses for transportation',
    image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  },
  {
    id: 'boom_truck',
    name: 'Boom Truck',
    description: 'Aerial work platforms and boom lifts',
    image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: ''
  }
];

export const materialItems: MaterialItem[] = [
  // Sand items
  {
    id: 'sand-1',
    name: 'Premium River Sand',
    description: 'High-quality river sand perfect for construction work. Clean, well-graded sand suitable for concrete mixing and masonry work.',
    category: 'sand',
    pricePerUnit: 6500,
    unit: 'cubic meter',
    image: 'https://i.pinimg.com/736x/3f/20/12/3f2012385e3335e87443cce6181589e9.jpg',
    available: true,
    supplier: {
      name: 'Wilson Material Supply',
      location: 'Kelaniya',
      district: 'Gampaha',
      phone: '+94761098385',
      rating: 4.9,
      totalOrders: 245
    }
  },
  {
    id: 'sand-2',
    name: 'Fine Construction Sand',
    description: 'Fine-grade sand ideal for plastering and finishing work. Consistent particle size for smooth application.',
    category: 'sand',
    pricePerUnit: 7200,
    unit: 'cubic meter',
    image: 'https://i.pinimg.com/1200x/8c/f2/5e/8cf25ef3a08a1e758fc3bac52d6998a5.jpg',
    available: true,
    supplier: {
      name: 'Colombo Sand Suppliers',
      location: 'Colombo',
      district: 'Colombo',
      phone: '+94772345678',
      rating: 4.7,
      totalOrders: 189
    }
  },
  {
    id: 'sand-3',
    name: 'Coarse River Sand',
    description: 'Coarse river sand perfect for concrete work and foundation laying. High strength and durability.',
    category: 'sand',
    pricePerUnit: 6800,
    unit: 'cubic meter',
    image: 'https://i.pinimg.com/736x/0d/71/8a/0d718a2624ad5f8f5debe59892b9c84a.jpg',
    available: true,
    supplier: {
      name: 'Kandy Construction Materials',
      location: 'Kandy',
      district: 'Kandy',
      phone: '+94759876543',
      rating: 4.8,
      totalOrders: 156
    }
  },

  // Soil items
  {
    id: 'soil-1',
    name: 'Premium Garden Soil',
    description: 'Rich, fertile soil ideal for landscaping and gardening projects. Nutrient-rich composition perfect for plant growth.',
    category: 'soil',
    pricePerUnit: 7500,
    unit: 'cubic meter',
    image: 'https://i.pinimg.com/736x/0a/e6/b9/0ae6b95831b6064072cf7fe18b440985.jpg',
    available: true,
    supplier: {
      name: 'Green Earth Suppliers',
      location: 'Nugegoda',
      district: 'Colombo',
      phone: '+94 77 2345678',
      rating: 4.7,
      totalOrders: 189
    }
  },
  {
    id: 'soil-2',
    name: 'Fill Dirt',
    description: 'Quality fill dirt for leveling and grading projects. Clean and compactable soil for construction use.',
    category: 'soil',
    pricePerUnit: 5500,
    unit: 'cubic meter',
    image: 'https://i.pinimg.com/1200x/c9/3d/09/c93d09d9463d105a6b00eeab2426f452.jpg',
    available: true,
    supplier: {
      name: 'Galle Soil Works',
      location: 'Galle',
      district: 'Galle',
      phone: '+94 78 3456789',
      rating: 4.6,
      totalOrders: 134
    }
  },

  // Gravel items
  {
    id: 'gravel-1',
    name: 'Crushed Stone Aggregate',
    description: 'High-quality crushed stone for concrete and road construction. Various sizes available.',
    category: 'gravel',
    pricePerUnit: 8200,
    unit: 'cubic meter',
    image: 'https://i.pinimg.com/736x/27/4e/bd/274ebda261af7af1f109cabe261106db.jpg',
    available: true,
    supplier: {
      name: 'Ratnapura Quarries',
      location: 'Ratnapura',
      district: 'Ratnapura',
      phone: '+94 76 5432109',
      rating: 4.8,
      totalOrders: 278
    }
  },

  // Metal items
  {
    id: 'metal-1',
    name: 'Steel Reinforcement Bars',
    description: 'High-grade steel rods for concrete reinforcement. Various diameters available for different applications.',
    category: 'metal',
    pricePerUnit: 185000,
    unit: 'ton',
    image: 'https://i.pinimg.com/736x/f6/47/1d/f6471d945ac46419cabdcc9ac1f6010a.jpg',
    available: true,
    supplier: {
      name: 'Lanka Steel Corporation',
      location: 'Colombo',
      district: 'Colombo',
      phone: '+94 77 8765432',
      rating: 4.9,
      totalOrders: 456
    }
  },

  // Bricks items
  {
    id: 'bricks-1',
    name: 'Red Clay Bricks',
    description: 'Durable clay bricks for construction and masonry work. High compressive strength and weather resistance.',
    category: 'bricks',
    pricePerUnit: 32000,
    unit: 'per 1000 pieces',
    image: 'https://i.pinimg.com/1200x/2e/14/51/2e1451436878cdf1f5e317a76b3d71d0.jpg',
    available: true,
    supplier: {
      name: 'Lanka Brick Works',
      location: 'Panadura',
      district: 'Kalutara',
      phone: '+94 75 9876543',
      rating: 4.8,
      totalOrders: 312
    }
  },
  {
    id: 'bricks-2',
    name: 'Concrete Blocks',
    description: 'Strong concrete blocks for wall construction. Lightweight and durable building material.',
    category: 'bricks',
    pricePerUnit: 28000,
    unit: 'per 1000 pieces',
    image: 'https://i.pinimg.com/1200x/36/df/bd/36dfbd69ae843270294ae63ae75152b6.jpg',
    available: true,
    supplier: {
      name: 'Modern Block Factory',
      location: 'Kurunegala',
      district: 'Kurunegala',
      phone: '+94 78 1234567',
      rating: 4.7,
      totalOrders: 198
    }
  }
];

export const vehicles: Vehicle[] = [
  // JCB
  {
    id: 'jcb-1',
    name: 'JCB 3CX Backhoe Loader',
    description: 'Versatile backhoe loader for excavation, loading, and material handling. Professional grade equipment with experienced operator.',
    category: 'jcb',
    pricePerHour: 32000,
    pricePerDay: 210000,
    image: 'https://i.pinimg.com/736x/08/81/7e/08817ee595ed09578140e8895a177e8b.jpg',
    available: true,
    specifications: ['Operating Weight: 8.5 tons', 'Max Digging Depth: 5.2m', 'Bucket Capacity: 0.28m³', 'Engine Power: 74kW'],
    supplier: {
      name: 'Johnson Construction Equipment',
      location: 'Nugegoda',
      district: 'Colombo',
      phone: '+94 76 1098385',
      rating: 4.8,
      totalJobs: 156
    }
  },
  {
    id: 'jcb-2',
    name: 'JCB 4CX Backhoe Loader',
    description: 'Heavy-duty JCB for large construction projects. Superior performance and reliability.',
    category: 'jcb',
    pricePerHour: 38000,
    pricePerDay: 250000,
    image: 'https://i.pinimg.com/1200x/11/f9/e4/11f9e4f7b91a845e6958fecfd5ce98a3.jpg',
    available: true,
    specifications: ['Operating Weight: 9.2 tons', 'Max Digging Depth: 6.1m', 'Bucket Capacity: 0.35m³', 'Engine Power: 85kW'],
    supplier: {
      name: 'Kandy Heavy Machinery',
      location: 'Kandy',
      district: 'Kandy',
      phone: '+94 77 3456789',
      rating: 4.9,
      totalJobs: 203
    }
  },

  // Excavator
  {
    id: 'excavator-1',
    name: 'CAT 320D Excavator',
    description: 'Heavy-duty excavator for large-scale excavation and demolition work. High performance and fuel efficiency.',
    category: 'excavator',
    pricePerHour: 45000,
    pricePerDay: 295000,
    image: 'https://i.pinimg.com/736x/d7/86/24/d78624710b9ed96a7534fc91b63d7bc8.jpg',
    available: true,
    specifications: ['Operating Weight: 20 tons', 'Max Digging Depth: 7.5m', 'Bucket Capacity: 1.2m³', 'Engine Power: 122kW'],
    supplier: {
      name: 'Colombo Excavation Services',
      location: 'Colombo',
      district: 'Colombo',
      phone: '+94 75 8765432',
      rating: 4.7,
      totalJobs: 134
    }
  },

  // Tipper
  {
    id: 'tipper-1',
    name: 'TATA 1613 Tipper',
    description: 'Heavy-duty tipper truck for material transportation and dumping. Large capacity and reliable performance.',
    category: 'tipper',
    pricePerHour: 28000,
    pricePerDay: 185000,
    image: 'https://i.pinimg.com/1200x/55/1a/ec/551aecb45b4201abc786d87fac0301a2.jpg',
    available: true,
    specifications: ['Payload: 12 tons', 'Bed Volume: 8m³', 'Hydraulic Tipping', 'Engine Power: 150HP'],
    supplier: {
      name: 'Galle Transport Solutions',
      location: 'Galle',
      district: 'Galle',
      phone: '+94 78 1234567',
      rating: 4.6,
      totalJobs: 189
    }
  },

  // Lorry
  {
    id: 'lorry-1',
    name: 'Ashok Leyland Transport Lorry',
    description: 'Large capacity truck for material transportation. Reliable vehicle for moving construction materials.',
    category: 'lorry',
    pricePerHour: 21000,
    pricePerDay: 135000,
    image: 'https://i.pinimg.com/736x/c9/7c/c6/c97cc652e58ba88d85f4123786675d40.jpg',
    available: true,
    specifications: ['Payload: 10 tons', 'Bed Length: 6.2m', 'Width: 2.4m', 'Engine Power: 140HP'],
    supplier: {
      name: 'Metro Transport Services',
      location: 'Kelaniya',
      district: 'Gampaha',
      phone: '+94 77 3456789',
      rating: 4.6,
      totalJobs: 203
    }
  },

  // Bowser
  {
    id: 'bowser-1',
    name: 'Water Bowser 5000L',
    description: 'Water tanker for construction site water supply. Essential for dust control and construction activities.',
    category: 'bowser',
    pricePerHour: 16000,
    pricePerDay: 105000,
    image: 'https://i.pinimg.com/736x/5a/58/fa/5a58fad089e8558ec4a2a4981f278210.jpg',
    available: true,
    specifications: ['Capacity: 5000L', 'Pump Pressure: 4 bar', 'Hose Length: 50m', 'Spray System'],
    supplier: {
      name: 'Aqua Solutions Lanka',
      location: 'Matara',
      district: 'Matara',
      phone: '+94 75 8765432',
      rating: 4.7,
      totalJobs: 134
    }
  },

  // Crane
  {
    id: 'crane-1',
    name: 'Mobile Crane 25T',
    description: 'Mobile crane for heavy lifting operations. Professional operator included for safe operations.',
    category: 'crane',
    pricePerHour: 55000,
    pricePerDay: 365000,
    image: 'https://i.pinimg.com/1200x/c6/62/00/c66200a62826fe8dbe3ee1bda3c2eae4.jpg',
    available: true,
    specifications: ['Lifting Capacity: 25 tons', 'Max Height: 35m', 'Boom Length: 30m', 'Engine Power: 200HP'],
    supplier: {
      name: 'Heights Crane Services',
      location: 'Maharagama',
      district: 'Colombo',
      phone: '+94 78 1234567',
      rating: 4.9,
      totalJobs: 89
    }
  },

  // Concrete Mixer
  {
    id: 'concrete_mixer-1',
    name: 'Concrete Mixer Truck',
    description: 'Ready-mix concrete delivery truck. Fresh concrete delivered to your construction site.',
    category: 'concrete_mixer',
    pricePerHour: 35000,
    pricePerDay: 230000,
    image: 'https://i.pinimg.com/1200x/81/00/bd/8100bd5fd23d7489afe8f129befd63d8.jpg',
    available: true,
    specifications: ['Capacity: 6m³', 'Mixing Drum', 'Hydraulic Discharge', 'Engine Power: 180HP'],
    supplier: {
      name: 'Concrete Solutions Lanka',
      location: 'Kurunegala',
      district: 'Kurunegala',
      phone: '+94 76 5432109',
      rating: 4.8,
      totalJobs: 167
    }
  },

  // Road Roller
  {
    id: 'road_roller-1',
    name: 'Vibratory Road Roller',
    description: 'Heavy-duty road roller for compaction work. Essential for road construction and paving.',
    category: 'road_roller',
    pricePerHour: 42000,
    pricePerDay: 275000,
    image: 'https://i.pinimg.com/1200x/30/4b/a9/304ba932858fc9834280f809bcfc2d8f.jpg',
    available: true,
    specifications: ['Operating Weight: 12 tons', 'Drum Width: 2.1m', 'Vibration Frequency: 30Hz', 'Engine Power: 110kW'],
    supplier: {
      name: 'Road Construction Equipment',
      location: 'Anuradhapura',
      district: 'Anuradhapura',
      phone: '+94 77 8765432',
      rating: 4.7,
      totalJobs: 145
    }
  },

  // Bus
  {
    id: 'bus-1',
    name: 'Passenger Bus 45 Seater',
    description: 'Comfortable passenger bus for group transportation. Air-conditioned with experienced driver.',
    category: 'bus',
    pricePerHour: 18000,
    pricePerDay: 120000,
    image: 'https://i.pinimg.com/736x/d2/58/80/d25880d8693f6b1c114a0994dbe478ea.jpg',
    available: true,
    specifications: ['Seating: 45 passengers', 'Air Conditioning', 'GPS Tracking', 'Engine Power: 160HP'],
    supplier: {
      name: 'Lanka Bus Services',
      location: 'Jaffna',
      district: 'Jaffna',
      phone: '+94 75 1234567',
      rating: 4.8,
      totalJobs: 234
    }
  },

  // Boom Truck
  {
    id: 'boom_truck-1',
    name: 'Boom Lift Truck',
    description: 'Aerial work platform for high-access construction work. Safe and efficient solution for elevated tasks.',
    category: 'boom_truck',
    pricePerHour: 40000,
    pricePerDay: 265000,
    image: 'https://i.pinimg.com/736x/42/5b/6a/425b6a732560b5c072b172c9d9d7c284.jpg',
    available: true,
    specifications: ['Max Height: 15m', 'Platform Capacity: 230kg', 'Outreach: 7.6m', 'Electric Drive'],
    supplier: {
      name: 'Heights Access Equipment',
      location: 'Batticaloa',
      district: 'Batticaloa',
      phone: '+94 78 1234567',
      rating: 4.9,
      totalJobs: 89
    }
  }
];