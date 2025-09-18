import React, { useState, useEffect } from 'react';
import { eventService, adminService } from '../../services/api';
import { Alert, Loading, Pagination, SearchInput, StatusBadge } from '../../components/ui';

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [approvalComment, setApprovalComment] = useState('');

    const eventStatuses = [
        { value: '', label: 'Tous les statuts' },
        { value: 'en_attente', label: 'En attente', color: 'yellow' },
        { value: 'valide', label: 'Approuvé', color: 'green' },
        { value: 'rejete', label: 'Rejeté', color: 'red' },
        { value: 'annule', label: 'Annulé', color: 'gray' }
    ];

    useEffect(() => {
        loadEvents();
    }, [currentPage, searchTerm, statusFilter]);

    const loadEvents = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await eventService.getEvents({
                page: currentPage,
                limit: 10,
                search: searchTerm,
                statut: statusFilter
            });

            if (response.success) {
                setEvents(response.data.events);
                setTotalPages(response.data.totalPages);
            }
        } catch (err) {
            setError('Erreur lors du chargement des événements');
        } finally {
            setLoading(false);
        }
    };

    const handleApproval = async (eventId, statut, commentaire = '') => {
        try {
            const response = await adminService.updateEventStatus(eventId, statut, commentaire);
            if (response.success) {
                setSuccess(`Événement ${statut === 'valide' ? 'approuvé' : 'rejeté'} avec succès`);
                setShowApprovalModal(false);
                setSelectedEvent(null);
                setApprovalComment('');
                loadEvents();
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la mise à jour du statut');
        }
    };

    const openDetailModal = (event) => {
        setSelectedEvent(event);
        setShowDetailModal(true);
    };

    const openApprovalModal = (event) => {
        setSelectedEvent(event);
        setShowApprovalModal(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        const statusObj = eventStatuses.find(s => s.value === status);
        return statusObj ? statusObj.color : 'gray';
    };

    const getStatusLabel = (status) => {
        const statusObj = eventStatuses.find(s => s.value === status);
        return statusObj ? statusObj.label : status;
    };

    const isPastEvent = (dateEvent) => {
        return new Date(dateEvent) < new Date();
    };

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">Gestion des événements</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Approuvez, rejetez et gérez tous les événements créés par les clubs.
                    </p>
                </div>
            </div>

            {/* Alerts */}
            {error && (
                <Alert
                    type="error"
                    message={error}
                    onClose={() => setError('')}
                />
            )}
            {success && (
                <Alert
                    type="success"
                    message={success}
                    onClose={() => setSuccess('')}
                />
            )}

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <SearchInput
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Rechercher par titre, club..."
                        className="max-w-md"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {eventStatuses.map(status => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={loadEvents}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Actualiser
                </button>
            </div>

            {/* Liste des événements */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {loading ? (
                    <div className="p-8 text-center">
                        <Loading size="large" />
                    </div>
                ) : events.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-gray-500">Aucun événement trouvé</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {events.map((event) => (
                            <li key={event._id}>
                                <div className="px-4 py-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                {event.image ? (
                                                    <img
                                                        className="h-16 w-16 rounded-lg object-cover"
                                                        src={event.image}
                                                        alt={event.titre}
                                                    />
                                                ) : (
                                                    <div className="h-16 w-16 rounded-lg bg-gray-300 flex items-center justify-center">
                                                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <p className="text-lg font-semibold text-gray-900">{event.titre}</p>
                                                    <StatusBadge
                                                        status={event.statut}
                                                        color={getStatusColor(event.statut)}
                                                        className="ml-3"
                                                    >
                                                        {getStatusLabel(event.statut)}
                                                    </StatusBadge>
                                                    {isPastEvent(event.dateEvent) && (
                                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            Passé
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-2 space-y-1">
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Club:</span> {event.club?.nom || 'N/A'}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Date:</span> {formatDate(event.dateEvent)}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Lieu:</span> {event.lieu}
                                                    </p>
                                                    <p className="text-sm text-gray-600 line-clamp-2">
                                                        {event.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <button
                                                onClick={() => openDetailModal(event)}
                                                className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Détails
                                            </button>
                                            {event.statut === 'en_attente' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApproval(event._id, 'valide')}
                                                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                                    >
                                                        Approuver
                                                    </button>
                                                    <button
                                                        onClick={() => openApprovalModal(event)}
                                                        className="px-3 py-1 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50"
                                                    >
                                                        Rejeter
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Modal Détails */}
            {showDetailModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Détails de l'événement</h2>
                                <button
                                    onClick={() => {
                                        setShowDetailModal(false);
                                        setSelectedEvent(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                {selectedEvent && (
                    <div className="space-y-6">
                        {/* Image */}
                        {selectedEvent.image && (
                            <div className="w-full h-48 rounded-lg overflow-hidden">
                                <img
                                    src={selectedEvent.image}
                                    alt={selectedEvent.titre}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Informations générales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h3>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Titre</dt>
                                        <dd className="text-sm text-gray-900">{selectedEvent.titre}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Club organisateur</dt>
                                        <dd className="text-sm text-gray-900">{selectedEvent.club?.nom || 'N/A'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Date et heure</dt>
                                        <dd className="text-sm text-gray-900">{formatDate(selectedEvent.dateEvent)}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Lieu</dt>
                                        <dd className="text-sm text-gray-900">{selectedEvent.lieu}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Statut</dt>
                                        <dd>
                                            <StatusBadge
                                                status={selectedEvent.statut}
                                                color={getStatusColor(selectedEvent.statut)}
                                            >
                                                {getStatusLabel(selectedEvent.statut)}
                                            </StatusBadge>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Détails logistiques</h3>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Type d'événement</dt>
                                        <dd className="text-sm text-gray-900">{selectedEvent.type}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Capacité maximale</dt>
                                        <dd className="text-sm text-gray-900">{selectedEvent.capaciteMax || 'Non définie'}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Prix d'entrée</dt>
                                        <dd className="text-sm text-gray-900">
                                            {selectedEvent.prix ? `${selectedEvent.prix} DT` : 'Gratuit'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Date de création</dt>
                                        <dd className="text-sm text-gray-900">{formatDate(selectedEvent.dateCreation)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                        </div>

                        {/* Commentaires d'approbation */}
                        {selectedEvent.commentaireApprobation && (
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Commentaire d'approbation</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">{selectedEvent.commentaireApprobation}</p>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        {selectedEvent.statut === 'en_attente' && (
                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => handleApproval(selectedEvent._id, 'valide')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Approuver
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDetailModal(false);
                                        openApprovalModal(selectedEvent);
                                    }}
                                    className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                                >
                                    Rejeter
                                </button>
                            </div>
                        )}
                    </div>
                )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Rejet */}
            {showApprovalModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Rejeter l'événement</h2>
                                <button
                                    onClick={() => {
                                        setShowApprovalModal(false);
                                        setSelectedEvent(null);
                                        setApprovalComment('');
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Vous êtes sur le point de rejeter l'événement{' '}
                                    <span className="font-medium">{selectedEvent?.titre}</span>.{' '}
                                    Veuillez indiquer la raison du rejet :
                                </p>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Commentaire (obligatoire)
                                    </label>
                                    <textarea
                                        value={approvalComment}
                                        onChange={(e) => setApprovalComment(e.target.value)}
                                        rows={4}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Expliquez pourquoi cet événement est rejeté..."
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        onClick={() => {
                                            setShowApprovalModal(false);
                                            setSelectedEvent(null);
                                            setApprovalComment('');
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={() => handleApproval(selectedEvent._id, 'rejete', approvalComment)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        disabled={!approvalComment.trim()}
                                    >
                                        Rejeter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventManagement;