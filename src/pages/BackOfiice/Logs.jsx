import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import { Loading, Alert, Button, Modal } from '../../components/ui';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        action: '',
        dateFrom: '',
        dateTo: '',
        userId: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [debugStats, setDebugStats] = useState(null);
    const [showDebug, setShowDebug] = useState(false);

    useEffect(() => {
        loadLogs();
        if (showDebug) {
            loadDebugStats(); // Charger les stats seulement si debug activé
        }
    }, [currentPage, filters, showDebug]);

    const loadLogs = async () => {
        try {
            setLoading(true);
            setError('');
            
            const response = await adminService.getLogs({
                page: currentPage,
                limit: 20,
                ...filters
            });

            if (response.success) {
                setLogs(response.data.logs || []);
                setTotalPages(response.data.totalPages || 1);
            } else {
                setError('Erreur lors du chargement des logs');
            }
        } catch (err) {
            console.error('Erreur:', err);
            setError('Erreur lors du chargement des logs');
        } finally {
            setLoading(false);
        }
    };

    const loadDebugStats = async () => {
        try {
            const response = await adminService.getLogsStats();
            if (response.success) {
                console.log('📊 Statistiques des logs:', response.data);
                setDebugStats(response.data);
            }
        } catch (error) {
            console.error('Erreur stats logs:', error);
        }
    };

    const formatDetails = (details) => {
        if (!details) return '';
        
        if (typeof details === 'string') {
            return details;
        }
        
        if (typeof details === 'object') {
            // Formater les détails de manière lisible
            const parts = [];
            
            if (details.ipAddress) {
                parts.push(`IP: ${details.ipAddress}`);
            }
            
            if (details.userAgent) {
                // Extraire juste le navigateur principal du user agent
                const ua = details.userAgent;
                if (ua.includes('Chrome')) parts.push('Chrome');
                else if (ua.includes('Firefox')) parts.push('Firefox');
                else if (ua.includes('Safari')) parts.push('Safari');
                else if (ua.includes('Edge')) parts.push('Edge');
                else parts.push('Navigateur inconnu');
            }
            
            if (details.timestamp) {
                parts.push(`Timestamp: ${new Date(details.timestamp).toLocaleString('fr-FR')}`);
            }
            
            // Ajouter d'autres propriétés si elles existent
            Object.keys(details).forEach(key => {
                if (!['ipAddress', 'userAgent', 'timestamp'].includes(key)) {
                    parts.push(`${key}: ${details[key]}`);
                }
            });
            
            return parts.join(' • ');
        }
        
        return String(details);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Date non disponible';
        
        try {
            const date = new Date(dateString);
            
            if (isNaN(date.getTime())) {
                return 'Date invalide';
            }
            
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } catch (error) {
            console.error('Erreur formatage date:', error);
            return 'Erreur de date';
        }
    };

    const getLogTypeClass = (type) => {
        switch (type.toLowerCase()) {
            case 'login':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'logout':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'create_club':
            case 'create_event':
            case 'create_user':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'update_club':
            case 'update_event':
            case 'update_user':
            case 'update_profile':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'delete_club':
            case 'delete_event':
            case 'delete_user':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'approve_club':
            case 'approve_event':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'reject_club':
            case 'reject_event':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getLogIcon = (type) => {
        const actionType = type.toLowerCase();
        
        if (actionType === 'login') {
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            );
        } else if (actionType === 'logout') {
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
            );
        } else if (actionType.includes('create')) {
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            );
        } else if (actionType.includes('update')) {
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            );
        } else if (actionType.includes('delete')) {
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            );
        } else if (actionType.includes('approve')) {
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            );
        } else if (actionType.includes('reject')) {
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            );
        } else {
            return (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            );
        }
    };    const clearFilters = () => {
        setFilters({
            action: '',
            dateFrom: '',
            dateTo: '',
            userId: ''
        });
        setCurrentPage(1);
    };

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const createTestLogs = async () => {
        try {
            setLoading(true);
            const response = await adminService.createTestLogs();
            if (response.success) {
                setError('');
                await loadLogs(); // Recharger les logs
                await loadDebugStats(); // Recharger les stats
            } else {
                setError('Erreur lors de la création des logs de test');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur lors de la création des logs de test');
        } finally {
            setLoading(false);
        }
    };

    const deleteTestLogs = async () => {
        try {
            setLoading(true);
            const response = await adminService.deleteTestLogs();
            if (response.success) {
                setError('');
                await loadLogs(); // Recharger les logs
                await loadDebugStats(); // Recharger les stats
            } else {
                setError('Erreur lors de la suppression des logs de test');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur lors de la suppression des logs de test');
        } finally {
            setLoading(false);
        }
    };

    const cleanOrphanLogs = async () => {
        try {
            setLoading(true);
            const response = await adminService.cleanOrphanLogs();
            if (response.success) {
                setError('');
                await loadLogs(); // Recharger les logs
                await loadDebugStats(); // Recharger les stats
                // Afficher les détails du nettoyage
                console.log('Nettoyage terminé:', response.details);
            } else {
                setError('Erreur lors du nettoyage des logs orphelins');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setError('Erreur lors du nettoyage des logs orphelins');
        } finally {
            setLoading(false);
        }
    };

    if (loading && logs.length === 0) {
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
                            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                Logs d'activité
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Historique complet des actions des utilisateurs
                            </p>
                        </div>
                        <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                            <Button
                                onClick={() => setShowDebug(!showDebug)}
                                variant="secondary"
                                className={showDebug ? "bg-yellow-100 text-yellow-800" : ""}
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                Debug
                            </Button>
                            <Button
                                onClick={() => setShowFilters(!showFilters)}
                                variant="secondary"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                </svg>
                                Filtres
                            </Button>
                            <Button
                                onClick={loadLogs}
                                variant="secondary"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                </svg>
                                Actualiser
                            </Button>
                            <Button
                                onClick={createTestLogs}
                                variant="primary"
                                className="bg-orange-600 hover:bg-orange-700"
                                disabled={loading}
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Créer logs test
                            </Button>
                            <Button
                                onClick={deleteTestLogs}
                                variant="secondary"
                                className="bg-red-600 hover:bg-red-700 text-white"
                                disabled={loading}
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM10 11a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                </svg>
                                Supprimer logs test
                            </Button>
                            <Button
                                onClick={cleanOrphanLogs}
                                variant="secondary"
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                                disabled={loading}
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Nettoyer orphelins
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <Alert type="error" message={error} />
            )}

            {/* Debug stats */}
            {showDebug && debugStats && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <h3 className="text-sm font-medium text-yellow-800 mb-2">🔍 Debug - Statistiques des logs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                            <p className="font-medium text-yellow-700">Total: {debugStats.totalLogs} logs</p>
                        </div>
                        <div>
                            <p className="font-medium text-yellow-700">Actions disponibles:</p>
                            {debugStats.actionStats.map(stat => (
                                <p key={stat._id} className="text-yellow-600">
                                    {stat._id}: {stat.count}
                                </p>
                            ))}
                        </div>
                        <div>
                            <p className="font-medium text-yellow-700">Types d'utilisateurs:</p>
                            {debugStats.userTypeStats.map(stat => (
                                <p key={stat._id} className="text-yellow-600">
                                    {stat._id}: {stat.count}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Filtres */}
            {showFilters && (
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Filtres</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type d'action
                            </label>
                            <select
                                value={filters.action}
                                onChange={(e) => setFilters({...filters, action: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Tous les types</option>
                                <option value="login">Connexion</option>
                                <option value="logout">Déconnexion</option>
                                <option value="create_club">Création club</option>
                                <option value="create_event">Création événement</option>
                                <option value="create_user">Création utilisateur</option>
                                <option value="update_club">Modification club</option>
                                <option value="update_event">Modification événement</option>
                                <option value="update_user">Modification utilisateur</option>
                                <option value="update_profile">Modification profil</option>
                                <option value="delete_club">Suppression club</option>
                                <option value="delete_event">Suppression événement</option>
                                <option value="delete_user">Suppression utilisateur</option>
                                <option value="approve_club">Approbation club</option>
                                <option value="approve_event">Approbation événement</option>
                                <option value="reject_club">Rejet club</option>
                                <option value="reject_event">Rejet événement</option>
                                <option value="password_change">Changement mot de passe</option>
                                <option value="complete_first_login">Première connexion terminée</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date de début
                            </label>
                            <input
                                type="datetime-local"
                                value={filters.dateFrom}
                                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date de fin
                            </label>
                            <input
                                type="datetime-local"
                                value={filters.dateTo}
                                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex items-end space-x-2">
                            <Button
                                onClick={() => applyFilters(filters)}
                                variant="primary"
                                className="flex-1"
                            >
                                Appliquer
                            </Button>
                            <Button
                                onClick={clearFilters}
                                variant="secondary"
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Liste des logs */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {logs.length > 0 ? (
                        logs.map((log) => (
                            <li key={log._id} className="px-6 py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <span className={`inline-flex items-center justify-center h-10 w-10 rounded-full border ${getLogTypeClass(log.action)}`}>
                                            {getLogIcon(log.action)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {log.utilisateur?.nom} {log.utilisateur?.prenom}
                                                    <span className="text-gray-500 ml-2">({log.utilisateur?.email})</span>
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {log.description}
                                                </p>
                                                {log.details && (
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Détails: {formatDetails(log.details)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500 text-right">
                                                <p>{formatDate(log.createdAt)}</p>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getLogTypeClass(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="px-6 py-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun log trouvé</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Aucune activité ne correspond aux critères sélectionnés.
                            </p>
                        </li>
                    )}
                </ul>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            variant="secondary"
                        >
                            Précédent
                        </Button>
                        <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            variant="secondary"
                        >
                            Suivant
                        </Button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Page <span className="font-medium">{currentPage}</span> sur{' '}
                                <span className="font-medium">{totalPages}</span>
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                
                                {[...Array(totalPages)].map((_, index) => {
                                    const page = index + 1;
                                    if (page === currentPage || page === 1 || page === totalPages || 
                                        (page >= currentPage - 1 && page <= currentPage + 1)) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    page === currentPage
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                                        return (
                                            <span key={page} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                ...
                                            </span>
                                        );
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logs;