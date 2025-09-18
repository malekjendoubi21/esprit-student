import React, { useState, useEffect } from 'react';
import { adminService, userService } from '../../services/api';

const CreateClubModal = ({ isOpen, onClose, onSuccess }) => {
    console.log('CreateClubModal rendu avec isOpen:', isOpen);
    
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        categorie: '',
        responsable: '',
        email: '',
        telephone: '',
        statut: 'actif'
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [error, setError] = useState('');

    const categories = [
        'Technologie',
        'Sport',
        'Culture',
        'Éducation',
        'Social',
        'Environnement',
        'Arts',
        'Sciences',
        'Autre'
    ];

    useEffect(() => {
        if (isOpen) {
            loadUsers();
        }
    }, [isOpen]);

    const loadUsers = async () => {
        try {
            setLoadingUsers(true);
            const response = await userService.getAllUsers();
            if (response.success) {
                setUsers(response.data || []);
            }
        } catch (err) {
            console.error('Erreur lors du chargement des utilisateurs:', err);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validation simple
            if (!formData.nom || !formData.description || !formData.categorie) {
                setError('Veuillez remplir tous les champs obligatoires');
                return;
            }

            const response = await adminService.createClub(formData);

            if (response.success) {
                onSuccess();
                onClose();
                setFormData({
                    nom: '',
                    description: '',
                    categorie: '',
                    responsable: '',
                    email: '',
                    telephone: '',
                    statut: 'actif'
                });
            } else {
                setError(response.message || 'Erreur lors de la création du club');
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la création du club');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            nom: '',
            description: '',
            categorie: '',
            responsable: '',
            email: '',
            telephone: '',
            statut: 'actif'
        });
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Créer un nouveau club</h2>
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
                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom du club *
                                </label>
                                <input
                                    type="text"
                                    id="nom"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Nom du club"
                                />
                            </div>

                            <div>
                                <label htmlFor="categorie" className="block text-sm font-medium text-gray-700 mb-1">
                                    Catégorie *
                                </label>
                                <select
                                    id="categorie"
                                    name="categorie"
                                    value={formData.categorie}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">Sélectionner une catégorie</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Description du club et de ses activités"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="responsable" className="block text-sm font-medium text-gray-700 mb-1">
                                    Responsable
                                </label>
                                {loadingUsers ? (
                                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                                        Chargement des utilisateurs...
                                    </div>
                                ) : (
                                    <select
                                        id="responsable"
                                        name="responsable"
                                        value={formData.responsable}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="">Sélectionner un responsable</option>
                                        {users.map(user => (
                                            <option key={user._id} value={user._id}>
                                                {user.nom} {user.prenom} ({user.email})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <div>
                                <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                                    Statut
                                </label>
                                <select
                                    id="statut"
                                    name="statut"
                                    value={formData.statut}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="actif">Actif</option>
                                    <option value="inactif">Inactif</option>
                                    <option value="suspendu">Suspendu</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email du club
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="contact@club.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    id="telephone"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="+216 XX XXX XXX"
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
                                disabled={loading || loadingUsers}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                            >
                                {loading ? 'Création...' : 'Créer le club'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateClubModal;