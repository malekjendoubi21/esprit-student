# Configuration des Routes - Documentation

## 📋 Vue d'ensemble

Ce système de routage utilise React Router v6 avec une architecture basée sur les permissions pour gérer l'accès aux différentes sections de l'application.

## 🗂️ Structure des fichiers

```
src/
├── router/
│   └── index.js              # Configuration principale des routes
├── config/
│   └── routes.js            # Constantes et configuration des routes
├── hooks/
│   └── useAppNavigation.js  # Hook de navigation personnalisé
├── components/
│   ├── ProtectedRoute.jsx   # Composant de protection des routes
│   ├── ErrorBoundary.jsx    # Gestion d'erreurs
│   ├── Breadcrumb.jsx       # Navigation breadcrumb
│   └── layouts/
│       └── BackOfficeLayout.jsx  # Layout pour le BackOffice
├── utils/
│   ├── routeValidator.js    # Utilitaires de validation
│   └── routeDebug.js        # Outils de débogage
└── tests/
    └── routeTests.js        # Tests unitaires
```

## 🛣️ Types de routes

### Routes publiques
- `/` - Page d'accueil
- `/home` - Accueil (alias)
- `/clubs` - Liste des clubs
- `/comite` - Comité des étudiants
- `/cellule-ecoute` - Cellule d'écoute
- `/sport` - Salle de sport
- `/centre-carriere` - Centre de carrière
- `/restaurant` - Restaurant et foyer
- `/association-sportive` - Association sportive
- `/international` - Service des internationaux
- `/backoffice/login` - Connexion BackOffice

### Routes Admin (🔐 Protégées)
- `/backoffice/dashboard` - Dashboard administrateur
- `/backoffice/users` - Gestion des utilisateurs
- `/backoffice/clubs` - Gestion des clubs
- `/backoffice/events` - Gestion des événements

### Routes Club (🏢 Protégées)
- `/backoffice/club/dashboard` - Dashboard club
- `/backoffice/club/first-login` - Première connexion
- `/backoffice/club/events` - Gestion des événements club
- `/backoffice/club/events/new` - Créer un événement
- `/backoffice/club/events/:id/edit` - Modifier un événement
- `/backoffice/club/profile` - Profil du club

## 🔐 Système de permissions

### Types d'utilisateurs
- `admin` - Administrateur avec accès complet
- `club_manager` - Responsable de club
- `club` - Membre de club

### Validation des permissions
```javascript
// Exemple d'utilisation
const hasAccess = validateUserPermissions('/backoffice/dashboard', 'admin');
```

## 🧭 Navigation

### Hook personnalisé
```javascript
import { useAppNavigation } from '../hooks/useAppNavigation';

const { goToDashboard, redirectAfterLogin, buildRoute } = useAppNavigation();

// Navigation automatique vers le bon dashboard
goToDashboard();

// Redirection après connexion
redirectAfterLogin(user);
```

### Navigation programmatique
```javascript
// Construction d'URL
const eventEditUrl = buildRoute(ROUTES.CLUB_EVENT_EDIT, { id: '123' });
// Résultat: "/backoffice/club/events/123/edit"
```

## 🔒 Protection des routes

### Composant ProtectedRoute
```jsx
<ProtectedRoute requiredPermissions={['admin']}>
    <AdminDashboard />
</ProtectedRoute>
```

### Gestion de la première connexion
```javascript
// Redirection automatique pour les nouveaux utilisateurs club
if (user.userType === 'club' && user.isFirstLogin) {
    // Redirige vers /backoffice/club/first-login
}
```

## 🍞 Breadcrumb

Le système de breadcrumb est automatique et configurable :

```javascript
// Configuration dans routes.js
BREADCRUMBS: {
    '/backoffice/dashboard': [
        { label: 'Accueil', path: '/' },
        { label: 'BackOffice', path: '/backoffice' },
        { label: 'Dashboard', path: '/backoffice/dashboard' }
    ]
}
```

## 🚨 Gestion d'erreurs

### ErrorBoundary
- Capture les erreurs de routage
- Affiche des messages d'erreur conviviaux
- Mode développement avec détails techniques

### Page 404
- Route wildcard pour les URLs non trouvées
- Liens de retour vers l'accueil et le BackOffice

## 🧪 Tests et débogage

### Tests unitaires
```bash
# Exécuter les tests de routes
node src/tests/routeTests.js
```

### Outils de débogage (console navigateur)
```javascript
// Charger les outils de débogage
import '../utils/routeDebug.js';

// Commandes disponibles
routeHelp()              // Affiche l'aide
testRoutes()             // Teste toutes les routes
debugAuth()              // Infos d'authentification
simulateAuth('admin')    // Simule une connexion admin
clearAuth()              // Efface l'authentification
```

## 📦 Configuration

### Variables d'environnement
```env
# Base URL pour l'API (optionnel)
VITE_API_BASE_URL=http://localhost:5000/api
```

### Routes dynamiques
```javascript
// Support des paramètres dans les routes
'/backoffice/club/events/:id/edit'

// Accès aux paramètres
const { id } = useParams();
```

## 🔄 Workflow d'authentification

1. **Connexion** → `/backoffice/login`
2. **Validation** → Vérification des credentials
3. **Redirection** → Basée sur le type d'utilisateur :
   - Admin → `/backoffice/dashboard`
   - Club (première fois) → `/backoffice/club/first-login`
   - Club → `/backoffice/club/dashboard`
   - Club Manager → `/backoffice/club/dashboard`

## 🛠️ Maintenance

### Ajouter une nouvelle route

1. **Définir la constante** dans `config/routes.js`
```javascript
export const ROUTES = {
    // ... autres routes
    NEW_FEATURE: '/backoffice/new-feature'
};
```

2. **Ajouter à la configuration** appropriée
```javascript
export const ADMIN_ROUTES = [
    // ... autres routes
    ROUTES.NEW_FEATURE
];
```

3. **Créer le composant** de page
4. **Ajouter la route** dans `router/index.js`
```javascript
{
    path: 'new-feature',
    element: (
        <ProtectedRoute requiredPermissions={['admin']}>
            <NewFeature />
        </ProtectedRoute>
    ),
}
```

5. **Ajouter les breadcrumbs** si nécessaire
6. **Tester** avec les outils de débogage

### Performance

- Lazy loading des composants (à implémenter)
- Code splitting par permission
- Préchargement des routes critiques

## 📚 Ressources

- [React Router v6 Documentation](https://reactrouter.com/en/main)
- [Guide des permissions](../contexts/AuthContext.jsx)
- [API Backend](../../BackOffice/README.md)

---

**Version:** 1.0.0  
**Dernière mise à jour:** $(date)  
**Auteur:** Équipe Développement