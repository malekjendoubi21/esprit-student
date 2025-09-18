import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Alert } from '../../components/ui';
import { useAppNavigation } from '../../hooks/useAppNavigation';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const { login, loading, error } = useAuth();
    const { redirectAfterLogin } = useAppNavigation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            setMessage({ type: 'error', text: 'Veuillez remplir tous les champs' });
            return;
        }

        try {
            const response = await login(formData.email, formData.password);
            
            if (response.success) {
                setMessage({ type: 'success', text: 'Connexion réussie !' });
                
                // Redirection selon le type d'utilisateur en utilisant le hook
                redirectAfterLogin(
                    response.user.userType, 
                    response.user.premiereConnexion || false
                );
            }
        } catch (err) {
            console.error('Erreur de connexion:', err);
            setMessage({ type: 'error', text: err.message || 'Erreur de connexion' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img
                        className="h-16 w-auto"
                        src="/images/logo.png"
                        alt="ESPRIT Student"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Connexion au BackOffice
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Espace d'administration - ESPRIT Student
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {message.text && (
                        <div className="mb-4">
                            <Alert
                                type={message.type}
                                message={message.text}
                                onClose={() => setMessage({ type: '', text: '' })}
                            />
                        </div>
                    )}

                    {error && (
                        <div className="mb-4">
                            <Alert
                                type="error"
                                message={error}
                            />
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Adresse email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="votre.email@esprit.tn"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mot de passe
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <Link
                                        to="/forgot-password"
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    loading={loading}
                                    className="w-full"
                                    variant="primary"
                                >
                                    Se connecter
                                </Button>
                            </div>
                        </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Accès réservé</span>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <p className="text-xs text-gray-500">
                                Administrateurs et responsables de clubs uniquement
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;