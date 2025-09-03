const { User, Partner, Material, Vehicle, syncDatabase } = require('../models');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Sync database first
    await syncDatabase(true); // Force recreate tables

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@autox.lk',
      phone: '+1234567890',
      password: 'admin123',
      role: 'admin',
      isVerified: true
    });

    // Create sample customer
    const customer = await User.create({
      name: 'John Doe',
      email: 'john@autox.lk',
      phone: '+1234567891',
      password: 'password123',
      role: 'customer',
      isVerified: true
    });

    // Create sample partner users
    const partnerUser1 = await User.create({
      name: 'Mike Johnson',
      email: 'mike@autox.lk',
      phone: '+1234567892',
      password: 'password123',
      role: 'partner',
      isVerified: true
    });

    const partnerUser2 = await User.create({
      name: 'Sarah Wilson',
      email: 'sarah@autox.lk',
      phone: '+1234567893',
      password: 'password123',
      role: 'partner',
      isVerified: true
    });

    // Create vehicle owner partner
    const vehiclePartner = await Partner.create({
      userId: partnerUser1.id,
      type: 'vehicle_owner',
      businessName: 'Johnson Construction Equipment',
      businessLicense: 'BC123456789',
      taxId: 'TX987654321',
      yearsInBusiness: 15,
      description: 'Professional construction equipment rental with experienced operators.',
      services: ['Excavation Services', 'Transportation', 'Crane Operations'],
      address: {
        street: 'No. 245, Lakeview Avenue',
        city: 'Nugegoda',
        state: 'Western Province',
        zipCode: '10250',
        country: 'Sri Lanka'
      },
      contact: {
        phone: '+94 76 1098385',
        email: 'mike@autox.lk',
        emergencyContact: {
          name: 'Jane Johnson',
          phone: '+94 76 1098385',
          relationship: 'Spouse'
        }
      },
      insurance: {
        provider: 'Construction Insurance Co',
        policyNumber: 'CI123456789',
        expiryDate: '2025-12-31',
        coverage: 'Full comprehensive coverage'
      },
      bankDetails: {
        accountHolderName: 'Johnson Construction Equipment',
        bankName: 'First National Bank',
        accountNumber: '1234567890',
        routingNumber: '987654321',
        accountType: 'business'
      },
      verificationStatus: 'approved',
      reviewedBy: adminUser.id,
      reviewedAt: new Date(),
      rating: 4.8,
      ratingCount: 25,
      totalJobs: 150,
      completedJobs: 145,
      totalEarnings: 125000.00
    });

    // Create material supplier partner
    const materialPartner = await Partner.create({
      userId: partnerUser2.id,
      type: 'material_supplier',
      businessName: 'Wilson Material Supply',
      businessLicense: 'BC987654321',
      taxId: 'TX123456789',
      yearsInBusiness: 10,
      description: 'Premium construction materials supplier with quality guarantee.',
      services: ['Sand Supply', 'Gravel Supply', 'Steel Supply', 'Brick Supply'],
      address: {
        street: 'No. 156, Industrial Road',
        city: 'Kelaniya',
        state: 'Western Province',
        zipCode: '11500',
        country: 'Sri Lanka'
      },
      contact: {
        phone: '+94 76 1098385',
        email: 'sarah@autox.lk'
      },
      insurance: {
        provider: 'Material Insurance Co',
        policyNumber: 'MI987654321',
        expiryDate: '2025-12-31',
        coverage: 'Product liability coverage'
      },
      bankDetails: {
        accountHolderName: 'Wilson Material Supply',
        bankName: 'Second National Bank',
        accountNumber: '0987654321',
        routingNumber: '123456789',
        accountType: 'business'
      },
      verificationStatus: 'approved',
      reviewedBy: adminUser.id,
      reviewedAt: new Date(),
      rating: 4.9,
      ratingCount: 40,
      totalJobs: 200,
      completedJobs: 195,
      totalEarnings: 85000.00
    });

    // Create sample vehicles
    const vehicles = [
      {
        ownerId: vehiclePartner.id,
        name: 'JCB 3CX Excavator',
        description: 'Heavy-duty excavator perfect for digging and construction work',
        category: 'excavator',
        type: 'Backhoe Loader',
        model: '3CX',
        year: 2020,
        pricePerHour: 32000.00,
        pricePerDay: 210000.00,
        specifications: {
          operatingWeight: '8.5 tons',
          maxDiggingDepth: '5.2m',
          bucketCapacity: '0.28m³',
          enginePower: '74kW',
          fuelCapacity: '150L'
        },
        images: [
          {
            url: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'JCB Excavator'
          }
        ],
        location: {
          address: '123 Industrial Ave',
          city: 'Construction City',
          state: 'CA',
          zipCode: '90210'
        },
        insurance: {
          provider: 'Equipment Insurance Co',
          policyNumber: 'EQ123456789',
          expiryDate: '2025-06-30',
          coverage: 'Full coverage'
        },
        operatorIncluded: true,
        operatorDetails: {
          name: 'Bob Smith',
          experience: '10 years',
          certifications: ['Heavy Equipment Operator', 'Safety Certified']
        },
        features: ['GPS Tracking', 'Air Conditioning', 'Hydraulic Hammer'],
        rating: 4.7,
        ratingCount: 15,
        status: 'active',
        featured: true
      },
      {
        ownerId: vehiclePartner.id,
        name: 'Volvo FH16 Transport Truck',
        description: 'Large capacity truck for material transportation',
        category: 'truck',
        type: 'Heavy Duty Truck',
        model: 'FH16',
        year: 2019,
        pricePerHour: 21000.00,
        pricePerDay: 135000.00,
        specifications: {
          payload: '25 tons',
          bedLength: '8.5m',
          width: '2.5m',
          enginePower: '460hp'
        },
        images: [
          {
            url: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Transport Truck'
          }
        ],
        location: {
          address: '123 Industrial Ave',
          city: 'Construction City',
          state: 'CA',
          zipCode: '90210'
        },
        insurance: {
          provider: 'Transport Insurance Co',
          policyNumber: 'TR123456789',
          expiryDate: '2025-08-31',
          coverage: 'Commercial vehicle coverage'
        },
        operatorIncluded: true,
        features: ['GPS Tracking', 'Cargo Securing System', 'Hydraulic Lift'],
        rating: 4.5,
        ratingCount: 12,
        status: 'active'
      }
    ];

    await Vehicle.bulkCreate(vehicles);

    // Create sample materials
    const materials = [
      {
        supplierId: materialPartner.id,
        name: 'Premium River Sand',
        description: 'High-quality river sand perfect for construction work. Clean, well-graded sand suitable for concrete mixing and masonry work.',
        category: 'sand',
        pricePerUnit: 6500.00,
        unit: 'cubic_meter',
        minimumOrder: 5,
        availableQuantity: 1000,
        images: [
          {
            url: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'River Sand'
          }
        ],
        specifications: {
          grade: 'Premium',
          size: '0.1-2mm',
          origin: 'Local River',
          moisture: '<5%'
        },
        qualityCertifications: ['ISO 9001', 'Quality Tested'],
        deliveryAreas: ['Construction City', 'Material City', 'Industrial Zone'],
        deliveryTimeframe: 'Same day delivery available',
        isAvailable: true,
        featured: true,
        rating: 4.8,
        ratingCount: 30,
        tags: ['premium', 'construction', 'concrete']
      },
      {
        supplierId: materialPartner.id,
        name: 'Premium Garden Soil',
        description: 'Rich, fertile soil ideal for landscaping and gardening projects. Nutrient-rich composition.',
        category: 'soil',
        pricePerUnit: 7500.00,
        unit: 'cubic_meter',
        minimumOrder: 3,
        availableQuantity: 500,
        images: [
          {
            url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Garden Soil'
          }
        ],
        specifications: {
          type: 'Topsoil',
          ph: '6.0-7.0',
          organicMatter: '>3%',
          nutrients: 'NPK enriched'
        },
        qualityCertifications: ['Organic Certified', 'Soil Tested'],
        deliveryAreas: ['Construction City', 'Material City', 'Residential Areas'],
        deliveryTimeframe: 'Next day delivery',
        isAvailable: true,
        rating: 4.6,
        ratingCount: 25,
        tags: ['soil', 'landscaping', 'organic']
      },
      {
        supplierId: materialPartner.id,
        name: 'Red Clay Bricks',
        description: 'Durable clay bricks for construction and masonry work. High compressive strength.',
        category: 'bricks',
        pricePerUnit: 32000.00,
        unit: 'per_1000_pieces',
        minimumOrder: 500,
        availableQuantity: 10000,
        images: [
          {
            url: 'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Clay Bricks'
          }
        ],
        specifications: {
          type: 'Solid Clay Brick',
          size: '230x110x75mm',
          strength: '10 MPa',
          absorption: '<15%'
        },
        qualityCertifications: ['IS 1077 Certified', 'Quality Tested'],
        deliveryAreas: ['Construction City', 'Material City'],
        deliveryTimeframe: '2-3 business days',
        isAvailable: true,
        rating: 4.7,
        ratingCount: 18,
        tags: ['bricks', 'masonry', 'durable']
      }
    ];

    await Material.bulkCreate(materials);

    console.log('✅ Database seeded successfully!');
    console.log('📧 Admin login: admin@autox.com / admin123');
    console.log('👤 Customer login: john@example.com / password123');
    console.log('🚛 Vehicle Partner login: mike@constructionco.com / password123');
    console.log('📦 Material Partner login: sarah@materialsupply.com / password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedData();