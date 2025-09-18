import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui';
import { clubService } from '../../services/api';
import Breadcrumb from '../Breadcrumb';

const BackOfficeLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [clubData, setClubData] = useState(null);
    const { user, logout, hasPermission } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Charger les données du club pour les utilisateurs de type club
    useEffect(() => {
        const loadClubData = async () => {
            if (user?.userType === 'club') {
                try {
                    const response = await clubService.getMyProfile();
                    if (response.success) {
                        setClubData(response.data);
                    }
                } catch (error) {
                    console.error('Erreur lors du chargement des données du club:', error);
                }
            }
        };

        loadClubData();
    }, [user]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/backoffice/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    // Navigation items based on user type
    const getNavigationItems = () => {
        const items = [];

        if (hasPermission('admin')) {
            items.push(
                {
                    name: 'Dashboard Admin',
                    href: '/backoffice/dashboard',
                    icon: 'home',
                    current: location.pathname === '/backoffice/dashboard'
                },
                {
                    name: 'Utilisateurs',
                    href: '/backoffice/users',
                    icon: 'users',
                    current: location.pathname.startsWith('/backoffice/users')
                },
                {
                    name: 'Clubs',
                    href: '/backoffice/clubs',
                    icon: 'star',
                    current: location.pathname.startsWith('/backoffice/clubs')
                },
                {
                    name: 'Événements',
                    href: '/backoffice/events',
                    icon: 'calendar',
                    current: location.pathname.startsWith('/backoffice/events')
                }
            );
        }

        if (hasPermission('club') || hasPermission('club_manager')) {
            items.push(
                {
                    name: 'Dashboard Club',
                    href: '/backoffice/club/dashboard',
                    icon: 'home',
                    current: location.pathname === '/backoffice/club/dashboard'
                },
                {
                    name: 'Mes Événements',
                    href: '/backoffice/club/events',
                    icon: 'calendar',
                    current: location.pathname.startsWith('/backoffice/club/events')
                },
                {
                    name: 'Profil Club',
                    href: '/backoffice/club/profile',
                    icon: 'user',
                    current: location.pathname.startsWith('/backoffice/club/profile')
                }
            );
        }

        return items;
    };

    const getIcon = (iconName) => {
        const icons = {
            home: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            users: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            ),
            star: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            calendar: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            user: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        };
        return icons[iconName] || icons.home;
    };

    const getUserTypeLabel = (userType) => {
        switch (userType) {
            case 'admin':
                return 'Administrateur';
            case 'club_manager':
                return 'Responsable Club';
            case 'club':
                return 'Club';
            default:
                return userType;
        }
    };

    const navigation = getNavigationItems();

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Sidebar mobile */}
            <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
                <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
                    sidebarOpen ? 'opacity-100' : 'opacity-0'
                }`} onClick={() => setSidebarOpen(false)} />
                <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition ease-in-out duration-300 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="sr-only">Fermer sidebar</span>
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <img
                                className="h-8 w-auto"
                                src="/images/logo.png"
                                alt="ESPRIT Student"
                            />
                            <span className="ml-2 text-xl font-bold text-gray-900">BackOffice</span>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item, index) => (
                                <Link
                                    key={`mobile-${item.href}-${index}`}
                                    to={item.href}
                                    className={`${
                                        item.current
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                                >
                                    {getIcon(item.icon)}
                                    <span className="ml-3">{item.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Sidebar desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="/images/logo.png"
                                    alt="ESPRIT Student"
                                />
                            </div>
                            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                                {navigation.map((item, index) => (
                                    <Link
                                        key={`desktop-${item.href}-${index}`}
                                        to={item.href}
                                        className={`${
                                            item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                                    >
                                        {getIcon(item.icon)}
                                        <span className="ml-3">{item.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {user?.userType === 'club' && clubData?.detailsComplets?.logo ? (
                                        <img
                                            className="h-8 w-8 rounded-full object-contain bg-white border border-gray-200"
                                            src={clubData.detailsComplets.logo}
                                            alt={`Logo ${clubData.nom}`}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextElementSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : (
                                        <div></div>
                                    )}
                                    <div className={`h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center ${user?.userType === 'club' && clubData?.detailsComplets?.logo ? 'hidden' : ''}`}>
                                        <span className="text-sm font-medium text-gray-700 uppercase">
                                            {user?.userType === 'club' 
                                                ? String(user?.nom || 'C').charAt(0)
                                                : `${String(user?.nom || '').charAt(0)}${String(user?.prenom || '').charAt(0)}`
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                        {user?.userType === 'club' 
                                            ? String(user?.nom || 'Club') 
                                            : `${String(user?.nom || '')} ${String(user?.prenom || '')}`
                                        }
                                    </p>
                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                        {getUserTypeLabel(user?.userType)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Top bar */}
                <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Ouvrir sidebar</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Header */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex">
                            <div className="w-full flex md:ml-0">
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600 flex items-center">
                                    <div className="hidden md:block">
                                        <h1 className="text-lg font-semibold text-gray-900">
                                            {hasPermission('admin') ? 'Administration' : 'Espace Club'}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="ml-3 relative">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-700">
                                        {user?.userType === 'club' 
                                            ? String(user?.nom || 'Club') 
                                            : `${String(user?.nom || '')} ${String(user?.prenom || '')}`
                                        }
                                    </span>
                                    <Button
                                        onClick={handleLogout}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Déconnexion
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Breadcrumb />
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BackOfficeLayout;