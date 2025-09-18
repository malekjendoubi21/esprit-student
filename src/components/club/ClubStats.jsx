import React, { useState, useEffect } from 'react';

const ClubStats = ({ clubId }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    // Vérification de sécurité
    if (!clubId) {
        return (
            <div className="bg-white shadow rounded-lg p-6">
                <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-4">📊</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Club non trouvé
                    </h3>
                    <p className="text-gray-500">
                        Impossible de charger les statistiques
                    </p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        fetchStats();
        fetchRecentEvents();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch(`https://esprit-student-backend.onrender.com/api/clubs/my/stats`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            // Error silently handled
        }
    };

    const fetchRecentEvents = async () => {
        try {
            const response = await fetch(`https://esprit-student-backend.onrender.com/api/events/my/events?limit=5`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setEvents(data.data?.events || []);
            }
        } catch (error) {
            // Error silently handled
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'en_attente':
                return 'bg-yellow-100 text-yellow-800';
            case 'valide':
                return 'bg-green-100 text-green-800';
            case 'rejete':
                return 'bg-red-100 text-red-800';
            case 'annule':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'en_attente':
                return 'En attente';
            case 'valide':
                return 'Approuvé';
            case 'rejete':
                return 'Rejeté';
            case 'annule':
                return 'Annulé';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Calcul des statistiques basiques si pas d'API spécifique
    const totalEvents = stats?.totalEvents || events.length;
    const approvedEvents = stats?.approvedEvents || events.filter(e => e.statut === 'valide').length;
    const pendingEvents = stats?.pendingEvents || events.filter(e => e.statut === 'en_attente').length;
    const rejectedEvents = stats?.rejectedEvents || events.filter(e => e.statut === 'rejete').length;

    return (
        <div className="space-y-6">
            {/* Cartes statistiques */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">📅</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Événements
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats?.totalEvents || totalEvents}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">✅</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Événements Approuvés
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats?.approvedEvents || approvedEvents}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">⏳</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        En Attente
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats?.pendingEvents || pendingEvents}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">❌</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Rejetés
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats?.rejectedEvents || rejectedEvents}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Graphique de performance */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Performance des Événements
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Taux d'approbation</span>
                        <span className="text-sm font-medium text-gray-900">
                            {totalEvents > 0 ? Math.round((approvedEvents / totalEvents) * 100) : 0}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                                width: `${totalEvents > 0 ? (approvedEvents / totalEvents) * 100 : 0}%`
                            }}
                        ></div>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Événements en attente</span>
                        <span className="text-sm font-medium text-gray-900">
                            {totalEvents > 0 ? Math.round((pendingEvents / totalEvents) * 100) : 0}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-yellow-600 h-2 rounded-full"
                            style={{
                                width: `${totalEvents > 0 ? (pendingEvents / totalEvents) * 100 : 0}%`
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Événements récents */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                        Événements Récents
                    </h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {events.length === 0 ? (
                        <div className="p-6 text-center">
                            <div className="text-gray-400 text-4xl mb-2">📅</div>
                            <p className="text-gray-500">Aucun événement créé</p>
                        </div>
                    ) : (
                        events.slice(0, 5).map((event) => (
                            <div key={event._id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                {event.titre}
                                            </h4>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.statut)}`}>
                                                {getStatusLabel(event.statut)}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                                            <span>📅 {formatDate(event.dateDebut)}</span>
                                            <span>📍 {event.lieu}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Conseils et recommandations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <div className="w-6 h-6 text-blue-600">💡</div>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                            Conseils pour améliorer vos événements
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Planifiez vos événements au moins 2 semaines à l'avance</li>
                                <li>Fournissez des descriptions détaillées pour faciliter l'approbation</li>
                                <li>Spécifiez clairement le lieu et la capacité maximale</li>
                                <li>Suivez régulièrement le statut de vos demandes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubStats;