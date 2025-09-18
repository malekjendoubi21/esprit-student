/**
 * Utilitaires pour valider et tester les routes
 */

import { ROUTES, PUBLIC_ROUTES, ADMIN_ROUTES, CLUB_ROUTES } from '../config/routes';

/**
 * Valide qu'une route existe dans la configuration
 */
export const validateRoute = (route) => {
    const allRoutes = Object.values(ROUTES);
    return allRoutes.includes(route);
};

/**
 * Détermine si une route est publique
 */
export const isPublicRoute = (route) => {
    return PUBLIC_ROUTES.includes(route);
};

/**
 * Détermine si une route nécessite des permissions admin
 */
export const isAdminRoute = (route) => {
    return ADMIN_ROUTES.includes(route);
};

/**
 * Détermine si une route est accessible aux clubs
 */
export const isClubRoute = (route) => {
    return CLUB_ROUTES.includes(route);
};

/**
 * Obtient le type de route basé sur le chemin
 */
export const getRouteType = (route) => {
    if (isPublicRoute(route)) return 'public';
    if (isAdminRoute(route)) return 'admin';
    if (isClubRoute(route)) return 'club';
    return 'unknown';
};

/**
 * Valide que l'utilisateur a les permissions pour accéder à une route
 */
export const validateUserPermissions = (route, userType, userPermissions = []) => {
    const routeType = getRouteType(route);
    
    switch (routeType) {
        case 'public':
            return true;
        case 'admin':
            return userType === 'admin' || userPermissions.includes('admin');
        case 'club':
            return ['club', 'club_manager'].includes(userType) || 
                   userPermissions.some(p => ['club', 'club_manager'].includes(p));
        default:
            return false;
    }
};

/**
 * Obtient la route de redirection basée sur le type d'utilisateur
 */
export const getDefaultRouteForUser = (userType, isFirstLogin = false) => {
    switch (userType) {
        case 'admin':
            return ROUTES.ADMIN_DASHBOARD;
        case 'club_manager':
            return ROUTES.CLUB_DASHBOARD;
        case 'club':
            return isFirstLogin ? ROUTES.CLUB_FIRST_LOGIN : ROUTES.CLUB_DASHBOARD;
        default:
            return ROUTES.HOME;
    }
};

/**
 * Vérifie si une route nécessite une première connexion
 */
export const requiresFirstLogin = (route) => {
    return route === ROUTES.CLUB_FIRST_LOGIN;
};

/**
 * Liste toutes les routes disponibles avec leurs types
 */
export const getAllRoutesInfo = () => {
    const routesInfo = [];
    
    Object.entries(ROUTES).forEach(([key, route]) => {
        routesInfo.push({
            key,
            route,
            type: getRouteType(route),
            isPublic: isPublicRoute(route),
            isAdmin: isAdminRoute(route),
            isClub: isClubRoute(route)
        });
    });
    
    return routesInfo;
};

/**
 * Fonction de débogage pour afficher toutes les routes
 */
export const debugRoutes = () => {
    console.group('🗺️ Configuration des Routes');
    
    console.log('📍 Routes publiques:', PUBLIC_ROUTES);
    console.log('🔐 Routes admin:', ADMIN_ROUTES);
    console.log('🏢 Routes club:', CLUB_ROUTES);
    
    console.group('📋 Toutes les routes:');
    getAllRoutesInfo().forEach(info => {
        console.log(`${info.key}: ${info.route} (${info.type})`);
    });
    console.groupEnd();
    
    console.groupEnd();
};

export default {
    validateRoute,
    isPublicRoute,
    isAdminRoute,
    isClubRoute,
    getRouteType,
    validateUserPermissions,
    getDefaultRouteForUser,
    requiresFirstLogin,
    getAllRoutesInfo,
    debugRoutes
};