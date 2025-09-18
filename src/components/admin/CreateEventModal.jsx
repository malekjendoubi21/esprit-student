import React, { useState, useEffect } from 'react';
import { eventService, clubService } from '../../services/api';

const CreateEventModal = ({ isOpen, onClose, onSuccess }) => {
    console.log('CreateEventModal rendu avec isOpen:', isOpen);
    
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        lieu: '',
        type: 'conference',
        clubId: '',
        maxParticipants: '',
        prix: 0,
        tags: '',
        statut: 'en_attente'
    });
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingClubs, setLoadingClubs] = useState(false);
    const [error, setError] = useState('');

    const eventTypes = [
        'conference',
        'workshop',
        'formation',
        'competition',
        'social',
        'culturel',
        'sportif',
        'autre'
    ];

    useEffect(() => {
        if (isOpen) {
            loadClubs();
        }
    }, [isOpen]);

    const loadClubs = async () => {
        try {
            setLoadingClubs(true);
            const response = await clubService.getClubs();
            if (response.success) {
                setClubs(response.data.clubs || []);
            }
        } catch (err) {
            console.error('Erreur lors du chargement des clubs:', err);
        } finally {
            setLoadingClubs(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let processedValue = value;
        
        if (type === 'number') {
            processedValue = parseFloat(value) || 0;
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validation des champs obligatoires
            if (!formData.titre || !formData.description || !formData.dateDebut || !formData.lieu) {
                setError('Veuillez remplir tous les champs obligatoires');
                return;
            }

            // Validation des dates
            const dateDebut = new Date(formData.dateDebut);
            const dateFin = formData.dateFin ? new Date(formData.dateFin) : null;
            const now = new Date();

            if (dateDebut < now) {
                setError('La date de début ne peut pas être dans le passé');
                return;
            }

            if (dateFin && dateFin < dateDebut) {
                setError('La date de fin ne peut pas être antérieure à la date de début');
                return;
            }

            // Préparer les données
            const eventData = {
                ...formData,
                tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
                maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
                clubId: formData.clubId || null
            };

            const response = await eventService.createEvent(eventData);

            if (response.success) {
                onSuccess();
                onClose();
                setFormData({
                    titre: '',
                    description: '',
                    dateDebut: '',
                    dateFin: '',
                    lieu: '',
                    type: 'conference',
                    clubId: '',
                    maxParticipants: '',
                    prix: 0,
                    tags: '',
                    statut: 'en_attente'
                });
            } else {
                setError(response.message || 'Erreur lors de la création de l\'événement');
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la création de l\'événement');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            titre: '',
            description: '',
            dateDebut: '',
            dateFin: '',
            lieu: '',
            type: 'conference',
            clubId: '',
            maxParticipants: '',
            prix: 0,
            tags: '',
            statut: 'en_attente'
        });
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Créer un nouvel événement</h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre de l'événement *
                                </label>
                                <input
                                    type="text"
                                    id="titre"
                                    name="titre"
                                    value={formData.titre}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Titre de l'événement"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                    Type d'événement *
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    {eventTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Description de l'événement"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-1">
                                    Date et heure de début *
                                </label>
                                <input
                                    type="datetime-local"
                                    id="dateDebut"
                                    name="dateDebut"
                                    value={formData.dateDebut}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-1">
                                    Date et heure de fin
                                </label>
                                <input
                                    type="datetime-local"
                                    id="dateFin"
                                    name="dateFin"
                                    value={formData.dateFin}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lieu" className="block text-sm font-medium text-gray-700 mb-1">
                                Lieu *
                            </label>
                            <input
                                type="text"
                                id="lieu"
                                name="lieu"
                                value={formData.lieu}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Lieu de l'événement"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="clubId" className="block text-sm font-medium text-gray-700 mb-1">
                                    Club organisateur
                                </label>
                                {loadingClubs ? (
                                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                                        Chargement des clubs...
                                    </div>
                                ) : (
                                    <select
                                        id="clubId"
                                        name="clubId"
                                        value={formData.clubId}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Événement institutionnel</option>
                                        {clubs.map(club => (
                                            <option key={club._id} value={club._id}>
                                                {club.nom}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <div>
                                <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre max de participants
                                </label>
                                <input
                                    type="number"
                                    id="maxParticipants"
                                    name="maxParticipants"
                                    value={formData.maxParticipants}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Illimité si vide"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="prix" className="block text-sm font-medium text-gray-700 mb-1">
                                    Prix (TND)
                                </label>
                                <input
                                    type="number"
                                    id="prix"
                                    name="prix"
                                    value={formData.prix}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags (séparés par virgules)
                                </label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="tag1, tag2, tag3"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading || loadingClubs}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                            >
                                {loading ? 'Création...' : 'Créer l\'événement'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEventModal;