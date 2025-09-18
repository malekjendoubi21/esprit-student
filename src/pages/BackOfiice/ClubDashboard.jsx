import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { clubService } from '../../services/api';
import ClubProfile from '../../components/club/ClubProfile';
import EventManagement from '../../components/club/EventManagement';
import ClubStats from '../../components/club/ClubStats';

const ClubDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [clubData, setClubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClubData();
    }, []);

    const fetchClubData = async () => {
        try {
            setError(null);
            setLoading(true);
            
            const response = await clubService.getMyProfile();
            
            if (response.success && response.data) {
                // Nettoyer les données pour éviter les objets dans le rendu
                const cleanClubData = {
                    ...response.data,
                    nom: String(response.data.nom || ''),
                    description: String(response.data.description || ''),
                    president: response.data.president ? {
                        nom: String(response.data.president.nom || ''),
                        prenom: String(response.data.president.prenom || ''),
                        email: String(response.data.president.email || ''),
                        telephone: String(response.data.president.telephone || '')
                    } : null,
                    contact: response.data.contact ? {
                        ...response.data.contact,
                        email: String(response.data.contact.email || ''),
                        telephone: String(response.data.contact.telephone || '')
                    } : {}
                };
                
                setClubData(cleanClubData);
            } else {
                setError(response?.message || 'Erreur lors du chargement des données');
            }
        } catch (error) {
            setError(error.message || 'Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profil Club', icon: '🏢' },
        { id: 'events', label: 'Événements', icon: '📅' },
        { id: 'stats', label: 'Statistiques', icon: '📊' }
    ];

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des données du club...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto">
                    <div className="text-6xl text-red-500 mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur de chargement</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={fetchClubData}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    if (!loading && !clubData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto">
                    <div className="text-6xl text-gray-400 mb-4">🏢</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucune donnée club</h2>
                    <p className="text-gray-600 mb-6">Impossible de charger les informations de votre club.</p>
                    <button
                        onClick={fetchClubData}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 relative group">
                                {clubData?.detailsComplets?.logo ? (
                                    <div className="relative">
                                        <img
                                            className="h-16 w-16 rounded-lg object-contain bg-white border-2 border-gray-200"
                                            src={clubData.detailsComplets.logo}
                                            alt={`Logo ${clubData.nom}`}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextElementSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="hidden h-16 w-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                                            {clubData?.nom?.charAt(0) || 'C'}
                                        </div>
                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => setActiveTab('profile')}
                                                className="text-white text-xs font-medium hover:text-blue-200"
                                                title="Modifier le logo"
                                            >
                                                ✏️ Modifier
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold cursor-pointer"
                                             onClick={() => setActiveTab('profile')}
                                             title="Cliquer pour ajouter un logo">
                                            {clubData?.nom?.charAt(0) || 'C'}
                                        </div>
                                        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-xs font-medium">
                                                + Logo
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {clubData?.nom || 'Dashboard Club'}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Bienvenue dans votre espace de gestion {clubData?.nom ? `- ${clubData.nom}` : ''}
                                </p>
                                {/* Debug info - à supprimer en production */}
                                <div className="mt-2 text-xs text-blue-600">
                                    Debug: User type: {user?.userType}, ID: {user?.id}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                clubData?.valide 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {clubData?.valide ? '✓ Validé' : '⏳ En attente'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'profile' && (
                    <ClubProfile 
                        clubData={clubData} 
                        onUpdate={fetchClubData} 
                    />
                )}
                {activeTab === 'events' && (
                    <EventManagement 
                        clubId={clubData?._id} 
                        clubName={clubData?.nom} 
                    />
                )}
                {activeTab === 'stats' && (
                    <ClubStats 
                        clubId={clubData?._id} 
                    />
                )}
            </div>
        </div>
    );
};

export default ClubDashboard;
