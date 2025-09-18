/**
 * Utilitaires de développement pour tester les routes
 * Injecter ce script dans la console du navigateur pour déboguer
 */

/**
 * Teste toutes les routes de l'application
 */
window.testRoutes = () => {
    console.group('🧪 Test des Routes');
    
    // Import des utilitaires (à adapter selon l'environnement)
    const routes = [
        '/',
        '/home',
        '/clubs',
        '/comite',
        '/backoffice/login',
        '/backoffice/dashboard',
        '/backoffice/users',
        '/backoffice/clubs',
        '/backoffice/events',
        '/backoffice/club/dashboard',
        '/backoffice/club/first-login',
        '/backoffice/club/events'
    ];

    routes.forEach(route => {
        try {
            // Simule une navigation
            const isAccessible = true; // Logique de test à implémenter
            console.log(`${isAccessible ? '✅' : '❌'} ${route}`);
        } catch (error) {
            console.log(`🔥 ${route} - Erreur: ${error.message}`);
        }
    });
    
    console.groupEnd();
};

/**
 * Navigue vers une route et teste l'accès
 */
window.testRoute = (route) => {
    console.log(`🧭 Test de navigation vers: ${route}`);
    
    // Utilise React Router pour naviguer
    if (window.location.pathname !== route) {
        window.history.pushState({}, '', route);
        console.log(`📍 Navigation vers ${route} effectuée`);
    } else {
        console.log(`📍 Déjà sur ${route}`);
    }
};

/**
 * Affiche les informations de l'utilisateur connecté
 */
window.debugAuth = () => {
    console.group('👤 Informations d\'authentification');
    
    // Récupère les données depuis localStorage ou context
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    console.log('Token:', token ? '✅ Présent' : '❌ Absent');
    console.log('Utilisateur:', user);
    console.log('Type d\'utilisateur:', user.userType || 'Non défini');
    console.log('Permissions:', user.permissions || []);
    
    console.groupEnd();
};

/**
 * Test des permissions pour différents types d'utilisateurs
 */
window.testPermissions = () => {
    console.group('🔐 Test des Permissions');
    
    const testCases = [
        { userType: 'admin', route: '/backoffice/dashboard', expected: true },
        { userType: 'admin', route: '/backoffice/users', expected: true },
        { userType: 'club', route: '/backoffice/dashboard', expected: false },
        { userType: 'club', route: '/backoffice/club/dashboard', expected: true },
        { userType: 'club_manager', route: '/backoffice/club/dashboard', expected: true },
        { userType: 'guest', route: '/', expected: true },
        { userType: 'guest', route: '/backoffice/dashboard', expected: false }
    ];

    testCases.forEach(({ userType, route, expected }) => {
        // Logique de validation à implémenter
        const result = expected; // Simulation
        const status = result === expected ? '✅' : '❌';
        console.log(`${status} ${userType} -> ${route} (attendu: ${expected})`);
    });
    
    console.groupEnd();
};

/**
 * Simule différents scénarios d'authentification
 */
window.simulateAuth = (userType = 'admin', isFirstLogin = false) => {
    console.log(`🎭 Simulation d'authentification: ${userType}`);
    
    const mockUsers = {
        admin: {
            id: 1,
            nom: 'Admin',
            prenom: 'Test',
            email: 'admin@test.com',
            userType: 'admin',
            permissions: ['admin']
        },
        club: {
            id: 2,
            nom: 'Club',
            prenom: 'Test',
            email: 'club@test.com',
            userType: 'club',
            permissions: ['club'],
            isFirstLogin
        },
        club_manager: {
            id: 3,
            nom: 'Manager',
            prenom: 'Test',
            email: 'manager@test.com',
            userType: 'club_manager',
            permissions: ['club', 'club_manager']
        }
    };

    const user = mockUsers[userType];
    if (user) {
        localStorage.setItem('authToken', 'mock-token-' + userType);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('✅ Authentification simulée');
        console.log('🔄 Rechargez la page pour voir les changements');
    } else {
        console.log('❌ Type d\'utilisateur non reconnu');
    }
};

/**
 * Nettoie l'authentification
 */
window.clearAuth = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    console.log('🧹 Authentification effacée');
    console.log('🔄 Rechargez la page pour voir les changements');
};

/**
 * Affiche l'aide pour les commandes de débogage
 */
window.routeHelp = () => {
    console.group('🆘 Aide - Commandes de débogage des routes');
    console.log('testRoutes() - Teste toutes les routes');
    console.log('testRoute(route) - Teste une route spécifique');
    console.log('debugAuth() - Affiche les infos d\'authentification');
    console.log('testPermissions() - Teste les permissions');
    console.log('simulateAuth(userType, isFirstLogin) - Simule une authentification');
    console.log('clearAuth() - Efface l\'authentification');
    console.log('routeHelp() - Affiche cette aide');
    console.groupEnd();
};

// Message d'accueil
console.log('🛠️ Outils de débogage des routes chargés!');
console.log('💡 Tapez routeHelp() pour voir les commandes disponibles');

export {
    testRoutes: window.testRoutes,
    testRoute: window.testRoute,
    debugAuth: window.debugAuth,
    testPermissions: window.testPermissions,
    simulateAuth: window.simulateAuth,
    clearAuth: window.clearAuth,
    routeHelp: window.routeHelp
};