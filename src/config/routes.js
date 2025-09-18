// Configuration centralisée des routes de l'application

export const ROUTES = {
    // Routes publiques
    HOME: '/',
    CLUBS_PUBLIC: '/clubs',
    COMITE: '/comite',
    CELLULE_ECOUTE: '/cellule-ecoute',
    SPORT: '/sport',
    CENTRE_CARRIERE: '/centre-carriere',
    RESTAURANT: '/restaurant',
    ASSOCIATION_SPORTIVE: '/association-sportive',
    INTERNATIONAL: '/international',

    // Routes d'authentification
    BACKOFFICE_LOGIN: '/backoffice/login',

    // Routes Admin BackOffice
    BACKOFFICE_ROOT: '/backoffice',
    ADMIN_DASHBOARD: '/backoffice/dashboard',
    ADMIN_USERS: '/backoffice/users',
    ADMIN_CLUBS: '/backoffice/clubs',
    ADMIN_EVENTS: '/backoffice/events',

    // Routes Club BackOffice
    CLUB_DASHBOARD: '/backoffice/club/dashboard',
    CLUB_FIRST_LOGIN: '/backoffice/club/first-login',
    CLUB_EVENTS: '/backoffice/club/events',
    CLUB_EVENTS_NEW: '/backoffice/club/events/new',
    CLUB_EVENTS_EDIT: '/backoffice/club/events/:id/edit',
    CLUB_PROFILE: '/backoffice/club/profile',
};

// Helper pour construire des URLs avec des paramètres
export const buildRoute = (route, params = {}) => {
    let builtRoute = route;
    Object.entries(params).forEach(([key, value]) => {
        builtRoute = builtRoute.replace(`:${key}`, value);
    });
    return builtRoute;
};

// Groupes de routes pour les permissions
export const ROUTE_GROUPS = {
    PUBLIC: [
        ROUTES.HOME,
        ROUTES.CLUBS_PUBLIC,
        ROUTES.COMITE,
        ROUTES.CELLULE_ECOUTE,
        ROUTES.SPORT,
        ROUTES.CENTRE_CARRIERE,
        ROUTES.RESTAURANT,
        ROUTES.ASSOCIATION_SPORTIVE,
        ROUTES.INTERNATIONAL,
        ROUTES.BACKOFFICE_LOGIN,
    ],
    ADMIN_ONLY: [
        ROUTES.ADMIN_DASHBOARD,
        ROUTES.ADMIN_USERS,
        ROUTES.ADMIN_CLUBS,
        ROUTES.ADMIN_EVENTS,
    ],
    CLUB_ONLY: [
        ROUTES.CLUB_DASHBOARD,
        ROUTES.CLUB_FIRST_LOGIN,
        ROUTES.CLUB_EVENTS,
        ROUTES.CLUB_EVENTS_NEW,
        ROUTES.CLUB_EVENTS_EDIT,
        ROUTES.CLUB_PROFILE,
    ],
};

// Breadcrumbs configuration
export const BREADCRUMBS = {
    [ROUTES.ADMIN_DASHBOARD]: [
        { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD }
    ],
    [ROUTES.ADMIN_USERS]: [
        { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD },
        { label: 'Utilisateurs', path: ROUTES.ADMIN_USERS }
    ],
    [ROUTES.ADMIN_CLUBS]: [
        { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD },
        { label: 'Clubs', path: ROUTES.ADMIN_CLUBS }
    ],
    [ROUTES.ADMIN_EVENTS]: [
        { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD },
        { label: 'Événements', path: ROUTES.ADMIN_EVENTS }
    ],
    [ROUTES.CLUB_DASHBOARD]: [
        { label: 'Dashboard Club', path: ROUTES.CLUB_DASHBOARD }
    ],
    [ROUTES.CLUB_EVENTS]: [
        { label: 'Dashboard', path: ROUTES.CLUB_DASHBOARD },
        { label: 'Événements', path: ROUTES.CLUB_EVENTS }
    ],
    [ROUTES.CLUB_EVENTS_NEW]: [
        { label: 'Dashboard', path: ROUTES.CLUB_DASHBOARD },
        { label: 'Événements', path: ROUTES.CLUB_EVENTS },
        { label: 'Créer', path: ROUTES.CLUB_EVENTS_NEW }
    ],
    [ROUTES.CLUB_PROFILE]: [
        { label: 'Dashboard', path: ROUTES.CLUB_DASHBOARD },
        { label: 'Profil', path: ROUTES.CLUB_PROFILE }
    ],
};

export default ROUTES;