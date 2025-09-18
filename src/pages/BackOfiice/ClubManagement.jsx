import React, { useState, useEffect } from 'react';
import { clubService } from '../../services/api';
import { Alert, Loading, Pagination, SearchInput, StatusBadge } from '../../components/ui';

const ClubManagement = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        categorie: '',
        description: '',
        telephone: '',
        type: '',
        statut: 'actif',
        logo: '',
        president: '',
        reseauxSociaux: {
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: ''
        }
    });

    const clubTypes = [
        'sportif',
        'culturel',
        'technologique',
        'social',
        'academique',
        'entrepreneurial',
        'Autre'
    ];

    const clubStatuses = [
        { value: 'actif', label: 'Actif', color: 'green' },
        { value: 'inactif', label: 'Inactif', color: 'red' },
        { value: 'suspendu', label: 'Suspendu', color: 'yellow' }
    ];

    useEffect(() => {
        loadClubs();
    }, [currentPage, searchTerm]);

    const loadClubs = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await clubService.getClubs({
                page: currentPage,
                limit: 10,
                search: searchTerm
            });

            if (response.success) {
                setClubs(response.data.clubs);
                setTotalPages(response.data.totalPages);
            }
        } catch (err) {
            console.error('Erreur lors du chargement:', err);
            setError('Erreur lors du chargement des clubs');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('reseauxSociaux.')) {
            const socialKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                reseauxSociaux: {
                    ...prev.reseauxSociaux,
                    [socialKey]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const resetForm = () => {
        setFormData({
            nom: '',
            email: '',
            categorie: '',
            description: '',
            telephone: '',
            type: '',
            statut: 'actif',
            logo: '',
            president: '',
            reseauxSociaux: {
                facebook: '',
                instagram: '',
                linkedin: '',
                twitter: ''
            }
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await clubService.createClub(formData);
            if (response.success) {
                setSuccess('Club créé avec succès');
                setShowCreateModal(false);
                resetForm();
                loadClubs();
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la création');
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await clubService.updateClub(selectedClub._id, formData);
            if (response.success) {
                setSuccess('Club modifié avec succès');
                setShowEditModal(false);
                setSelectedClub(null);
                resetForm();
                loadClubs();
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la modification');
        }
    };
    
    const handleUpdateStatus = async (clubId, newStatus, validation) => {
        try {
            setLoading(true);
            const response = await clubService.updateClubStatus(clubId, {
                statut: newStatus,
                valide: validation
            });
            
            if (response.success) {
                setSuccess(`Statut du club mis à jour avec succès`);
                loadClubs();
            }
        } catch (err) {
            console.error('Erreur lors de la mise à jour du statut:', err);
            setError(err.message || 'Erreur lors de la mise à jour du statut');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await clubService.deleteClub(selectedClub._id);
            if (response.success) {
                setSuccess('Club supprimé avec succès');
                setShowDeleteModal(false);
                setSelectedClub(null);
                loadClubs();
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la suppression');
        }
    };

    const openEditModal = (club) => {
        setSelectedClub(club);
        setFormData({
            nom: club.nom,
            description: club.description,
            type: club.type,
            president: typeof club.president === 'string' 
                ? club.president 
                : club.president 
                    ? `${club.president.nom || ''} ${club.president.prenom || ''}`.trim()
                    : '',
            email: club.email,
            telephone: club.telephone || '',
            statut: club.statut,
            logo: club.detailsComplets?.logo || club.logo || '',
            reseauxSociaux: {
                facebook: club.reseauxSociaux?.facebook || '',
                instagram: club.reseauxSociaux?.instagram || '',
                linkedin: club.reseauxSociaux?.linkedin || '',
                twitter: club.reseauxSociaux?.twitter || ''
            }
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (club) => {
        setSelectedClub(club);
        setShowDeleteModal(true);
    };

    const getStatusColor = (status) => {
        const statusObj = clubStatuses.find(s => s.value === status);
        return statusObj ? statusObj.color : 'gray';
    };

    const getStatusLabel = (status) => {
        const statusObj = clubStatuses.find(s => s.value === status);
        return statusObj ? statusObj.label : status;
    };

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">Gestion des clubs</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Gérez tous les clubs étudiants et leurs informations.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Ajouter un club
                    </button>
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

            {/* Recherche */}
            <div className="flex justify-between items-center">
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Rechercher par nom, type..."
                    className="max-w-md"
                />
                <button
                    onClick={loadClubs}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Actualiser
                </button>
            </div>

            {/* Grille des clubs */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {loading ? (
                    <div className="p-8 text-center">
                        <Loading size="large" />
                    </div>
                ) : clubs.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-gray-500">Aucun club trouvé</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {clubs.map((club) => (
                            <div key={club._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center">
                                        {(club.detailsComplets?.logo || club.logo) ? (
                                            <img
                                                src={club.detailsComplets?.logo || club.logo}
                                                alt={club.nom}
                                                className="h-12 w-12 rounded-lg object-contain bg-white border border-gray-200"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextElementSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : (
                                            <div></div>
                                        )}
                                        <div 
                                            className={`h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center ${(club.detailsComplets?.logo || club.logo) ? 'hidden' : ''}`}
                                            title="Pas de logo défini"
                                        >
                                            <span className="text-sm font-medium text-white">
                                                {club.nom?.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-lg font-medium text-gray-900">{club.nom}</h3>
                                            <p className="text-sm text-gray-500">{club.type}</p>
                                            <div className="flex items-center mt-1">
                                                <StatusBadge
                                                    status={club.statut}
                                                    color={getStatusColor(club.statut)}
                                                >
                                                    {getStatusLabel(club.statut)}
                                                </StatusBadge>
                                                
                                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${club.valide ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {club.valide ? 'Validé' : 'Non validé'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                                    {club.description}
                                </p>

                                <div className="mt-4 space-y-2">
                                    {club.president && (
                                        <p className="text-sm">
                                            <span className="font-medium">Président:</span> {
                                                typeof club.president === 'string' 
                                                    ? club.president 
                                                    : `${club.president.nom || ''} ${club.president.prenom || ''}`.trim()
                                            }
                                        </p>
                                    )}
                                    <p className="text-sm">
                                        <span className="font-medium">Email:</span> {club.email}
                                    </p>
                                    {club.telephone && (
                                        <p className="text-sm">
                                            <span className="font-medium">Tél:</span> {club.telephone}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 flex flex-col space-y-2">
                                    <div className="flex justify-between space-x-2">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openEditModal(club)}
                                                className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                            >
                                                Modifier
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => openDeleteModal(club)}
                                            className="px-3 py-1 text-sm border border-red-300 rounded-md text-red-600 hover:bg-red-50"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                    
                                    {/* Status actions */}
                                    <div className="w-full pt-2 flex flex-wrap gap-2">
                                        {!club.valide && (
                                            <button
                                                onClick={() => handleUpdateStatus(club._id, club.statut, true)}
                                                className="px-3 py-1 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded"
                                                title="Rendre le club visible publiquement"
                                            >
                                                Valider
                                            </button>
                                        )}
                                        
                                        {club.statut !== 'actif' && (
                                            <button
                                                onClick={() => handleUpdateStatus(club._id, 'actif', club.valide)}
                                                className="px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded"
                                                title="Changer le statut à actif"
                                            >
                                                Activer
                                            </button>
                                        )}
                                        
                                        {/* Quick action to make visible and active */}
                                        {(!club.valide || club.statut !== 'actif') && (
                                            <button
                                                onClick={() => handleUpdateStatus(club._id, 'actif', true)}
                                                className="px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded"
                                                title="Rendre le club actif et visible publiquement"
                                            >
                                                Activer et valider
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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

            {/* Modal Création */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Créer un club</h2>
                                <button
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        resetForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                <form onSubmit={handleCreate} className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-blue-700">
                                <strong>Information :</strong> Seuls le nom et l'email sont obligatoires. 
                                Un mot de passe sera généré automatiquement et envoyé par email au club.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nom du club <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ex: Club Robotique ESPRIT"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email du club <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="club@esprit.tn"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <select
                            name="categorie"
                            value={formData.categorie}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Sélectionner une catégorie (optionnel)</option>
                            {clubTypes.map(type => (
                                <option key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description courte</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={2}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Description courte du club (optionnel)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Téléphone de contact</label>
                        <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+216 XX XXX XXX (optionnel)"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShowCreateModal(false);
                                resetForm();
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Créer
                        </button>
                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Modification */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Modifier le club</h2>
                                <button
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setSelectedClub(null);
                                        resetForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                <form onSubmit={handleEdit} className="space-y-4">
                    {/* Même formulaire que pour la création */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom du club</label>
                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Sélectionner un type</option>
                                {clubTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Président</label>
                            <input
                                type="text"
                                name="president"
                                value={formData.president}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Statut</label>
                            <select
                                name="statut"
                                value={formData.statut}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                {clubStatuses.map(status => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Logo (URL)</label>
                        <input
                            type="url"
                            name="logo"
                            value={formData.logo}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Réseaux sociaux</label>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="url"
                                name="reseauxSociaux.facebook"
                                value={formData.reseauxSociaux.facebook}
                                onChange={handleInputChange}
                                placeholder="Facebook"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="url"
                                name="reseauxSociaux.instagram"
                                value={formData.reseauxSociaux.instagram}
                                onChange={handleInputChange}
                                placeholder="Instagram"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="url"
                                name="reseauxSociaux.linkedin"
                                value={formData.reseauxSociaux.linkedin}
                                onChange={handleInputChange}
                                placeholder="LinkedIn"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="url"
                                name="reseauxSociaux.twitter"
                                value={formData.reseauxSociaux.twitter}
                                onChange={handleInputChange}
                                placeholder="Twitter"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShowEditModal(false);
                                setSelectedClub(null);
                                resetForm();
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Modifier
                        </button>
                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}



            {/* Modal Suppression */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Supprimer le club</h2>
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedClub(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-500">
                                    Êtes-vous sûr de vouloir supprimer le club{' '}
                                    <span className="font-medium">{selectedClub?.nom}</span> ?{' '}
                                    Cette action supprimera également tous les événements associés et est irréversible.
                                </p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => {
                                            setShowDeleteModal(false);
                                            setSelectedClub(null);
                                        }}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    >
                                        Supprimer
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

export default ClubManagement;