import React, { useState, useEffect } from 'react';
import { userService } from '../../services/api';
import { Alert, Loading, Pagination, SearchInput, StatusBadge } from '../../components/ui';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        userType: 'club',
        club: '',
        telephone: '',
        poste: ''
    });

    const userTypes = [
        { value: 'admin', label: 'Administrateur' },
        { value: 'club_manager', label: 'Responsable Club' },
        { value: 'club', label: 'Club' }
    ];

    useEffect(() => {
        loadUsers();
    }, [currentPage, searchTerm]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await userService.getUsers({
                page: currentPage,
                limit: 10,
                search: searchTerm
            });

            if (response.success) {
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            }
        } catch (err) {
            console.error('Erreur lors du chargement:', err);
            setError('Erreur lors du chargement des utilisateurs');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            nom: '',
            prenom: '',
            email: '',
            userType: 'club',
            club: '',
            telephone: '',
            poste: ''
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.createUser(formData);
            if (response.success) {
                setSuccess('Utilisateur créé avec succès');
                setShowCreateModal(false);
                resetForm();
                loadUsers();
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la création');
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.updateUser(selectedUser._id, formData);
            if (response.success) {
                setSuccess('Utilisateur modifié avec succès');
                setShowEditModal(false);
                setSelectedUser(null);
                resetForm();
                loadUsers();
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la modification');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await userService.deleteUser(selectedUser._id);
            if (response.success) {
                setSuccess('Utilisateur supprimé avec succès');
                setShowDeleteModal(false);
                setSelectedUser(null);
                loadUsers();
            }
        } catch (err) {
            setError(err.message || 'Erreur lors de la suppression');
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setFormData({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            userType: user.userType,
            club: typeof user.club === 'string' 
                ? user.club 
                : user.club?.nom || '',
            telephone: user.telephone || '',
            poste: user.poste || ''
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const getUserTypeLabel = (type) => {
        const userType = userTypes.find(t => t.value === type);
        return userType ? userType.label : type;
    };

    const getUserTypeColor = (type) => {
        switch (type) {
            case 'admin':
                return 'red';
            case 'club_manager':
                return 'blue';
            case 'club':
                return 'green';
            default:
                return 'gray';
        }
    };

    return (
        <div className="space-y-6">
            {/* En-tête */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">Gestion des utilisateurs</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Liste de tous les utilisateurs avec leurs informations et statuts.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Ajouter un utilisateur
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
                    placeholder="Rechercher par nom, email..."
                    className="max-w-md"
                />
                <button
                    onClick={loadUsers}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Actualiser
                </button>
            </div>

            {/* Tableau */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {loading ? (
                    <div className="p-8 text-center">
                        <Loading size="large" />
                    </div>
                ) : users.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-gray-500">Aucun utilisateur trouvé</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <li key={user._id}>
                                <div className="px-4 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-700 uppercase">
                                                    {user.nom?.charAt(0)}{user.prenom?.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="flex items-center">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {user.nom} {user.prenom}
                                                </p>
                                                <StatusBadge
                                                    status={user.userType}
                                                    color={getUserTypeColor(user.userType)}
                                                    className="ml-2"
                                                >
                                                    {getUserTypeLabel(user.userType)}
                                                </StatusBadge>
                                            </div>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                            {user.club && (
                                                <p className="text-xs text-gray-400">Club: {
                                                    typeof user.club === 'string' 
                                                        ? user.club 
                                                        : user.club.nom || 'Club'
                                                }</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => openEditModal(user)}
                                            className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(user)}
                                            className="px-3 py-1 text-sm border border-red-300 rounded-md text-red-600 hover:bg-red-50"
                                        >
                                            Supprimer
                                        </button>
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

            {/* Modal Création */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Créer un utilisateur</h2>
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
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom</label>
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
                            <label className="block text-sm font-medium text-gray-700">Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
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
                        <label className="block text-sm font-medium text-gray-700">Type d'utilisateur</label>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {userTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {(formData.userType === 'club' || formData.userType === 'club_manager') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Club</label>
                            <input
                                type="text"
                                name="club"
                                value={formData.club}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Poste</label>
                            <input
                                type="text"
                                name="poste"
                                value={formData.poste}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
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
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Modifier l'utilisateur</h2>
                                <button
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setSelectedUser(null);
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
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom</label>
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
                            <label className="block text-sm font-medium text-gray-700">Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
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
                        <label className="block text-sm font-medium text-gray-700">Type d'utilisateur</label>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            {userTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {(formData.userType === 'club' || formData.userType === 'club_manager') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Club</label>
                            <input
                                type="text"
                                name="club"
                                value={formData.club}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Poste</label>
                            <input
                                type="text"
                                name="poste"
                                value={formData.poste}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShowEditModal(false);
                                setSelectedUser(null);
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
                                <h2 className="text-xl font-semibold">Supprimer l'utilisateur</h2>
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedUser(null);
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
                                    Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
                                    <span className="font-medium">
                                        {selectedUser?.nom} {selectedUser?.prenom}
                                    </span>{' '}
                                    ? Cette action est irréversible.
                                </p>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => {
                                            setShowDeleteModal(false);
                                            setSelectedUser(null);
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

export default UserManagement;