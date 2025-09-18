import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { passwordResetService } from '../services/api';
import { Alert, Button } from '../components/ui';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('admin');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setError('Veuillez saisir votre adresse email');
            return;
        }

        if (!email.includes('@')) {
            setError('Veuillez saisir une adresse email valide');
            return;
        }

        try {
            setLoading(true);
            setError('');
            setMessage('');

            const response = await passwordResetService.requestReset(email, userType);

            if (response.success) {
                setMessage(response.message);
                setSubmitted(true);
            } else {
                setError(response.message || 'Erreur lors de la demande');
            }
        } catch (err) {
            console.error('Erreur:', err);
            setError('Erreur de connexion au serveur');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Email envoyé !
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Vérifiez votre boîte email
                        </p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {message && (
                            <Alert type="success" message={message} className="mb-4" />
                        )}

                        <p className="text-sm text-gray-600 text-center mb-6">
                            Si un compte existe avec l'adresse <strong>{email}</strong>, 
                            vous recevrez un lien de réinitialisation par email dans quelques minutes.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        Prochaines étapes
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Vérifiez votre boîte de réception</li>
                                            <li>Vérifiez également vos spams/courriers indésirables</li>
                                            <li>Cliquez sur le lien dans l'email reçu</li>
                                            <li>Le lien expire dans 1 heure</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => {
                                    setSubmitted(false);
                                    setEmail('');
                                    setError('');
                                    setMessage('');
                                }}
                                variant="secondary"
                                className="w-full"
                            >
                                Essayer avec un autre email
                            </Button>

                            <Link
                                to="/login"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Retour à la connexion
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Mot de passe oublié
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Saisissez votre email pour recevoir un lien de réinitialisation
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="bg-white shadow rounded-lg p-6">
                        {error && (
                            <Alert type="error" message={error} className="mb-4" />
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                                    Type de compte
                                </label>
                                <select
                                    id="userType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="admin">Administrateur</option>
                                    <option value="club">Club</option>
                                    <option value="user">Utilisateur</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Adresse email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                            </Button>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                to="/login"
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                Retour à la connexion
                            </Link>
                        </div>
                    </div>
                </form>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                                Important
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>
                                    Le lien de réinitialisation expirera dans 1 heure pour des raisons de sécurité.
                                    Si vous ne recevez pas d'email, vérifiez vos spams.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;