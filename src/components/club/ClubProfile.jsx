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
        membres: clubData?.membres || 0,
        fondation: clubData?.fondation ? new Date(clubData.fondation).toISOString().split('T')[0] : '',
        lienRecrutement: clubData?.lienRecrutement || '',
        activites: clubData?.activites || [],
        siteWeb: clubData?.siteWeb || '',
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
        imageCouverture: clubData?.imageCouverture || ''
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
                        </div>
                        
                        {/* Image de couverture */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image de couverture
                            </label>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                <div className="flex items-start">
                                    <div className="text-blue-600 text-lg mr-2">💡</div>
                                    <div>
                                        <p className="text-sm text-blue-800 font-medium mb-1">Recommandations pour un affichage parfait :</p>
                                        <ul className="text-xs text-blue-700 space-y-1">
                                            <li>• <strong>Dimensions recommandées :</strong> 1920x480px (ratio 4:1)</li>
                                            <li>• <strong>Format :</strong> JPG ou PNG</li>
                                            <li>• <strong>Taille max :</strong> 2MB</li>
                                            <li>• <strong>Qualité :</strong> Privilégier les images horizontales nettes</li>
                                            <li>• <strong>URL valide :</strong> Doit commencer par https:// ou être une image base64 complète</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Message d'aide pour URLs invalides */}
                            {formData.imageCouverture && 
                             !(formData.imageCouverture.startsWith('http') || 
                               (formData.imageCouverture.startsWith('data:image/') && formData.imageCouverture.length > 100)) && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                    <div className="flex items-start">
                                        <div className="text-red-600 text-lg mr-2">⚠️</div>
                                        <div>
                                            <p className="text-sm text-red-800 font-medium mb-1">URL d'image invalide détectée :</p>
                                            <ul className="text-xs text-red-700 space-y-1">
                                                <li>• L'URL doit commencer par <code>https://</code> ou <code>http://</code></li>
                                                <li>• Les images base64 doivent être complètes (plus de 100 caractères)</li>
                                                <li>• Évitez les images base64 corrompues ou tronquées</li>
                                            </ul>
                                            <p className="text-xs text-red-600 mt-2 break-all">
                                                URL actuelle : {formData.imageCouverture.substring(0, 100)}...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="space-y-4">
                                {formData.imageCouverture ? (
                                    <div className="space-y-3">
                                        {/* Aperçu comme sur le front-office */}
                                        <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-700 overflow-hidden rounded-lg">
                                            {/* Validation de l'URL avant affichage */}
                                            {formData.imageCouverture && 
                                             (formData.imageCouverture.startsWith('http') || 
                                              (formData.imageCouverture.startsWith('data:image/') && formData.imageCouverture.length > 100)) ? (
                                                <img
                                                    src={formData.imageCouverture}
                                                    alt="Aperçu image de couverture"
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    onLoad={(e) => {
                                                        console.log('✅ Aperçu image chargée:', formData.imageCouverture.substring(0, 80));
                                                        e.target.style.opacity = '1';
                                                    }}
                                                    onError={(e) => {
                                                        console.error('❌ Erreur aperçu image:', formData.imageCouverture.substring(0, 80));
                                                        e.target.style.display = 'none';
                                                        e.target.nextElementSibling.style.display = 'flex';
                                                    }}
                                                    style={{ opacity: 0, transition: 'opacity 0.3s' }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-red-50 border-2 border-dashed border-red-300 flex items-center justify-center">
                                                    <div className="text-center p-4">
                                                        <span className="text-red-500 block text-sm font-medium">⚠️ URL d'image invalide</span>
                                                        <span className="text-xs text-red-400 mt-1">
                                                            {formData.imageCouverture ? 
                                                                `Format non supporté: ${formData.imageCouverture.substring(0, 50)}...` :
                                                                'Aucune image définie'
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="hidden absolute inset-0 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
                                                <span className="text-gray-500">Erreur de chargement de l'image</span>
                                            </div>
                                            {/* Overlay pour la lisibilité */}
                                            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                                            
                                            {/* Simulation du contenu front-office */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center text-white">
                                                    <h1 className="text-2xl font-bold">{formData.nom || 'Nom du Club'}</h1>
                                                    <p className="text-green-200">{formData.categorie || 'Catégorie'}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="absolute top-2 right-2 space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newUrl = prompt('Nouvelle URL de l\'image de couverture:', formData.imageCouverture);
                                                        if (newUrl !== null) {
                                                            setFormData(prev => ({ ...prev, imageCouverture: newUrl }));
                                                        }
                                                    }}
                                                    className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-blue-600"
                                                    title="Modifier l'image"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, imageCouverture: '' }))}
                                                    className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600"
                                                    title="Supprimer l'image"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-center">
                                            {formData.imageCouverture && 
                                             (formData.imageCouverture.startsWith('http') || 
                                              (formData.imageCouverture.startsWith('data:image/') && formData.imageCouverture.length > 100)) ? (
                                                <span className="text-green-600">
                                                    ✅ Aperçu : Voici comment votre image s'affichera sur la page du club
                                                </span>
                                            ) : (
                                                <span className="text-red-600">
                                                    ⚠️ Image invalide : Utilisez une URL HTTP/HTTPS ou une image base64 complète
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                        <div className="text-gray-400 text-4xl mb-4">🖼️</div>
                                        <p className="text-gray-500 mb-4">Aucune image de couverture</p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const url = prompt('URL de l\'image de couverture (recommandé: 1920x480px):');
                                                if (url && url.trim()) {
                                                    setFormData(prev => ({ ...prev, imageCouverture: url.trim() }));
                                                }
                                            }}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            📎 Ajouter une image de couverture
                                        </button>
                                    </div>
                                )}
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

                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Date de fondation
                                </label>
                                <input
                                    type="date"
                                    name="fondation"
                                    value={formData.fondation ? formData.fondation.split('T')[0] : ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Lien de recrutement
                                </label>
                                <input
                                    type="url"
                                    name="lienRecrutement"
                                    value={formData.lienRecrutement}
                                    onChange={handleInputChange}
                                    placeholder="https://forms.google.com/..."
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
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
                                    name="reseauxSociaux.facebook"
                                    value={formData.reseauxSociaux.facebook}
                                    onChange={handleInputChange}
                                    placeholder="https://facebook.com/votreclub"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    name="reseauxSociaux.instagram"
                                    value={formData.reseauxSociaux.instagram}
                                    onChange={handleInputChange}
                                    placeholder="https://instagram.com/votreclub"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    name="reseauxSociaux.linkedin"
                                    value={formData.reseauxSociaux.linkedin}
                                    onChange={handleInputChange}
                                    placeholder="https://linkedin.com/company/votreclub"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    name="reseauxSociaux.twitter"
                                    value={formData.reseauxSociaux.twitter}
                                    onChange={handleInputChange}
                                    placeholder="https://twitter.com/votreclub"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    YouTube
                                </label>
                                <input
                                    type="url"
                                    name="reseauxSociaux.youtube"
                                    value={formData.reseauxSociaux.youtube}
                                    onChange={handleInputChange}
                                    placeholder="https://youtube.com/@votreclub"
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

                    {/* Valeurs */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-medium text-gray-900">
                                Valeurs du club
                            </h4>
                            <button
                                type="button"
                                onClick={() => addArrayItem('valeurs')}
                                className="inline-flex items-center px-3 py-2 border border-green-300 rounded-md text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100"
                            >
                                ➕ Ajouter une valeur
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.detailsComplets.valeurs.map((valeur, index) => (
                                <div key={index} className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={valeur}
                                        onChange={(e) => handleArrayChange('valeurs', index, e.target.value)}
                                        placeholder={`Valeur ${index + 1}`}
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('valeurs', index)}
                                        className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bénéfices */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-medium text-gray-900">
                                Bénéfices / Pourquoi nous rejoindre ?
                            </h4>
                            <button
                                type="button"
                                onClick={() => addArrayItem('benefices')}
                                className="inline-flex items-center px-3 py-2 border border-green-300 rounded-md text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100"
                            >
                                ➕ Ajouter un bénéfice
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.detailsComplets.benefices.map((benefice, index) => (
                                <div key={index} className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={benefice}
                                        onChange={(e) => handleArrayChange('benefices', index, e.target.value)}
                                        placeholder={`Bénéfice ${index + 1}`}
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('benefices', index)}
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {formData.images.map((image, index) => (
                                        <div key={index} className="relative group bg-gray-50 rounded-lg border overflow-hidden">
                                            <img
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                className="w-full h-auto min-h-32 max-h-64 object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextElementSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div className="hidden w-full h-32 bg-gray-100 flex items-center justify-center">
                                                <span className="text-gray-500 text-sm">Erreur de chargement</span>
                                            </div>
                                            <div className="absolute top-1 right-1 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newUrl = prompt(`Modifier l'URL de l'image ${index + 1}:`, image);
                                                        if (newUrl !== null && newUrl.trim()) {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                images: prev.images.map((img, i) => i === index ? newUrl.trim() : img)
                                                            }));
                                                        }
                                                    }}
                                                    className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-blue-600"
                                                    title="Modifier l'image"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                    title="Supprimer l'image"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
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
                    {clubData?.imageCouverture && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-md font-medium text-gray-900">
                                    Image de couverture
                                </h4>
                            </div>
                            <div className="p-6 bg-gray-50">
                                <img
                                    src={clubData.imageCouverture}
                                    alt="Couverture du club"
                                    className="w-full max-h-96 object-contain rounded-lg bg-white"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'block';
                                    }}
                                />
                                <div className="hidden text-center py-8 text-gray-500">
                                    Impossible de charger l'image
                                </div>
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

                    {/* Galerie d'images */}
                    {clubData?.images && clubData.images.length > 0 && (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-md font-medium text-gray-900">
                                    Galerie d'images
                                </h4>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {clubData.images.map((image, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg border overflow-hidden">
                                            <img
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                className="w-full h-auto min-h-32 max-h-64 object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextElementSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div className="hidden w-full h-32 bg-gray-100 flex items-center justify-center">
                                                <span className="text-gray-500 text-sm">Erreur de chargement</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                                    {clubData?.contact?.reseauxSociaux?.facebook && (
                                        <a
                                            href={clubData.contact.reseauxSociaux.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            📘 Facebook
                                        </a>
                                    )}
                                    {clubData?.contact?.reseauxSociaux?.instagram && (
                                        <a
                                            href={clubData.contact.reseauxSociaux.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            📷 Instagram
                                        </a>
                                    )}
                                    {clubData?.contact?.reseauxSociaux?.linkedin && (
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