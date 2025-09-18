import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, buildRoute } from '../config/routes';

export const useAppNavigation = () => {
    const navigate = useNavigate();
    const { user, hasPermission } = useAuth();

    const goToLogin = () => {
        navigate(ROUTES.BACKOFFICE_LOGIN);
    };

    const goToDashboard = () => {
        if (hasPermission('admin')) {
            navigate(ROUTES.ADMIN_DASHBOARD);
        } else if (hasPermission('club') || hasPermission('club_manager')) {
            navigate(ROUTES.CLUB_DASHBOARD);
        } else {
            navigate(ROUTES.HOME);
        }
    };

    const goToHome = () => {
        navigate(ROUTES.HOME);
    };

    const goToClubEvents = () => {
        navigate(ROUTES.CLUB_EVENTS);
    };

    const goToClubProfile = () => {
        navigate(ROUTES.CLUB_PROFILE);
    };

    const goToCreateEvent = () => {
        navigate(ROUTES.CLUB_EVENTS_NEW);
    };

    const goToEditEvent = (eventId) => {
        const route = buildRoute(ROUTES.CLUB_EVENTS_EDIT, { id: eventId });
        navigate(route);
    };

    const goToUsers = () => {
        navigate(ROUTES.ADMIN_USERS);
    };

    const goToClubs = () => {
        navigate(ROUTES.ADMIN_CLUBS);
    };

    const goToEvents = () => {
        navigate(ROUTES.ADMIN_EVENTS);
    };

    const redirectAfterLogin = (userType, isFirstLogin = false) => {
        if (userType === 'admin') {
            navigate(ROUTES.ADMIN_DASHBOARD);
        } else if (userType === 'club') {
            if (isFirstLogin) {
                navigate(ROUTES.CLUB_FIRST_LOGIN);
            } else {
                navigate(ROUTES.CLUB_DASHBOARD);
            }
        } else if (userType === 'club_manager') {
            navigate(ROUTES.CLUB_DASHBOARD);
        } else {
            navigate(ROUTES.HOME);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(1);
    };

    const isCurrentRoute = (route) => {
        return window.location.pathname === route;
    };

    return {
        // Navigation methods
        goToLogin,
        goToDashboard,
        goToHome,
        goToClubEvents,
        goToClubProfile,
        goToCreateEvent,
        goToEditEvent,
        goToUsers,
        goToClubs,
        goToEvents,
        redirectAfterLogin,
        goBack,
        goForward,
        
        // Utility methods
        isCurrentRoute,
        navigate, // Pour les cas spéciaux
        
        // Route constants
        ROUTES,
        buildRoute,
    };
};

export default useAppNavigation;