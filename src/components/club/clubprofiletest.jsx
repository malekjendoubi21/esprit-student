import React, { useState } from 'react';
import { clubService } from '../../services/api';

const ClubProfile = ({ clubData, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    // Vérification de sécurité pour clubData
    if (!clubData) {
        return (
            <div className="bg-white shadow rounded-lg p-6">
                <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-4">🏢</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Aucune donnée de club
                    </h3>
                    <p className="text-gray-500">
                        Impossible de charger les informations du club
                    </p>
                </div>
            </div>
        );
    }
    
    const [formData, setFormData] = useState({
        nom: clubData?.nom || '',
        description: clubData?.description || '',
        categorie: clubData?.categorie || '',
        president: {
            nom: clubData?.president?.nom || '',
            prenom: clubData?.president?.prenom || '',
            email: clubData?.president?.email || '',
            telephone: clubData?.president?.telephone || ''
        },
        contact: {
            telephone: clubData?.contact?.telephone || '',
            email: clubData?.contact?.email || '',
            adresse: clubData?.contact?.adresse || ''
        },
        reseauxSociaux: {
            facebook: clubData?.reseauxSociaux?.facebook || '',
            instagram: clubData?.reseauxSociaux?.instagram || '',
            linkedin: clubData?.reseauxSociaux?.linkedin || '',
            twitter: clubData?.reseauxSociaux?.twitter || '',
            youtube: clubData?.reseauxSociaux?.youtube || ''
        },
        detailsComplets: {
            presentation: clubData?.detailsComplets?.presentation || '',
            objectifs: clubData?.detailsComplets?.objectifs || [],
            activitesDetaillees: clubData?.detailsComplets?.activitesDetaillees || [],
            valeurs: clubData?.detailsComplets?.valeurs || [],
            benefices: clubData?.detailsComplets?.benefices || [],
            localisation: clubData?.detailsComplets?.localisation || '',
            horairesReunion: clubData?.detailsComplets?.horairesReunion || ''
        },
        images: clubData?.images || [],
        imageCouverture: clubData?.imageCouverture || '',
        siteWeb: clubData?.siteWeb || '',
        lienRecrutement: clubData?.lienRecrutement || ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const keys = name.split('.');
            setFormData(prev => {
                const newData = { ...prev };
                let current = newData;
                for (let i = 0; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) current[keys[i]] = {};
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = value;
                return newData;
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            detailsComplets: {
                ...prev.detailsComplets,
                [field]: prev.detailsComplets[field].map((item, i) => 
                    i === index ? value : item
                )
            }
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            detailsComplets: {
                ...prev.detailsComplets,
                [field]: [...prev.detailsComplets[field], '']
            }
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            detailsComplets: {
                ...prev.detailsComplets,
                [field]: prev.detailsComplets[field].filter((_, i) => i !== index)
            }
        }));
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    // Fonction pour simuler l'upload d'image (à remplacer par votre service d'upload)
    const handleImageUpload = async (file, type = 'gallery') => {
        setUploadingImage(true);
        try {
            // Simulation d'upload - remplacez par votre logique d'upload réelle
            const formDataUpload = new FormData();
            formDataUpload.append('image', file);
            
            // Pour l'instant, on crée juste une URL temporaire
            const imageUrl = URL.createObjectURL(file);
            
            if (type === 'cover') {
                setFormData(prev => ({
                    ...prev,
                    imageCouverture: imageUrl
                }));
            } else {
                // Vérifier qu'on ne dépasse pas 3 images
                if (formData.images.length >= 3) {
                    setMessage('Maximum 3 images autorisées');
                    return;
                }
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, imageUrl]
                }));
            }
            
            setMessage('Image ajoutée avec succès');
        } catch (error) {
            setMessage('Erreur lors de l\'upload de l\'image');
        } finally {
            setUploadingImage(false);
        }
    };

    const removeCoverImage = () => {
        setFormData(prev => ({
            ...prev,
            imageCouverture: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await clubService.updateMyProfile(formData);
            if (response.success) {
                setMessage('Profil mis à jour avec succès');
                setIsEditing(false);
                if (onUpdate) onUpdate();
            } else {
                setMessage(response.message || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            setMessage('Erreur lors de la mise à jour du profil');
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">
                            Informations du Club
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Gérez les informations de votre club
                        </p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        {isEditing ? '📖 Voir' : '✏️ Modifier'}
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

            {isEditing ? (
                /* Mode Édition */
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informations de base */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                            Informations de base
                        </h4>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nom du club
                                </label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="contact.email"
                                    value={formData.contact.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="contact.telephone"
                                    value={formData.contact.telephone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Image de couverture (URL)
                                </label>
                                <input
                                    type="url"
                                    name="imageCouverture"
                                    value={formData.imageCouverture}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://exemple.com/image.jpg"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
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
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                            Réseaux sociaux
                        </h4>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    name="contact.reseauxSociaux.facebook"
                                    value={formData.contact.reseauxSociaux.facebook}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    name="contact.reseauxSociaux.instagram"
                                    value={formData.contact.reseauxSociaux.instagram}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    name="contact.reseauxSociaux.linkedin"
                                    value={formData.contact.reseauxSociaux.linkedin}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Objectifs */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-medium text-gray-900">
                                Objectifs
                            </h4>
                            <button
                                type="button"
                                onClick={() => addArrayItem('objectifs')}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                ➕ Ajouter
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.detailsComplets.objectifs.map((objectif, index) => (
                                <div key={index} className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={objectif}
                                        onChange={(e) => handleArrayChange('objectifs', index, e.target.value)}
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Objectif du club"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('objectifs', index)}
                                        className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activités */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-medium text-gray-900">
                                Activités
                            </h4>
                            <button
                                type="button"
                                onClick={() => addArrayItem('activitesDetaillees')}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                ➕ Ajouter
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.detailsComplets.activitesDetaillees.map((activite, index) => (
                                <div key={index} className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={activite}
                                        onChange={(e) => handleArrayChange('activitesDetaillees', index, e.target.value)}
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Activité du club"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('activitesDetaillees', index)}
                                        className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Images de galerie */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-medium text-gray-900">
                                Galerie d'images (max 3)
                            </h4>
                        </div>
                        <div className="space-y-4">
                            {/* Images existantes */}
                            {formData.images.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {/* Ajouter de nouvelles images */}
                            {formData.images.length < 3 && (
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ajouter une image (URL)
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="url"
                                            placeholder="https://exemple.com/image.jpg"
                                            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const url = e.target.value.trim();
                                                    if (url && formData.images.length < 3) {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            images: [...prev.images, url]
                                                        }));
                                                        e.target.value = '';
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                const input = e.target.previousElementSibling;
                                                const url = input.value.trim();
                                                if (url && formData.images.length < 3) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        images: [...prev.images, url]
                                                    }));
                                                    input.value = '';
                                                }
                                            }}
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Ajouter
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Appuyez sur Entrée ou cliquez sur "Ajouter" pour ajouter l'image
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            ) : (
                /* Mode Affichage */
                <div className="space-y-6">
                    {/* Informations générales */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h4 className="text-md font-medium text-gray-900">
                                Informations générales
                            </h4>
                        </div>
                        <div className="px-6 py-4">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Nom</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{clubData?.nom}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{clubData?.contact?.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{clubData?.contact?.telephone}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Statut</dt>
                                    <dd className="mt-1">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            clubData?.valide 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {clubData?.valide ? 'Validé' : 'En attente'}
                                        </span>
                                    </dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{clubData?.description}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Image de couverture */}
                    {clubData?.detailsComplets?.imageCouverture && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-md font-medium text-gray-900">
                                    Image de couverture
                                </h4>
                            </div>
                            <div className="p-6">
                                <img
                                    src={clubData.detailsComplets.imageCouverture}
                                    alt="Couverture du club"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {/* Objectifs */}
                    {clubData?.detailsComplets?.objectifs?.length > 0 && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-md font-medium text-gray-900">
                                    Objectifs
                                </h4>
                            </div>
                            <div className="px-6 py-4">
                                <ul className="space-y-2">
                                    {clubData.detailsComplets.objectifs.map((objectif, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span className="text-sm text-gray-900">{objectif}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Activités */}
                    {clubData?.detailsComplets?.activites?.length > 0 && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-md font-medium text-gray-900">
                                    Activités
                                </h4>
                            </div>
                            <div className="px-6 py-4">
                                <ul className="space-y-2">
                                    {clubData.detailsComplets.activites.map((activite, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-500 mr-2">•</span>
                                            <span className="text-sm text-gray-900">{activite}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Réseaux sociaux */}
                    {(clubData?.contact?.reseauxSociaux?.facebook || clubData?.contact?.reseauxSociaux?.instagram || clubData?.contact?.reseauxSociaux?.linkedin) && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-md font-medium text-gray-900">
                                    Réseaux sociaux
                                </h4>
                            </div>
                            <div className="px-6 py-4">
                                <div className="flex space-x-4">
                                    {clubData.contact.reseauxSociaux.facebook && (
                                        <a
                                            href={clubData.contact.reseauxSociaux.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            📘 Facebook
                                        </a>
                                    )}
                                    {clubData.contact.reseauxSociaux.instagram && (
                                        <a
                                            href={clubData.contact.reseauxSociaux.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            📷 Instagram
                                        </a>
                                    )}
                                    {clubData.contact.reseauxSociaux.linkedin && (
                                        <a
                                            href={clubData.contact.reseauxSociaux.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            💼 LinkedIn
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ClubProfile;