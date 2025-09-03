import React, { useState } from 'react';
import { User as UserType } from '../types';

type ViewType = 'home' | 'vehicles' | 'materials' | 'about' | 'contact' | 'signup' | 'dashboard' | 'profile' | 'confirmation' | 'services' | 'vehicle-listing' | 'material-listing' | 'vehicle-details' | 'vehicle-management' | 'material-management';

interface HeaderProps {
  user: UserType | null;
  onLogin: (user: UserType) => void;
  onLogout: () => void;
  onMenuClick: () => void;
  isMenuOpen: boolean;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onHomeNavigate: () => void;
  onShowLogin: () => void;
  onShowSignUp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogin,
  onLogout,
  onMenuClick,
  isMenuOpen,
  currentView,
  onNavigate,
  onHomeNavigate,
  onShowLogin,
  onShowSignUp
}) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const getNavItems = () => {
    if (user) {
      // Authenticated user navigation
      switch (user.role) {
        case 'consumer':
          return [
            { id: 'home', label: 'Home' },
            { id: 'vehicles', label: 'Vehicles' },
            { id: 'materials', label: 'Materials' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' }
          ];
        case 'vehicle_owner':
          return [
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'vehicle-management', label: 'Vehicle Management' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' }
          ];
        case 'material_supplier':
          return [
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'material-management', label: 'Material Management' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' }
          ];
        case 'admin':
          return [
            { id: 'dashboard', label: 'Admin Dashboard' },
            { id: 'vehicles', label: 'Vehicles' },
            { id: 'materials', label: 'Materials' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' }
          ];
        default:
          return [
            { id: 'home', label: 'Home' },
            { id: 'vehicles', label: 'Vehicles' },
            { id: 'materials', label: 'Materials' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' }
          ];
      }
    } else {
      // Guest navigation
      return [
        { id: 'home', label: 'Home' },
        { id: 'vehicles', label: 'Vehicles' },
        { id: 'materials', label: 'Materials' },
        { id: 'about', label: 'About' },
        { id: 'contact', label: 'Contact' }
      ];
    }
  };

  const navItems = getNavItems();

  const handleNavClick = (viewId: string) => {
    if (viewId === 'home') {
      onHomeNavigate();
    } else if (viewId === 'vehicle-management' || viewId === 'material-management') {
      onNavigate('vehicle-management' as ViewType);
    } else {
      onNavigate(viewId as ViewType);
    }
    setShowProfileDropdown(false);
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    const firstName = user.name.split(' ')[0];
    return firstName.length > 10 ? firstName.substring(0, 10) + '...' : firstName;
  };

  const getUserRoleDisplay = () => {
    switch (user?.role) {
      case 'consumer':
        return 'Service Consumer';
      case 'vehicle_owner':
        return 'Vehicle Owner';
      case 'material_supplier':
        return 'Material Supplier';
      case 'admin':
        return 'Administrator';
      default:
        return 'User';
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            onClick={onHomeNavigate}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="text-white text-2xl font-bold">A</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                Auto X
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">Heavy Vehicle & Material Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentView === item.id
                    ? 'bg-yellow-100 text-yellow-700 shadow-sm'
                    : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-yellow-600 text-sm font-bold">U</span>
                    )}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-bold">{getUserDisplayName()}</div>
                    <div className="text-xs opacity-80">{getUserRoleDisplay()}</div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-yellow-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                          {user.profileImage ? (
                            <img 
                              src={user.profileImage} 
                              alt="Profile" 
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white text-lg font-bold">U</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{getUserRoleDisplay()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button
                        onClick={() => {
                          onNavigate('profile');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <span className="text-gray-700">View Profile</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          onLogout();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 text-left px-4 py-3 hover:bg-red-50 rounded-xl transition-colors text-red-600"
                      >
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onShowLogin}
                  className="text-gray-600 hover:text-yellow-600 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-50 transition-all duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={onShowSignUp}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-300"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item.id);
                    onMenuClick(); // Close menu
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
              
              {!user && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button
                    onClick={() => {
                      onShowLogin();
                      onMenuClick();
                    }}
                    className="w-full text-left px-4 py-3 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all duration-300 font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onShowSignUp();
                      onMenuClick();
                    }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold flex items-center space-x-2"
                  >
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </header>
  );
};