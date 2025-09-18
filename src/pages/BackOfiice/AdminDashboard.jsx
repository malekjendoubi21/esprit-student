import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { adminService } from '../../services/api';
import { StatCard, Loading, Alert, Button, Modal } from '../../components/ui';
import { Link } from 'react-router-dom';
import CreateUserModal from '../../components/admin/CreateUserModal';
import CreateClubModal from '../../components/admin/CreateClubModal';
import CreateEventModal from '../../components/admin/CreateEventModal';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentLogs, setRecentLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showCreateClubModal, setShowCreateClubModal] = useState(false);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            setError('');

            const [statsResponse, logsResponse] = await Promise.all([
                adminService.getDashboardStats(),
                adminService.getRecentLogs()
            ]);

            if (statsResponse.success) {
                setStats(statsResponse.data);
            }

            if (logsResponse.success) {
                setRecentLogs(logsResponse.data);
            }
        } catch (err) {
            setError('Erreur lors du chargement des données');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Date non disponible';
        
        try {
            const date = new Date(dateString);
            
            // Vérifier si la date est valide
            if (isNaN(date.getTime())) {
                return 'Date invalide';
            }
            
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Erreur formatage date:', error, 'Date reçue:', dateString);
            return 'Erreur de date';
        }
    };

    const getLogTypeClass = (type) => {
        switch (type) {
            case 'LOGIN':
                return 'bg-green-100 text-green-800';
            case 'LOGOUT':
                return 'bg-gray-100 text-gray-800';
            case 'CREATE':
                return 'bg-blue-100 text-blue-800';
            case 'UPDATE':
                return 'bg-yellow-100 text-yellow-800';
            case 'DELETE':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading size="large" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div className="bg-white shadow">
                <div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
                    <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                                <div>
                                    <div className="flex items-center">
                                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                            Dashboard Administrateur
                                        </h1>
                                    </div>
                                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                        <dt className="sr-only">Utilisateur</dt>
                                        <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" 
                                                 fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" 
                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                                      clipRule="evenodd" />
                                            </svg>
                                            Connecté en tant que {user?.nom} {user?.prenom}
                                        </dd>
                                        <dt className="sr-only">Dernière connexion</dt>
                                        <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" 
                                                 fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" 
                                                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
                                                      clipRule="evenodd" />
                                            </svg>
                                            Dernière connexion: {formatDate(new Date())}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCreateUserModal(true);
                                }}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                                </svg>
                                Ajouter Utilisateur
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCreateClubModal(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                </svg>
                                Ajouter Club
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCreateEventModal(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                </svg>
                                Ajouter Événement
                            </button>
                            <button
                                type="button"
                                onClick={loadDashboardData}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                                Actualiser
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <Alert type="error" message={error} />
            )}

            {/* Statistiques */}
            {stats && stats.overview && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Utilisateurs"
                        value={stats.overview.totalUsers || 0}
                        color="blue"
                        trend={stats.overview.usersActifs > 0 ? { positive: true, value: `${stats.overview.usersActifs} actifs` } : null}
                    />
                    <StatCard
                        title="Total Clubs"
                        value={stats.overview.totalClubs || 0}
                        color="green"
                        trend={stats.overview.clubsActifs > 0 ? { positive: true, value: `${stats.overview.clubsActifs} actifs` } : null}
                    />
                    <StatCard
                        title="Événements"
                        value={stats.overview.totalEvents || 0}
                        color="purple"
                        trend={stats.overview.eventsCeMois > 0 ? { positive: true, value: `${stats.overview.eventsCeMois} ce mois` } : null}
                    />
                    <StatCard
                        title="Événements en attente"
                        value={stats.overview.eventsEnAttente || 0}
                        color="yellow"
                        trend={stats.overview.eventsEnAttente > 0 ? { positive: false, value: 'Action requise' } : { positive: true, value: 'Tout à jour' }}
                    />
                </div>
            )}

            {/* Actions rapides et logs récents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Actions rapides */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                            Actions rapides
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <Link
                                to="/backoffice/users"
                                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                                <div>
                                    <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                        Gérer les utilisateurs
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Ajouter, modifier ou supprimer des utilisateurs
                                    </p>
                                </div>
                            </Link>

                            <Link
                                to="/backoffice/clubs"
                                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                                <div>
                                    <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                        Gérer les clubs
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Superviser les clubs et leurs activités
                                    </p>
                                </div>
                            </Link>

                            <Link
                                to="/backoffice/events"
                                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-500 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                                <div>
                                    <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                        Gérer les événements
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Approuver et superviser les événements
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Logs récents */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                            Activité récente
                        </h3>
                        <div className="flow-root">
                            {recentLogs.length > 0 ? (
                                <ul className="-mb-8">
                                    {recentLogs.slice(0, 5).map((log, index) => (
                                        <li key={log._id}>
                                            <div className="relative pb-8">
                                                {index !== recentLogs.slice(0, 5).length - 1 && (
                                                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                                )}
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getLogTypeClass(log.action)}`}>
                                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">
                                                                <span className="font-medium text-gray-900">
                                                                    {log.user?.nom || 'Utilisateur'} {log.user?.prenom || 'Inconnu'}
                                                                </span>{' '}
                                                                {log.description}
                                                            </p>
                                                        </div>
                                                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                            {formatDate(log.createdAt)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    Aucune activité récente
                                </p>
                            )}
                        </div>
                        <div className="mt-6">
                            <Link
                                to="/backoffice/logs"
                                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Voir tous les logs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals pour la création */}
            <CreateUserModal
                isOpen={showCreateUserModal}
                onClose={() => setShowCreateUserModal(false)}
                onSuccess={loadDashboardData}
            />

            <CreateClubModal
                isOpen={showCreateClubModal}
                onClose={() => setShowCreateClubModal(false)}
                onSuccess={loadDashboardData}
            />

            <CreateEventModal
                isOpen={showCreateEventModal}
                onClose={() => setShowCreateEventModal(false)}
                onSuccess={loadDashboardData}
            />
        </div>
    );
};

export default AdminDashboard;