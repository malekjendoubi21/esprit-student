import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { firstLoginService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ClubFirstLogin = () => {
    const [formData, setFormData] = useState({
        motDePasse: '',
        confirmMotDePasse: '',
        president: {
            nom: '',
            prenom: '',
            email: ''
        },
        description: '',
        contact: {
            telephone: ''
        },
        membres: 0,
        detailsComplets: {
            presentation: '',
            objectifs: [''],
            logo: ''
        },
        reseauxSociaux: {
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: ''
        },
        images: [],
        imageCouverture: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    // Charger les données existantes du club
    useEffect(() => {
        const loadClubData = async () => {
            if (user && user.id) {
                try {
                    const response = await firstLoginService.checkFirstLogin();
                    if (response.success && response.data.club) {
                        const club = response.data.club;
                        
                        // Initialiser le formulaire avec les données existantes
                        setFormData(prev => ({
                            ...prev,
                            description: club.description || '',
                            membres: club.membres || 0,
                            president: {
                                nom: club.president?.nom || '',
                                prenom: club.president?.prenom || '',
                                email: club.president?.email || ''
                            },
                            contact: {
                                telephone: club.contact?.telephone || ''
                            },
                            detailsComplets: {
                                presentation: club.detailsComplets?.presentation || '',
                                objectifs: club.detailsComplets?.objectifs || [''],
                                logo: club.detailsComplets?.logo || ''
                            },
                            reseauxSociaux: {
                                facebook: club.reseauxSociaux?.facebook || '',
                                instagram: club.reseauxSociaux?.instagram || '',
                                linkedin: club.reseauxSociaux?.linkedin || '',
                                twitter: club.reseauxSociaux?.twitter || ''
                            },
                            images: club.images || [],
                            imageCouverture: club.imageCouverture || ''
                        }));
                    }
                } catch (error) {
                    console.error('Erreur lors du chargement des données:', error);
                }
            }
        };

        loadClubData();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.startsWith('president.')) {
            const key = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                president: {
                    ...prev.president,
                    [key]: value
                }
            }));
        } else if (name.startsWith('contact.')) {
            const key = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                contact: {
                    ...prev.contact,
                    [key]: value
                }
            }));
        } else if (name.startsWith('detailsComplets.')) {
            const key = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                detailsComplets: {
                    ...prev.detailsComplets,
                    [key]: value
                }
            }));
        } else if (name.startsWith('reseauxSociaux.')) {
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

    const addImage = (url) => {
        if (url && formData.images.length < 3) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, url]
            }));
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        if (!formData.motDePasse || formData.motDePasse.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return false;
        }
        
        if (formData.motDePasse !== formData.confirmMotDePasse) {
            setError('Les mots de passe ne correspondent pas');
            return false;
        }

        if (!formData.president.nom || !formData.president.prenom || !formData.president.email) {
            setError('Les informations du président sont obligatoires');
            return false;
        }

        if (!formData.description) {
            setError('La description du club est obligatoire');
            return false;
        }

        if (!formData.contact.telephone) {
            setError('Le numéro de téléphone est obligatoire');
            return false;
        }

        if (!formData.detailsComplets.presentation) {
            setError('La présentation du club est obligatoire');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await firstLoginService.completeProfile(formData);
            
            if (response.success) {
                setSuccess('Profil complété avec succès ! Vous allez être redirigé vers la page de connexion.');
                
                // Redirection vers login après 2 secondes
                setTimeout(() => {
                    navigate('/backoffice/login');
                }, 2000);
            }
        } catch (err) {
            console.error('Erreur lors de la completion du profil:', err);
            setError(err.message || 'Erreur lors de la completion du profil');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="flex justify-center">
                    <img
                        className="h-16 w-auto"
                        src="/images/logo.png"
                        alt="ESPRIT Student"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Première connexion
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Complétez votre profil club pour accéder au système
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {/* Informations du club */}
                    {user && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-lg font-medium text-blue-900">Bienvenue {user?.nom}!</h3>
                            <p className="text-sm text-blue-700 mt-1">
                                Email: {user?.email}
                            </p>
                            <p className="text-sm text-blue-700">
                                Vous devez compléter les informations de votre club pour accéder au système.
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                            <button
                                type="button"
                                onClick={() => setError('')}
                                className="float-right font-bold"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            {success}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Section Sécurité */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Sécurité du compte
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700">
                                        Nouveau mot de passe *
                                    </label>
                                    <input
                                        id="motDePasse"
                                        name="motDePasse"
                                        type="password"
                                        required
                                        value={formData.motDePasse}
                                        onChange={handleInputChange}
                                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Au moins 6 caractères"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmMotDePasse" className="block text-sm font-medium text-gray-700">
                                        Confirmer le mot de passe *
                                    </label>
                                    <input
                                        id="confirmMotDePasse"
                                        name="confirmMotDePasse"
                                        type="password"
                                        required
                                        value={formData.confirmMotDePasse}
                                        onChange={handleInputChange}
                                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Retapez le mot de passe"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section Président */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Informations du président
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="president.nom" className="block text-sm font-medium text-gray-700">
                                        Nom *
                                    </label>
                                    <input
                                        id="president.nom"
                                        name="president.nom"
                                        type="text"
                                        required
                                        value={formData.president.nom}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="president.prenom" className="block text-sm font-medium text-gray-700">
                                        Prénom *
                                    </label>
                                    <input
                                        id="president.prenom"
                                        name="president.prenom"
                                        type="text"
                                        required
                                        value={formData.president.prenom}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="president.email" className="block text-sm font-medium text-gray-700">
                                        Email *
                                    </label>
                                    <input
                                        id="president.email"
                                        name="president.email"
                                        type="email"
                                        required
                                        value={formData.president.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section Club */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Informations du club
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description du club *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        required
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Décrivez brièvement votre club..."
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="contact.telephone" className="block text-sm font-medium text-gray-700">
                                            Téléphone *
                                        </label>
                                        <input
                                            id="contact.telephone"
                                            name="contact.telephone"
                                            type="tel"
                                            required
                                            value={formData.contact.telephone}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="+216 XX XXX XXX"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="membres" className="block text-sm font-medium text-gray-700">
                                            Nombre de membres
                                        </label>
                                        <input
                                            id="membres"
                                            name="membres"
                                            type="number"
                                            min="0"
                                            value={formData.membres}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="detailsComplets.presentation" className="block text-sm font-medium text-gray-700">
                                        Présentation détaillée *
                                    </label>
                                    <textarea
                                        id="detailsComplets.presentation"
                                        name="detailsComplets.presentation"
                                        rows={4}
                                        required
                                        value={formData.detailsComplets.presentation}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Présentez votre club en détail..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section Réseaux sociaux */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Réseaux sociaux (optionnel)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="reseauxSociaux.facebook" className="block text-sm font-medium text-gray-700">
                                        Facebook
                                    </label>
                                    <input
                                        id="reseauxSociaux.facebook"
                                        name="reseauxSociaux.facebook"
                                        type="url"
                                        value={formData.reseauxSociaux.facebook}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reseauxSociaux.instagram" className="block text-sm font-medium text-gray-700">
                                        Instagram
                                    </label>
                                    <input
                                        id="reseauxSociaux.instagram"
                                        name="reseauxSociaux.instagram"
                                        type="url"
                                        value={formData.reseauxSociaux.instagram}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reseauxSociaux.linkedin" className="block text-sm font-medium text-gray-700">
                                        LinkedIn
                                    </label>
                                    <input
                                        id="reseauxSociaux.linkedin"
                                        name="reseauxSociaux.linkedin"
                                        type="url"
                                        value={formData.reseauxSociaux.linkedin}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://linkedin.com/..."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reseauxSociaux.twitter" className="block text-sm font-medium text-gray-700">
                                        Twitter
                                    </label>
                                    <input
                                        id="reseauxSociaux.twitter"
                                        name="reseauxSociaux.twitter"
                                        type="url"
                                        value={formData.reseauxSociaux.twitter}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://twitter.com/..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section Images */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Images du club (optionnel)
                            </h3>
                            <div className="space-y-4">
                                {/* Logo */}
                                <div>
                                    <label htmlFor="detailsComplets.logo" className="block text-sm font-medium text-gray-700">
                                        Logo du club
                                    </label>
                                    <input
                                        id="detailsComplets.logo"
                                        name="detailsComplets.logo"
                                        type="url"
                                        value={formData.detailsComplets.logo}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://exemple.com/logo.png"
                                    />
                                    {formData.detailsComplets.logo && (
                                        <div className="mt-2 bg-gray-50 p-2 rounded-lg">
                                            <img 
                                                src={formData.detailsComplets.logo} 
                                                alt="Logo du club" 
                                                className="h-16 w-16 object-contain rounded-lg border border-gray-300 bg-white mx-auto"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Image de couverture */}
                                <div>
                                    <label htmlFor="imageCouverture" className="block text-sm font-medium text-gray-700">
                                        Image de couverture
                                    </label>
                                    <input
                                        id="imageCouverture"
                                        name="imageCouverture"
                                        type="url"
                                        value={formData.imageCouverture}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="https://exemple.com/couverture.jpg"
                                    />
                                    {formData.imageCouverture && (
                                        <div className="mt-2 bg-gray-50 p-2 rounded-lg">
                                            <img 
                                                src={formData.imageCouverture} 
                                                alt="Image de couverture" 
                                                className="w-full max-h-64 object-contain rounded-lg border border-gray-300 bg-white"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Galerie d'images */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Galerie d'images (max 3)
                                    </label>
                                    
                                    {/* Images existantes */}
                                    {formData.images.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                            {formData.images.map((image, index) => (
                                                <div key={index} className="relative bg-gray-50 rounded-lg border overflow-hidden">
                                                    <img
                                                        src={image}
                                                        alt={`Image ${index + 1}`}
                                                        className="w-full h-auto min-h-24 max-h-48 object-contain"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Ajouter une nouvelle image */}
                                    {formData.images.length < 3 && (
                                        <div className="flex space-x-2">
                                            <input
                                                type="url"
                                                placeholder="https://exemple.com/image.jpg"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        const url = e.target.value.trim();
                                                        if (url) {
                                                            addImage(url);
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
                                                    if (url) {
                                                        addImage(url);
                                                        input.value = '';
                                                    }
                                                }}
                                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Ajouter
                                            </button>
                                        </div>
                                    )}

                                    <p className="mt-2 text-xs text-gray-500">
                                        Entrez l'URL d'une image et appuyez sur Entrée ou cliquez sur "Ajouter"
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                * Champs obligatoires
                            </p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? 'Chargement...' : 'Compléter mon profil'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Aide</span>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <p className="text-sm text-gray-500">
                                Des difficultés ? Contactez l'administration à{' '}
                                <a href="mailto:admin@esprit.tn" className="text-blue-600 hover:text-blue-500">
                                    admin@esprit.tn
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubFirstLogin;

