import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/api';

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        lieu: '',
        capaciteMax: '',
        prix: '',
        typeEvent: 'formation',
        statut: 'brouillon',
        image: '',
        lienInscription: ''
    });

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const response = await eventService.getMyEvents();
            console.log('Response from getMyEvents:', response);
            
            if (response && response.success) {
                // Le backend retourne data.events au lieu de juste data
                const eventsData = response.data?.events || response.data || [];
                console.log('Events data:', eventsData);
                setEvents(Array.isArray(eventsData) ? eventsData : []);
            } else {
                setMessage('Erreur lors du chargement des événements');
                setEvents([]);
            }
        } catch (error) {
            setMessage('Erreur lors du chargement des événements');
            console.error('Erreur:', error);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Validation des champs requis
        const requiredFields = ['titre', 'description', 'dateDebut', 'dateFin', 'lieu', 'typeEvent'];
        const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
        
        if (missingFields.length > 0) {
            setMessage(`Veuillez remplir tous les champs requis: ${missingFields.join(', ')}`);
            setLoading(false);
            return;
        }

        // Validation des dates
        if (new Date(formData.dateDebut) >= new Date(formData.dateFin)) {
            setMessage('La date de fin doit être postérieure à la date de début');
            setLoading(false);
            return;
        }

        try {
            let response;
            if (editingEvent) {
                response = await eventService.updateEvent(editingEvent._id, formData);
            } else {
                response = await eventService.createEvent(formData);
            }

            if (response.success) {
                setMessage(`Événement ${editingEvent ? 'modifié' : 'créé'} avec succès`);
                setShowForm(false);
                setEditingEvent(null);
                resetForm();
                loadEvents();
            } else {
                setMessage(response.message || 'Erreur lors de la sauvegarde');
            }
        } catch (error) {
            setMessage('Erreur lors de la sauvegarde de l\'événement');
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setFormData({
            titre: event.titre || '',
            description: event.description || '',
            dateDebut: event.dateDebut ? new Date(event.dateDebut).toISOString().slice(0, 16) : '',
            dateFin: event.dateFin ? new Date(event.dateFin).toISOString().slice(0, 16) : '',
            lieu: event.lieu || '',
            capaciteMax: event.capaciteMax || '',
            prix: event.prix || '',
            typeEvent: event.typeEvent || event.typeEvenement || 'formation',
            statut: event.statut || 'brouillon',
            image: event.image || '',
            lienInscription: event.lienInscription || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (eventId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            try {
                setLoading(true);
                const response = await eventService.deleteEvent(eventId);
                if (response.success) {
                    setMessage('Événement supprimé avec succès');
                    loadEvents();
                } else {
                    setMessage('Erreur lors de la suppression');
                }
            } catch (error) {
                setMessage('Erreur lors de la suppression de l\'événement');
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            titre: '',
            description: '',
            dateDebut: '',
            dateFin: '',
            lieu: '',
            capaciteMax: '',
            prix: '',
            typeEvent: 'formation',
            statut: 'brouillon',
            image: '',
            lienInscription: ''
        });
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingEvent(null);
        resetForm();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Non définie';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (statut) => {
        const statusClasses = {
            'brouillon': 'bg-gray-100 text-gray-800',
            'publie': 'bg-green-100 text-green-800',
            'archive': 'bg-red-100 text-red-800',
            'annule': 'bg-yellow-100 text-yellow-800'
        };

        const statusLabels = {
            'brouillon': 'Brouillon',
            'publie': 'Publié',
            'archive': 'Archivé',
            'annule': 'Annulé'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[statut] || statusClasses['brouillon']}`}>
                {statusLabels[statut] || 'Inconnu'}
            </span>
        );
    };

    if (loading && events.length === 0) {
        return (
            <div className="bg-white shadow rounded-lg p-6">
                <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-4">⏳</div>
                    <p className="text-gray-500">Chargement des événements...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">
                            Gestion des événements
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Créez et gérez les événements de votre club
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        ➕ Nouvel événement
                    </button>
                </div>

                {message && (
                    <div className={`mt-4 p-4 rounded-md ${
                        message.includes('succès') 
                            ? 'bg-green-50 text-green-800 border border-green-200' 
                            : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                        {message}
                    </div>
                )}
            </div>

            {/* Formulaire d'ajout/édition */}
            {showForm && (
                <div className="bg-white shadow rounded-lg p-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                        {editingEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
                    </h4>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Titre *
                                </label>
                                <input
                                    type="text"
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Type d'événement
                                </label>
                                <select
                                    name="typeEvent"
                                    value={formData.typeEvent}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="formation">Formation</option>
                                    <option value="conference">Conférence</option>
                                    <option value="atelier">Atelier</option>
                                    <option value="competition">Compétition</option>
                                    <option value="social">Événement social</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Date de début *
                                </label>
                                <input
                                    type="datetime-local"
                                    name="dateDebut"
                                    value={formData.dateDebut}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Date de fin
                                </label>
                                <input
                                    type="datetime-local"
                                    name="dateFin"
                                    value={formData.dateFin}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Lieu
                                </label>
                                <input
                                    type="text"
                                    name="lieu"
                                    value={formData.lieu}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Capacité maximum
                                </label>
                                <input
                                    type="number"
                                    name="capaciteMax"
                                    value={formData.capaciteMax}
                                    onChange={handleInputChange}
                                    min="1"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Prix (TND)
                                </label>
                                <input
                                    type="number"
                                    name="prix"
                                    value={formData.prix}
                                    onChange={handleInputChange}
                                    min="0"
                                    step="0.01"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Statut
                                </label>
                                <select
                                    name="statut"
                                    value={formData.statut}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="brouillon">Brouillon</option>
                                    <option value="publie">Publié</option>
                                    <option value="archive">Archivé</option>
                                    <option value="annule">Annulé</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Image (URL)
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://exemple.com/image.jpg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Lien d'inscription
                            </label>
                            <input
                                type="url"
                                name="lienInscription"
                                value={formData.lienInscription}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://exemple.com/inscription"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? 'Enregistrement...' : (editingEvent ? 'Modifier' : 'Créer')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Liste des événements */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h4 className="text-md font-medium text-gray-900">
                        Mes événements ({Array.isArray(events) ? events.length : 0})
                    </h4>
                </div>
                
                {!Array.isArray(events) || events.length === 0 ? (
                    <div className="p-6 text-center">
                        <div className="text-gray-400 text-4xl mb-4">📅</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Aucun événement
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Vous n'avez pas encore créé d'événement.
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Créer mon premier événement
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {Array.isArray(events) && events.map((event) => (
                            <div key={event._id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <h5 className="text-lg font-medium text-gray-900">
                                                {event.titre}
                                            </h5>
                                            {getStatusBadge(event.statut)}
                                        </div>
                                        
                                        <div className="mt-2 space-y-1">
                                            <p className="text-sm text-gray-600">
                                                📅 {formatDate(event.dateDebut)}
                                                {event.dateFin && ` - ${formatDate(event.dateFin)}`}
                                            </p>
                                            {event.lieu && (
                                                <p className="text-sm text-gray-600">
                                                    📍 {event.lieu}
                                                </p>
                                            )}
                                            {event.capaciteMax && (
                                                <p className="text-sm text-gray-600">
                                                    👥 Capacité: {event.capaciteMax} personnes
                                                </p>
                                            )}
                                            {event.prix && (
                                                <p className="text-sm text-gray-600">
                                                    💰 Prix: {event.prix} TND
                                                </p>
                                            )}
                                        </div>
                                        
                                        {event.description && (
                                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                                {event.description}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div className="ml-6 flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            ✏️ Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100"
                                        >
                                            🗑️ Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventManagement;