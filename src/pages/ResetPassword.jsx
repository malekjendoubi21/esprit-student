import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { passwordResetService } from '../services/api';
import { Alert, Button } from '../components/ui';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [token] = useState(searchParams.get('token'));
    const [userType] = useState(searchParams.get('type') || 'admin');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    // Vérifier le token au chargement
    useEffect(() => {
        verifyToken();
    }, [token, userType]);

    const verifyToken = async () => {
        if (!token || !userType) {
            setError('Lien invalide. Veuillez demander un nouveau lien de réinitialisation.');
            setVerifying(false);
            return;
        }

        try {
            const response = await passwordResetService.verifyResetToken(token, userType);
            
            if (response.success) {
                setUserInfo(response.data);
            } else {
                setError(response.message || 'Token invalide ou expiré');
            }
        } catch (err) {
            console.error('Erreur vérification token:', err);
            setError('Erreur de connexion au serveur');
        } finally {
            setVerifying(false);
        }
    };

    const validatePassword = () => {
        if (!newPassword) {
            return 'Veuillez saisir un nouveau mot de passe';
        }
        
        if (newPassword.length < 6) {
            return 'Le mot de passe doit contenir au moins 6 caractères';
        }
        
        if (newPassword !== confirmPassword) {
            return 'Les mots de passe ne correspondent pas';
        }
        
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validatePassword();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await passwordResetService.resetPassword(
                token, 
                userType, 
                newPassword, 
                confirmPassword
            );

            if (response.success) {
                setSuccess(true);
                // Rediriger vers la page de connexion après 3 secondes
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(response.message || 'Erreur lors de la réinitialisation');
            }
        } catch (err) {
            console.error('Erreur:', err);
            setError('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    };

    // Affichage pendant la vérification du token
    if (verifying) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Vérification du lien...</p>
                </div>
            </div>
        );
    }

    // Affichage si le token est invalide
    if (error && !userInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Lien invalide
                        </h2>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <Alert type="error" message={error} className="mb-6" />

                        <div className="space-y-3">
                            <Link
                                to="/forgot-password"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Demander un nouveau lien
                            </Link>

                            <Link
                                to="/login"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Retour à la connexion
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Affichage de succès
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Mot de passe modifié !
                        </h2>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <p className="text-center text-gray-600 mb-6">
                            Votre mot de passe a été modifié avec succès. 
                            Vous allez être redirigé vers la page de connexion...
                        </p>

                        <Button
                            onClick={() => navigate('/login')}
                            className="w-full"
                        >
                            Se connecter maintenant
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Formulaire de réinitialisation
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Nouveau mot de passe
                    </h2>
                    {userInfo && (
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Compte : {userInfo.email}
                        </p>
                    )}
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="bg-white shadow rounded-lg p-6">
                        {error && (
                            <Alert type="error" message={error} className="mb-4" />
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                    Nouveau mot de passe
                                </label>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Minimum 6 caractères"
                                    minLength={6}
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirmer le mot de passe
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Répétez le mot de passe"
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Modification en cours...' : 'Modifier le mot de passe'}
                            </Button>
                        </div>
                    </div>
                </form>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                Conseils pour un mot de passe sécurisé
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Au moins 6 caractères</li>
                                    <li>Mélangez lettres et chiffres</li>
                                    <li>Évitez les mots du dictionnaire</li>
                                    <li>Utilisez un mot de passe unique</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;