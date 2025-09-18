import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './../contexts/AuthContext';
import { Loading } from './ui';

const ProtectedRoute = ({ children, requiredPermissions = [], redirectTo = '/backoffice/login' }) => {
    const { user, loading, hasPermission } = useAuth();
    const location = useLocation();

    console.log('=== PROTECTED ROUTE DEBUG ===');
    console.log('Current path:', location.pathname);
    console.log('Required permissions:', requiredPermissions);
    console.log('User:', user);
    console.log('Loading:', loading);
    console.log('==============================');

    // Afficher un loading pendant la vérification d'authentification
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loading size="large" />
            </div>
        );
    }

    // Rediriger vers la page de connexion si non authentifié
    if (!user) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Gestion spéciale pour la première connexion des clubs
    if (user.userType === 'club' && user.premiereConnexion && 
        location.pathname !== '/backoffice/club/first-login') {
        return <Navigate to="/backoffice/club/first-login" replace />;
    }

    // Vérifier si l'utilisateur a les permissions requises
    if (requiredPermissions.length > 0) {
        console.log('=== PERMISSION CHECK ===');
        console.log('Required permissions:', requiredPermissions);
        
        const permissionResults = requiredPermissions.map(permission => {
            const result = hasPermission(permission);
            console.log(`Permission '${permission}':`, result);
            return result;
        });
        
        const hasRequiredPermission = permissionResults.some(result => result);
        console.log('Has any required permission:', hasRequiredPermission);
        console.log('========================');

        if (!hasRequiredPermission) {
            console.log('❌ Access denied - redirecting...');
            // Rediriger vers le dashboard approprié selon le type d'utilisateur
            let redirectPath = '/';
            
            if (user.userType === 'admin') {
                redirectPath = '/backoffice/dashboard';
            } else if (user.userType === 'club' || user.userType === 'club_manager') {
                // Si c'est la première connexion d'un club, rediriger vers la page de completion
                if (user.userType === 'club' && user.premiereConnexion) {
                    redirectPath = '/backoffice/club/first-login';
                } else {
                    redirectPath = '/backoffice/club/dashboard';
                }
            }
            
            return <Navigate to={redirectPath} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;