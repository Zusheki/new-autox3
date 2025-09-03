export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'consumer' | 'vehicle_owner' | 'material_supplier' | 'admin';
  isAuthenticated: boolean;
  address?: string;
  bio?: string;
  profileImage?: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  image: string;
  available: boolean;
  supplier: {
    name: string;
    location: string;
    district: string;
    phone: string;
    rating: number;
    totalOrders: number;
  };
}

export interface Vehicle {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerHour: number;
  pricePerDay: number;
  image: string;
  available: boolean;
  specifications: string[];
  supplier: {
    name: string;
    location: string;
    district: string;
    phone: string;
    rating: number;
    totalJobs: number;
  };
}

export interface ServiceRequest {
  id: string;
  userId: string;
  type: 'material' | 'vehicle';
  itemId: string;
  quantity?: number;
  duration?: number;
  durationType?: 'hours' | 'days';
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  requestDate: string;
  requiredDate: string;
  address: string;
  notes?: string;
}

export interface Partner {
  id: string;
  type: 'vehicle_owner' | 'material_supplier';
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  businessLicense: string;
  brNumber: string;
  yearsInBusiness: number;
  description: string;
  services: string[];
  certifications: string[];
  insuranceDetails: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  documents: {
    businessLicense: File | null;
    insurance: File | null;
    brCertificate: File | null;
    vehiclePhotos?: File[];
  };
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  registrationDate: string;
  approvalDate?: string;
  rating: number;
  totalJobs: number;
  notifications: Notification[];
  // Virtual dashboard tracking
  hasEditedProfile?: boolean;
  hasAddedVehicle?: boolean;
  hasDeletedVehicle?: boolean;
  profileViews?: number;
  vehicles?: PartnerVehicle[];
}

export interface Notification {
  id: string;
  type: 'contact_request' | 'inquiry' | 'booking_request';
  from: {
    name: string;
    phone: string;
    email: string;
    profileImage?: string;
  };
  message: string;
  itemName: string;
  itemType: 'material' | 'vehicle';
  timestamp: string;
  read: boolean;
}

export interface PartnerVehicle {
  id: string;
  partnerId: string;
  name: string;
  type: string;
  model: string;
  year: number;
  description: string;
  pricePerHour: number;
  pricePerDay: number;
  specifications: string[];
  images: string[];
  available: boolean;
  location: string;
  insuranceDetails: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  maintenanceRecords: {
    lastService: string;
    nextService: string;
    certifications: string[];
  };
  status: 'active' | 'maintenance' | 'inactive';
}

export interface PartnerMaterial {
  id: string;
  partnerId: string;
  name: string;
  category: string;
  description: string;
  pricePerUnit: number;
  unit: string;
  minimumOrder: number;
  availableQuantity: number;
  images: string[];
  qualityCertifications: string[];
  deliveryAreas: string[];
  deliveryTimeframe: string;
  status: 'active' | 'out_of_stock' | 'inactive';
}