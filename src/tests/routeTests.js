/**
 * Tests unitaires pour valider la configuration des routes
 * Exécuter avec: node src/tests/routeTests.js
 */

import { 
    validateRoute, 
    getRouteType, 
    validateUserPermissions,
    getDefaultRouteForUser,
    getAllRoutesInfo,
    debugRoutes
} from '../utils/routeValidator.js';

import { ROUTES } from '../config/routes.js';

/**
 * Fonction de test simple
 */
const test = (description, testFn) => {
    try {
        const result = testFn();
        if (result) {
            console.log(`✅ ${description}`);
        } else {
            console.log(`❌ ${description}`);
        }
        return result;
    } catch (error) {
        console.log(`🔥 ${description} - Erreur: ${error.message}`);
        return false;
    }
};

/**
 * Suite de tests pour les routes
 */
const runRouteTests = () => {
    console.log('🧪 Début des tests de routes\n');

    // Test 1: Validation des routes principales
    test('Routes principales existent', () => {
        return ROUTES.HOME && 
               ROUTES.LOGIN && 
               ROUTES.ADMIN_DASHBOARD && 
               ROUTES.CLUB_DASHBOARD;
    });

    // Test 2: Types de routes
    test('Route HOME est publique', () => {
        return getRouteType(ROUTES.HOME) === 'public';
    });

    test('Route ADMIN_DASHBOARD est admin', () => {
        return getRouteType(ROUTES.ADMIN_DASHBOARD) === 'admin';
    });

    test('Route CLUB_DASHBOARD est club', () => {
        return getRouteType(ROUTES.CLUB_DASHBOARD) === 'club';
    });

    // Test 3: Permissions utilisateur
    test('Admin peut accéder aux routes admin', () => {
        return validateUserPermissions(ROUTES.ADMIN_DASHBOARD, 'admin');
    });

    test('Club ne peut pas accéder aux routes admin', () => {
        return !validateUserPermissions(ROUTES.ADMIN_DASHBOARD, 'club');
    });

    test('Club peut accéder aux routes club', () => {
        return validateUserPermissions(ROUTES.CLUB_DASHBOARD, 'club');
    });

    test('Club manager peut accéder aux routes club', () => {
        return validateUserPermissions(ROUTES.CLUB_DASHBOARD, 'club_manager');
    });

    // Test 4: Redirections par défaut
    test('Admin redirigé vers dashboard admin', () => {
        return getDefaultRouteForUser('admin') === ROUTES.ADMIN_DASHBOARD;
    });

    test('Club redirigé vers première connexion si nouveau', () => {
        return getDefaultRouteForUser('club', true) === ROUTES.CLUB_FIRST_LOGIN;
    });

    test('Club manager redirigé vers dashboard club', () => {
        return getDefaultRouteForUser('club_manager') === ROUTES.CLUB_DASHBOARD;
    });

    // Test 5: Structure des routes
    test('Toutes les routes sont documentées', () => {
        const routesInfo = getAllRoutesInfo();
        return routesInfo.length > 0 && routesInfo.every(r => r.route && r.type);
    });

    console.log('\n🎯 Tests terminés\n');

    // Affichage de debug
    debugRoutes();
};

/**
 * Exécuter les tests si ce fichier est appelé directement
 */
if (import.meta.url === `file://${process.argv[1]}`) {
    runRouteTests();
}

export { runRouteTests };
export default runRouteTests;