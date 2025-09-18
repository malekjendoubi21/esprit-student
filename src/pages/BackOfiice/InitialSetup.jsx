import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Loading } from '../../components/ui';
import adminManagementService from '../../services/adminManagementService';

const InitialSetup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [checkingSetup, setCheckingSetup] = useState(true);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    // Vérifier si l'application est déjà configurée
    useEffect(() => {
        checkSetupStatus();
    }, []);

    const checkSetupStatus = async () => {
        try {
            const response = await adminManagementService.checkSetup();
            if (response.data.isSetup) {
                // L'application est déjà configurée, rediriger vers login
                navigate('/backoffice/login');
            }
        } catch (error) {
            console.error('Erreur lors de la vérification:', error);
        } finally {
            setCheckingSetup(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nom.trim()) {
            newErrors.nom = 'Le nom est requis';
        }

        if (!formData.prenom.trim()) {
            newErrors.prenom = 'Le prénom est requis';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await adminManagementService.initialSetup({
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                password: formData.password
            });

            // Rediriger vers la page de login avec un message de succès
            navigate('/backoffice/login', {
                state: { 
                    message: 'Configuration initiale terminée avec succès. Vous pouvez maintenant vous connecter.',
                    type: 'success'
                }
            });
        } catch (error) {
            console.error('Erreur lors de la configuration:', error);
            setErrors({
                submit: error.response?.data?.message || 'Erreur lors de la configuration initiale'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDefault = async () => {
        setLoading(true);
        try {
            await adminManagementService.createDefaultAdmin();
            
            // Rediriger vers la page de login avec les informations par défaut
            navigate('/backoffice/login', {
                state: { 
                    message: 'Admin par défaut créé. Email: admin@esprit.tn, Mot de passe: Admin123!',
                    type: 'info',
                    defaultCredentials: {
                        email: 'admin@esprit.tn',
                        password: 'Admin123!'
                    }
                }
            });
        } catch (error) {
            console.error('Erreur lors de la création de l\'admin par défaut:', error);
            setErrors({
                submit: error.response?.data?.message || 'Erreur lors de la création de l\'admin par défaut'
            });
        } finally {
            setLoading(false);
        }
    };

    if (checkingSetup) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loading message="Vérification de la configuration..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Configuration Initiale
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Créez le premier administrateur pour commencer à utiliser l'application
                    </p>
                </div>

                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {errors.submit && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                            {errors.submit}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                                    Prénom
                                </label>
                                <Input
                                    id="prenom"
                                    name="prenom"
                                    type="text"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    error={errors.prenom}
                                    placeholder="Prénom"
                                />
                            </div>

                            <div>
                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                    Nom
                                </label>
                                <Input
                                    id="nom"
                                    name="nom"
                                    type="text"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    error={errors.nom}
                                    placeholder="Nom"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Adresse email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                placeholder="admin@esprit.tn"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                placeholder="Au moins 8 caractères"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirmer le mot de passe
                            </label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                placeholder="Confirmez votre mot de passe"
                            />
                        </div>

                        <div className="space-y-4">
                            <Button
                                type="submit"
                                className="w-full"
                                loading={loading}
                                disabled={loading}
                            >
                                Créer l'administrateur
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">ou</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={handleCreateDefault}
                                loading={loading}
                                disabled={loading}
                            >
                                Créer un admin par défaut
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                    Information importante
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        L'admin par défaut utilise les identifiants : <strong>admin@esprit.tn</strong> / <strong>Admin123!</strong>
                                        <br />
                                        Changez ces identifiants après votre première connexion pour des raisons de sécurité.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InitialSetup;