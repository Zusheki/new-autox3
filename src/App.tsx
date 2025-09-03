import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { GuestVehiclePage } from './components/GuestVehiclePage';
import { GuestMaterialPage } from './components/GuestMaterialPage';
import { SignUpPage } from './components/SignUpPage';
import { AuthModal } from './components/AuthModal';
import { ConfirmationPage } from './components/ConfirmationPage';
import { ServiceDashboard } from './components/ServiceDashboard';
import { VehicleListingPage } from './components/VehicleListingPage';
import { MaterialListingPage } from './components/MaterialListingPage';
import { VehicleDetailsPage } from './components/VehicleDetailsPage';
import { ProfilePage } from './components/ProfilePage';
import { VehicleOwnerRegistration } from './components/VehicleOwnerRegistration';
import { MaterialSupplierRegistration } from './components/MaterialSupplierRegistration';
import { VirtualDashboard } from './components/VirtualDashboard';
import { VehicleManagementPage } from './components/VehicleManagementPage';
import { MaterialManagementPage } from './components/MaterialManagementPage';
import { User, Partner } from './types';

type ViewType = 'home' | 'vehicles' | 'materials' | 'about' | 'contact' | 'signup' | 'dashboard' | 'profile' | 'confirmation' | 'services' | 'vehicle-listing' | 'material-listing' | 'vehicle-details' | 'vehicle-management';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [user, setUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showVehicleOwnerRegistration, setShowVehicleOwnerRegistration] = useState(false);
  const [showMaterialSupplierRegistration, setShowMaterialSupplierRegistration] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowAuthModal(false);
    
    // Redirect based on user role after successful login
    redirectUserToDashboard(userData);
  };

  const redirectUserToDashboard = (userData: User) => {
    switch (userData.role) {
      case 'consumer':
        // Consumer users go to service dashboard
        setCurrentView('dashboard');
        break;
        
      case 'vehicle_owner':
        // Vehicle owners go to vehicle management
        createPartnerProfile(userData, 'vehicle_owner');
        setCurrentView('vehicle-management');
        break;
        
      case 'material_supplier':
        // Material suppliers go to material management
        createPartnerProfile(userData, 'material_supplier');
        setCurrentView('vehicle-management'); // This will show material management for material suppliers
        break;
        
      case 'admin':
        // Admin users go to admin dashboard (for now, redirect to regular dashboard)
        setCurrentView('dashboard');
        break;
        
      default:
        // Default to home page
        setCurrentView('home');
        break;
    }
  };

  const createPartnerProfile = (userData: User, type: 'vehicle_owner' | 'material_supplier') => {
    const mockPartner: Partner = {
      id: Date.now().toString(),
      type: type,
      businessName: getBusinessName(userData, type),
      ownerName: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: getDefaultAddress(userData.email),
      district: getDefaultDistrict(userData.email),
      businessLicense: 'BL' + Date.now(),
      brNumber: 'BR' + Date.now(),
      yearsInBusiness: getYearsInBusiness(userData.email),
      description: getBusinessDescription(userData, type),
      services: getDefaultServices(type),
      certifications: getDefaultCertifications(type),
      insuranceDetails: {
        provider: 'Lanka Insurance Company',
        policyNumber: 'POL' + Date.now(),
        expiryDate: '2025-12-31'
      },
      documents: {
        businessLicense: null,
        insurance: null,
        brCertificate: null,
        vehiclePhotos: []
      },
      status: 'approved',
      registrationDate: new Date().toISOString(),
      rating: getDefaultRating(userData.email),
      totalJobs: getDefaultTotalJobs(userData.email),
      notifications: []
    };
    setPartner(mockPartner);
  };

  // Helper functions to create realistic partner data based on email
  const getBusinessName = (userData: User, type: 'vehicle_owner' | 'material_supplier') => {
    if (userData.email === 'mike@vehicles.com') return 'Johnson Construction Equipment';
    if (userData.email === 'sarah@materials.com') return 'Wilson Material Supply';
    return userData.name + (type === 'vehicle_owner' ? ' Vehicle Services' : ' Material Supply');
  };

  const getDefaultAddress = (email: string) => {
    if (email === 'mike@vehicles.com') return 'No. 245, Lakeview Avenue, Nugegoda';
    if (email === 'sarah@materials.com') return 'No. 156, Industrial Road, Kelaniya';
    return 'Sample Business Address';
  };

  const getDefaultDistrict = (email: string) => {
    if (email === 'mike@vehicles.com') return 'Colombo';
    if (email === 'sarah@materials.com') return 'Gampaha';
    return 'Colombo';
  };

  const getYearsInBusiness = (email: string) => {
    if (email === 'mike@vehicles.com') return 15;
    if (email === 'sarah@materials.com') return 10;
    return 5;
  };

  const getBusinessDescription = (userData: User, type: 'vehicle_owner' | 'material_supplier') => {
    if (userData.email === 'mike@vehicles.com') {
      return 'Professional construction equipment rental with experienced operators. Specializing in JCBs, excavators, and heavy machinery.';
    }
    if (userData.email === 'sarah@materials.com') {
      return 'Premium construction materials supplier with quality guarantee. Providing sand, soil, bricks, and other building materials.';
    }
    return `Professional ${type === 'vehicle_owner' ? 'vehicle rental' : 'material supply'} services`;
  };

  const getDefaultServices = (type: 'vehicle_owner' | 'material_supplier') => {
    if (type === 'vehicle_owner') {
      return ['Excavation Services', 'Transportation', 'Crane Operations', 'Material Handling'];
    } else {
      return ['Sand Supply', 'Gravel Supply', 'Steel Supply', 'Brick Supply'];
    }
  };

  const getDefaultCertifications = (type: 'vehicle_owner' | 'material_supplier') => {
    if (type === 'vehicle_owner') {
      return ['Heavy Equipment Operator', 'Safety Certified', 'Insurance Verified'];
    } else {
      return ['ISO 9001', 'Quality Tested', 'SLSI Certified'];
    }
  };

  const getDefaultRating = (email: string) => {
    if (email === 'mike@vehicles.com') return 4.8;
    if (email === 'sarah@materials.com') return 4.9;
    return 4.5;
  };

  const getDefaultTotalJobs = (email: string) => {
    if (email === 'mike@vehicles.com') return 150;
    if (email === 'sarah@materials.com') return 200;
    return 25;
  };

  const handleLogout = () => {
    setUser(null);
    setPartner(null);
    setCurrentView('home');
  };

  const handleRegistration = (data: any) => {
    setRegistrationData(data);
    setCurrentView('confirmation');
  };

  const handleVehicleOwnerRegistration = (data: any) => {
    setRegistrationData(data);
    setShowVehicleOwnerRegistration(false);
    setCurrentView('confirmation');
  };

  const handleMaterialSupplierRegistration = (data: any) => {
    setRegistrationData(data);
    setShowMaterialSupplierRegistration(false);
    setCurrentView('confirmation');
  };

  const handleConfirmationAction = (action: 'dashboard' | 'services') => {
    if (action === 'dashboard') {
      // Create user from registration data
      const newUser: User = {
        id: Date.now().toString(),
        name: registrationData.name || registrationData.fullName,
        email: registrationData.email,
        phone: registrationData.phone || registrationData.mobileNumber,
        role: registrationData.role,
        isAuthenticated: true,
        address: registrationData.address
      };
      setUser(newUser);

      if (registrationData.role === 'consumer') {
        setCurrentView('dashboard');
      } else {
        // Create partner for business users
        const newPartner: Partner = {
          id: Date.now().toString(),
          type: registrationData.role,
          businessName: registrationData.businessName || registrationData.businessBrandName || newUser.name + ' Business',
          ownerName: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          address: registrationData.address,
          district: registrationData.district,
          businessLicense: 'BL' + Date.now(),
          brNumber: 'BR' + Date.now(),
          yearsInBusiness: registrationData.yearsInBusiness || 1,
          description: registrationData.description || 'Professional service provider',
          services: registrationData.services || ['General Services'],
          certifications: registrationData.certifications || [],
          insuranceDetails: {
            provider: 'Sample Insurance',
            policyNumber: 'POL' + Date.now(),
            expiryDate: '2025-12-31'
          },
          documents: {
            businessLicense: null,
            insurance: null,
            brCertificate: null,
            vehiclePhotos: []
          },
          status: 'pending',
          registrationDate: new Date().toISOString(),
          rating: 0,
          totalJobs: 0,
          notifications: []
        };
        setPartner(newPartner);
        setCurrentView('vehicle-management');
      }
    } else if (action === 'services') {
      // Create user from registration data and go to services
      const newUser: User = {
        id: Date.now().toString(),
        name: registrationData.name || registrationData.fullName,
        email: registrationData.email,
        phone: registrationData.phone || registrationData.mobileNumber,
        role: registrationData.role,
        isAuthenticated: true,
        address: registrationData.address
      };
      setUser(newUser);
      
      if (registrationData.role === 'consumer') {
        setCurrentView('services');
      } else {
        // Create partner for business users and go to services
        const newPartner: Partner = {
          id: Date.now().toString(),
          type: registrationData.role,
          businessName: registrationData.businessName || registrationData.businessBrandName || newUser.name + ' Business',
          ownerName: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          address: registrationData.address,
          district: registrationData.district,
          businessLicense: 'BL' + Date.now(),
          brNumber: 'BR' + Date.now(),
          yearsInBusiness: registrationData.yearsInBusiness || 1,
          description: registrationData.description || 'Professional service provider',
          services: registrationData.services || ['General Services'],
          certifications: registrationData.certifications || [],
          insuranceDetails: {
            provider: 'Sample Insurance',
            policyNumber: 'POL' + Date.now(),
            expiryDate: '2025-12-31'
          },
          documents: {
            businessLicense: null,
            insurance: null,
            brCertificate: null,
            vehiclePhotos: []
          },
          status: 'pending',
          registrationDate: new Date().toISOString(),
          rating: 0,
          totalJobs: 0,
          notifications: []
        };
        setPartner(newPartner);
        setCurrentView('services');
      }
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const handleHomeNavigation = () => {
    if (user) {
      switch (user.role) {
        case 'vehicle_owner':
          setCurrentView('vehicle-management');
          break;
        case 'material_supplier':
          setCurrentView('vehicle-management'); // This will show material management for material suppliers
          break;
        case 'consumer':
        default:
          setCurrentView('home');
          break;
      }
    } else {
      setCurrentView('home');
    }
  };

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setCurrentView('vehicle-details');
  };

  const handleUpdateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const handleUpdatePartner = (partnerData: Partial<Partner>) => {
    if (partner) {
      setPartner({ ...partner, ...partnerData });
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onLogin={() => setShowAuthModal(true)} onSignUp={() => setCurrentView('signup')} />;
      case 'vehicles':
        return <GuestVehiclePage onSignUp={() => setCurrentView('signup')} />;
      case 'materials':
        return <GuestMaterialPage onSignUp={() => setCurrentView('signup')} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'signup':
        return (
          <SignUpPage 
            onRegistration={handleRegistration}
            onVehicleOwnerSignUp={() => setShowVehicleOwnerRegistration(true)}
            onMaterialSupplierSignUp={() => setShowMaterialSupplierRegistration(true)}
          />
        );
      case 'services':
      case 'dashboard':
        return user ? (
          <ServiceDashboard 
            user={user}
            onVehicleService={() => setCurrentView('vehicle-listing')}
            onMaterialService={() => setCurrentView('material-listing')}
          />
        ) : (
          <HomePage onLogin={() => setShowAuthModal(true)} onSignUp={() => setCurrentView('signup')} />
        );
      case 'vehicle-listing':
        return <VehicleListingPage 
          onBack={() => setCurrentView('dashboard')}
          onVehicleSelect={handleVehicleSelect}
        />;
      case 'material-listing':
        return <MaterialListingPage 
          onBack={() => setCurrentView('dashboard')}
        />;
      case 'vehicle-details':
        return selectedVehicle ? (
          <VehicleDetailsPage 
            vehicle={selectedVehicle}
            onBack={() => setCurrentView('vehicle-listing')}
          />
        ) : (
          <ServiceDashboard 
            user={user}
            onVehicleService={() => setCurrentView('vehicle-listing')}
            onMaterialService={() => setCurrentView('material-listing')}
          />
        );
      case 'services':
        return user ? (
          <ServiceDashboard 
            user={user}
            onVehicleService={() => setCurrentView('vehicle-listing')}
            onMaterialService={() => setCurrentView('material-listing')}
          />
        ) : (
          <HomePage onLogin={() => setShowAuthModal(true)} onSignUp={() => setCurrentView('signup')} />
        );
      case 'dashboard':
        return user ? (
          user.role === 'consumer' ? (
            <ServiceDashboard 
              user={user}
              onVehicleService={() => setCurrentView('vehicle-listing')}
              onMaterialService={() => setCurrentView('material-listing')}
            />
          ) : (
            partner ? (
              <VirtualDashboard 
                partner={partner}
                onUpdatePartner={handleUpdatePartner}
                onLogout={handleLogout}
                onGoHome={() => setCurrentView('dashboard')}
              />
            ) : null
          )
        ) : (
          <HomePage onLogin={() => setShowAuthModal(true)} onSignUp={() => setCurrentView('signup')} />
        );
      case 'vehicle-management':
        return partner ? (
          partner.type === 'vehicle_owner' ? (
            <VehicleManagementPage
              partner={partner}
              onUpdatePartner={handleUpdatePartner}
              onLogout={handleLogout}
              onNavigate={(page) => {
                if (page === 'home') {
                  setCurrentView('services');
                } else if (page === 'about') {
                  setCurrentView('about');
                } else if (page === 'profile') {
                  setCurrentView('profile');
                } else {
                  setCurrentView('vehicle-management');
                }
              }}
            />
          ) : (
            <MaterialManagementPage
              partner={partner}
              onUpdatePartner={handleUpdatePartner}
              onLogout={handleLogout}
              onNavigate={(page) => {
                if (page === 'home') {
                  setCurrentView('services');
                } else if (page === 'about') {
                  setCurrentView('about');
                } else if (page === 'profile') {
                  setCurrentView('profile');
                } else {
                  setCurrentView('vehicle-management');
                }
              }}
            />
          )
        ) : (
          <HomePage onLogin={() => setShowAuthModal(true)} onSignUp={() => setCurrentView('signup')} />
        );
      case 'profile':
        return user ? (
          <ProfilePage 
            user={user} 
            onUpdateProfile={handleUpdateProfile}
            onBack={() => setCurrentView(user.role === 'consumer' ? 'dashboard' : 'dashboard')}
          />
        ) : null;
      case 'confirmation':
        return (
          <ConfirmationPage 
            onAction={handleConfirmationAction}
            registrationData={registrationData}
          />
        );
      default:
        return <HomePage onLogin={() => setShowAuthModal(true)} onSignUp={() => setCurrentView('signup')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        currentView={currentView}
        onNavigate={handleNavigate}
        onHomeNavigate={handleHomeNavigation}
        onShowLogin={() => setShowAuthModal(true)}
        onShowSignUp={() => setCurrentView('signup')}
      />
      
      {renderCurrentView()}
      
      <Footer onNavigate={handleNavigate} />

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}

      {showVehicleOwnerRegistration && (
        <VehicleOwnerRegistration
          isOpen={showVehicleOwnerRegistration}
          onClose={() => setShowVehicleOwnerRegistration(false)}
          onSubmit={handleVehicleOwnerRegistration}
        />
      )}

      {showMaterialSupplierRegistration && (
        <MaterialSupplierRegistration
          isOpen={showMaterialSupplierRegistration}
          onClose={() => setShowMaterialSupplierRegistration(false)}
          onSubmit={handleMaterialSupplierRegistration}
        />
      )}
    </div>
  );
}

export default App;