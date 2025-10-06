import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useNotification } from '../context/NotificationContext';
import NotificationSidebar from './NotificationSidebar';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const { notifications, sidebarOpen, setSidebarOpen } = useNotification();
  const unreadCount = notifications.filter(n => !n.read).length;

  // Professional Bell SVG
  const BellIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );

  // Check if current path matches the link
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Get active link styles - TEXT ONLY HIGHLIGHTING
  const getNavLinkStyle = (path, baseColor = '#6b7280', activeColor = '#6366f1') => ({
    color: isActivePath(path) ? activeColor : baseColor,
    fontWeight: isActivePath(path) ? '600' : '500',
    fontSize: '0.875rem',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.15s ease',
    textDecoration: 'none',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    background: 'transparent' // No background highlighting
  });

  return (
    <>
      <BootstrapNavbar 
        expand="lg" 
        sticky="top"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          padding: '0',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1030,
          minHeight: '60px'
        }}
      >
        <Container 
          fluid 
          className="navbar-container"
          style={{ 
            maxWidth: '1200px',
            padding: '0 24px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* LEFT SIDE - BRAND ONLY */}
          <BootstrapNavbar.Brand 
            as={Link} 
            to={isAuthenticated && user?.role === 'admin' ? '/admin/dashboard' : '/'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#111827',
              textDecoration: 'none',
              letterSpacing: '-0.025em',
              transition: 'opacity 0.2s ease',
              userSelect: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {/* Professional Logo */}
            <div style={{
              width: '28px',
              height: '28px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                <path d="M3 9.5L12 4l9 5.5v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z"/>
                <polyline points="9,22 9,12 15,12 15,22" fill="rgba(99, 102, 241, 0.1)" stroke="white" strokeWidth="0.5"/>
              </svg>
            </div>
            SpaceLink
          </BootstrapNavbar.Brand>

          {/* SPACER TO PUSH EVERYTHING RIGHT */}
          <div style={{ flex: 1 }}></div>
          {/* Notification icon for mobile view only */}
          {isAuthenticated && (
            <div className="navbar-mobile-notification">
              <Button
                variant="outline-light"
                onClick={() => setSidebarOpen(true)}
                aria-label="Notifications"
                style={{ 
                  border: 'none',
                  background: 'transparent',
                  borderRadius: '6px',
                  padding: '8px',
                  color: '#6b7280',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  minWidth: '32px'
                }}
              >
                <BellIcon />
                {unreadCount > 0 && (
                  <Badge
                    style={{
                      position: 'absolute',
                      top: '1px',
                      right: '1px',
                      background: '#ef4444',
                      color: 'white',
                      minWidth: '16px',
                      height: '16px',
                      fontSize: '0.65rem',
                      padding: '0 4px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '600',
                      border: '1.5px solid white',
                      zIndex: 2
                    }}
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </div>
          )}

          {/* Toggle Button */}
          <BootstrapNavbar.Toggle 
            aria-controls="basic-navbar-nav"
            style={{
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              padding: '4px 8px',
              background: 'transparent',
              boxShadow: 'none'
            }}
          />

          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            {/* RIGHT SIDE - ALL NAVIGATION */}
            <Nav className="ms-auto align-items-lg-center navbar-nav-responsive">
              
              {/* NAVIGATION LINKS - FIXED LOGIC */}
              {isAuthenticated && user?.role === 'admin' && (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/admin/dashboard"
                    style={getNavLinkStyle('/admin/dashboard')}
                    onMouseEnter={(e) => {
                      if (!isActivePath('/admin/dashboard')) {
                        e.currentTarget.style.color = '#2563eb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActivePath('/admin/dashboard')) {
                        e.currentTarget.style.color = '#6b7280';
                      }
                    }}
                  >
                    Dashboard
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/admin/verify-properties"
                    style={getNavLinkStyle('/admin/verify-properties')}
                    onMouseEnter={(e) => {
                      if (!isActivePath('/admin/verify-properties')) {
                        e.currentTarget.style.color = '#16a34a';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActivePath('/admin/verify-properties')) {
                        e.currentTarget.style.color = '#6b7280';
                      }
                    }}
                  >
                    Verify Properties
                  </Nav.Link>
                </>
              )}
              
              {isAuthenticated && user?.role !== 'admin' && (
                <>
                  {/* ONLY ONE Find Property for regular users */}
                  <Nav.Link 
                    as={Link} 
                    to="/find-property"
                    style={getNavLinkStyle('/find-property')}
                    onMouseEnter={(e) => {
                      if (!isActivePath('/find-property')) {
                        e.currentTarget.style.color = '#374151';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActivePath('/find-property')) {
                        e.currentTarget.style.color = '#6b7280';
                      }
                    }}
                  >
                    Find Property
                  </Nav.Link>
                  
                  <Nav.Link 
                    as={Link} 
                    to="/my-bookings"
                    style={getNavLinkStyle('/my-bookings')}
                    onMouseEnter={(e) => {
                      if (!isActivePath('/my-bookings')) {
                        e.currentTarget.style.color = '#2563eb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActivePath('/my-bookings')) {
                        e.currentTarget.style.color = '#6b7280';
                      }
                    }}
                  >
                    My Bookings
                  </Nav.Link>
                  
                  {/* Properties Dropdown - Matches Profile Style */}
                  <NavDropdown 
                    title={
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: (location.pathname.includes('/add-property') || 
                               location.pathname.includes('/manage-properties') || 
                               location.pathname.includes('/my-property-status')) ? '#6366f1' : '#6b7280',
                        fontWeight: (location.pathname.includes('/add-property') || 
                                    location.pathname.includes('/manage-properties') || 
                                    location.pathname.includes('/my-property-status')) ? '600' : '500',
                        fontSize: '0.875rem',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        transition: 'all 0.15s ease',
                        height: '36px',
                        whiteSpace: 'nowrap',
                        background: 'transparent'
                      }}>
                        Properties
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginTop: '1px' }}>
                          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      </span>
                    }
                    id="property-dropdown"
                    align="end"
                  >
                    {/* Clean Menu Items */}
                    <NavDropdown.Item 
                      as={Link} 
                      to="/add-property"
                      style={{
                        padding: '10px 16px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151',
                        borderRadius: '6px',
                        margin: '2px 6px',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        border: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.color = '#111827';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }}
                    >
                      Add Property
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item 
                      as={Link} 
                      to="/manage-properties"
                      style={{
                        padding: '10px 16px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151',
                        borderRadius: '6px',
                        margin: '2px 6px',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        border: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.color = '#111827';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }}
                    >
                      Manage Properties
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item 
                      as={Link} 
                      to="/my-property-status"
                      style={{
                        padding: '10px 16px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151',
                        borderRadius: '6px',
                        margin: '2px 6px',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        border: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.color = '#111827';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }}
                    >
                      Property Status
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              {/* ONLY show Find Property for non-authenticated users */}
              {!isAuthenticated && (
                <Nav.Link 
                  as={Link} 
                  to="/find-property"
                  style={getNavLinkStyle('/find-property')}
                  onMouseEnter={(e) => {
                    if (!isActivePath('/find-property')) {
                      e.currentTarget.style.color = '#374151';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActivePath('/find-property')) {
                      e.currentTarget.style.color = '#6b7280';
                    }
                  }}
                >
                  Find Property
                </Nav.Link>
              )}

              {/* VERTICAL SEPARATOR - Only when authenticated */}
              {isAuthenticated && (
                <div style={{
                  width: '1px',
                  height: '20px',
                  background: 'rgba(0, 0, 0, 0.1)',
                  margin: '0 12px' // Proper spacing
                }} />
              )}
              
              {/* PROFESSIONAL NOTIFICATION BUTTON - Only when authenticated */}
              {isAuthenticated && (
                <Button
                  variant="outline-light"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Notifications"
                  style={{ 
                    border: 'none',
                    background: 'transparent',
                    borderRadius: '6px',
                    padding: '8px',
                    color: '#6b7280',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    minWidth: '32px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280';
                  }}
                >
                  <BellIcon />
                  {unreadCount > 0 && (
                    <Badge
                      style={{
                        position: 'absolute',
                        top: '1px',
                        right: '1px',
                        background: '#ef4444',
                        color: 'white',
                        minWidth: '16px',
                        height: '16px',
                        fontSize: '0.65rem',
                        padding: '0 4px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600',
                        border: '1.5px solid white',
                        zIndex: 2
                      }}
                    >
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </Badge>
                  )}
                </Button>
              )}
              
              {/* PROFILE SECTION OR LOGIN/REGISTER */}
              {isAuthenticated ? (
                <NavDropdown 
                  title={
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginLeft: '16px'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        flexShrink: 0,
                        cursor: 'pointer'
                      }}>
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ color: '#6b7280' }}>
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </div>
                  }
                  id="user-dropdown" 
                  align="end"
                >
                  {/* Clean Dropdown Header */}
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    margin: '0 0 6px 0',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    {user?.name || 'User'}
                  </div>
                  
                  {/* Clean Menu Items */}
                  <NavDropdown.Item 
                    as={Link} 
                    to="/profile"
                    style={{
                      padding: '10px 16px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      borderRadius: '6px',
                      margin: '2px 6px',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f3f4f6';
                      e.currentTarget.style.color = '#111827';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#374151';
                    }}
                  >
                    Profile Settings
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider style={{
                    margin: '6px 6px',
                    borderColor: 'rgba(0, 0, 0, 0.06)'
                  }} />
                  
                  <NavDropdown.Item 
                    onClick={handleLogout}
                    style={{
                      padding: '10px 16px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      borderRadius: '6px',
                      margin: '2px 6px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fef2f2';
                      e.currentTarget.style.color = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#374151';
                    }}
                  >
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  {/* PROPER SPACING FOR LOGIN/GET STARTED */}
                  <Nav.Link 
                    as={Link} 
                    to="/login"
                    style={{
                      color: '#6b7280',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      marginRight: '8px' // Proper spacing
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#374151';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#6b7280';
                    }}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/register"
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      background: '#6366f1',
                      border: 'none',
                      transition: 'all 0.15s ease',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#5856eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#6366f1';
                    }}
                  >
                    Get Started
                  </Nav.Link>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
      
      <NotificationSidebar />
      
      {/* Professional CSS */}
      <style jsx>{`
        /* Base styles */
        .navbar-mobile-notification {
          display: none;
        }
        
        /* Desktop dropdown styling */
        .dropdown-menu {
          background: white !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          border-radius: 10px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          padding: 6px !important;
          margin-top: 8px !important;
          min-width: 180px !important;
        }
        
        .dropdown-toggle::after {
          display: none !important;
        }
        
        .navbar-toggler {
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          padding: 6px 10px;
        }
        
        .navbar-toggler:focus {
          box-shadow: none !important;
          outline: none !important;
        }
        
        .dropdown-toggle {
          background: transparent !important;
          border: none !important;
        }
        
        /* Mobile Responsive - Industry Standard */
        @media (max-width: 991.98px) {
          /* Container fixes */
          .navbar-container {
            padding: 0 16px !important;
          }
          
          /* Show mobile notification icon in header */
          .navbar-mobile-notification {
            display: flex !important;
            align-items: center;
            margin-left: auto;
            margin-right: 12px;
          }
          
          /* Navbar collapse - clean dropdown appearance */
          #basic-navbar-nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-height: calc(100vh - 60px);
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          
          .navbar-collapse {
            padding: 20px 16px !important;
          }
          
          /* Navigation container */
          .navbar-nav-responsive {
            width: 100%;
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            align-items: stretch !important;
          }
          
          /* All nav items base styling */
          .navbar-nav-responsive > * {
            width: 100% !important;
            margin: 0 !important;
          }
          
          /* Nav links - industry standard mobile button style */
          .navbar-nav-responsive .nav-link {
            width: 100% !important;
            min-height: 48px !important;
            padding: 14px 20px !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            color: #374151 !important;
            background: #f9fafb !important;
            border-radius: 10px !important;
            border: 1px solid transparent !important;
            transition: all 0.2s ease !important;
            white-space: nowrap !important;
            text-decoration: none !important;
          }
          
          .navbar-nav-responsive .nav-link:hover,
          .navbar-nav-responsive .nav-link:focus {
            background: #f3f4f6 !important;
            border-color: rgba(99, 102, 241, 0.2) !important;
            color: #6366f1 !important;
          }
          
          .navbar-nav-responsive .nav-link:active {
            background: #e5e7eb !important;
            transform: scale(0.98);
          }
          
          /* Dropdown wrapper */
          .navbar-nav-responsive .nav-item.dropdown,
          .navbar-nav-responsive .dropdown {
            width: 100% !important;
            margin: 0 !important;
            position: relative !important;
          }
          
          /* Dropdown toggle button */
          .navbar-nav-responsive .dropdown-toggle {
            width: 100% !important;
            min-height: 48px !important;
            padding: 14px 20px !important;
            margin: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            color: #374151 !important;
            background: #f9fafb !important;
            border-radius: 10px !important;
            border: 1px solid transparent !important;
            transition: all 0.2s ease !important;
            white-space: nowrap !important;
          }
          
          .navbar-nav-responsive .dropdown-toggle:hover,
          .navbar-nav-responsive .dropdown-toggle:focus {
            background: #f3f4f6 !important;
            border-color: rgba(99, 102, 241, 0.2) !important;
            color: #6366f1 !important;
          }
          
          .navbar-nav-responsive .dropdown.show .dropdown-toggle {
            background: #f3f4f6 !important;
            color: #6366f1 !important;
          }
          
          /* Dropdown menu - seamless integration - FORCE FULL WIDTH */
          .navbar-nav-responsive .dropdown-menu,
          .navbar-nav-responsive .dropdown-menu[data-bs-popper] {
            position: static !important;
            float: none !important;
            width: 100% !important;
            margin: 8px 0 0 0 !important;
            padding: 12px 0 !important;
            border: none !important;
            border-radius: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
            transform: none !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            bottom: auto !important;
            inset: auto !important;
          }
          
          /* Additional override for Bootstrap popper positioning */
          .navbar-nav-responsive .dropdown-menu[style] {
            position: static !important;
            transform: none !important;
            inset: auto !important;
            margin: 8px 0 0 0 !important;
          }
          
          .navbar-nav-responsive .dropdown-menu .dropdown-item {
            width: 100% !important;
            min-height: 44px !important;
            padding: 12px 20px !important;
            margin: 0 !important;
            font-size: 0.95rem !important;
            font-weight: 500 !important;
            color: #374151 !important;
            background: transparent !important;
            border-radius: 0 !important;
            text-align: center !important;
            transition: all 0.2s ease !important;
            white-space: nowrap !important;
            border: none !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
          }
          
          .navbar-nav-responsive .dropdown-menu .dropdown-item:last-child {
            border-bottom: none !important;
          }
          
          .navbar-nav-responsive .dropdown-menu .dropdown-item:hover,
          .navbar-nav-responsive .dropdown-menu .dropdown-item:focus {
            background: #f9fafb !important;
            color: #111827 !important;
          }
          
          .navbar-nav-responsive .dropdown-menu .dropdown-item:active {
            background: #f3f4f6 !important;
          }
          
          /* Profile dropdown header */
          .navbar-nav-responsive .dropdown-menu > div:first-child {
            padding: 12px 16px 8px !important;
            margin-bottom: 6px !important;
            font-size: 0.95rem !important;
            font-weight: 600 !important;
            color: #111827 !important;
            text-align: center !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
          }
          
          /* Dropdown divider */
          .navbar-nav-responsive .dropdown-divider {
            margin: 6px 8px !important;
            border-color: rgba(0, 0, 0, 0.06) !important;
          }
          
          /* Hide desktop elements */
          .navbar-nav-responsive > div[style*="width: 1px"],
          .navbar-nav-responsive > div[style*="height: 20px"],
          .navbar-nav-responsive > button[aria-label="Notifications"] {
            display: none !important;
          }
          
          /* Login/Register buttons */
          .navbar-nav-responsive .nav-link[href="/login"] {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            color: #374151 !important;
          }
          
          .navbar-nav-responsive .nav-link[href="/login"]:hover {
            background: #f9fafb !important;
            border-color: #6366f1 !important;
            color: #6366f1 !important;
          }
          
          .navbar-nav-responsive .nav-link[href="/register"] {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
            color: white !important;
            border: none !important;
            font-weight: 700 !important;
          }
          
          .navbar-nav-responsive .nav-link[href="/register"]:hover {
            background: linear-gradient(135deg, #5856eb 0%, #7c3aed 100%) !important;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
          }
          
          /* Profile avatar in dropdown toggle */
          .navbar-nav-responsive .dropdown-toggle > div {
            margin: 0 auto !important;
          }
        }
        
        /* Small mobile devices */
        @media (max-width: 575.98px) {
          .navbar-container {
            padding: 0 12px !important;
          }
          
          .navbar-brand {
            font-size: 1.15rem !important;
          }
          
          .navbar-brand > div:first-child {
            width: 26px !important;
            height: 26px !important;
          }
          
          .navbar-collapse {
            padding: 16px 12px !important;
          }
          
          .navbar-nav-responsive .nav-link,
          .navbar-nav-responsive .dropdown-toggle {
            min-height: 44px !important;
            padding: 12px 16px !important;
            font-size: 0.95rem !important;
          }
          
          .navbar-nav-responsive .dropdown-menu .dropdown-item {
            min-height: 40px !important;
            padding: 10px 14px !important;
            font-size: 0.9rem !important;
          }
        }
        
        /* Landscape orientation */
        @media (max-width: 991.98px) and (orientation: landscape) {
          #basic-navbar-nav {
            max-height: 80vh !important;
          }
          
          .navbar-nav-responsive {
            gap: 8px !important;
          }
          
          .navbar-nav-responsive .nav-link,
          .navbar-nav-responsive .dropdown-toggle {
            min-height: 42px !important;
            padding: 10px 16px !important;
            font-size: 0.9rem !important;
          }
        }
        
        /* Tablet and up - keep desktop behavior */
        @media (min-width: 992px) {
          .navbar-nav-responsive {
            flex-direction: row !important;
            gap: 0 !important;
          }
          
          #basic-navbar-nav {
            position: static !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
        
        /* Smooth transitions */
        .navbar-collapse.collapsing {
          transition: height 0.3s ease !important;
        }
        
        .navbar-collapse.show {
          transition: height 0.3s ease !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;
