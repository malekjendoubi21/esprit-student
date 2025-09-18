import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Components
import ErrorBoundary from '../components/ErrorBoundary';

// Layouts
import BackOfficeLayout from '../components/layouts/BackOfficeLayout';

// Protection des routes
import ProtectedRoute from '../components/ProtectedRoute';

// Pages BackOffice
import {
    Login,
    InitialSetup,
    AdminDashboard,
    UserManagement,
    ClubManagement,
    EventManagement,
    ClubFirstLogin,
    ClubDashboard
} from '../pages/BackOfiice';

// Import de la page Logs
import Logs from '../pages/BackOfiice/Logs';

// Pages d'authentification
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// Pages Frontend publiques existantes
import Home from '../pages/home';
import Comite from '../pages/Comité des Étudiants';
import CelluleEcoute from '../pages/Cellule d\'Écoute';
import Clubs from '../pages/clubs';
import ClubDetail from '../pages/club-detail';
import Events from '../pages/events';
import Sport from '../pages/Salle de Sport + Piscine';
import CentreCarriere from '../pages/Centre de Carrière';
import Restaurant from '../pages/Restaurant + Foyer';
import AssociationSportive from '../pages/Association Sportive';
import International from '../pages/Service des Internationaux';

const router = createBrowserRouter([
    // Routes publiques existantes
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/home',
        element: <Home />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/comite',
        element: <Comite />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/cellule-ecoute',
        element: <CelluleEcoute />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/clubs',
        element: <Clubs />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/club/:id',
        element: <ClubDetail />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/events',
        element: <Events />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/sport',
        element: <Sport />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/centre-carriere',
        element: <CentreCarriere />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/restaurant',
        element: <Restaurant />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/association-sportive',
        element: <AssociationSportive />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/international',
        element: <International />,
        errorElement: <ErrorBoundary />,
    },
    
    // Route de connexion BackOffice (publique)
    {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/backoffice/login',
        element: <Login />,
        errorElement: <ErrorBoundary />,
    },

    // Routes d'authentification (publiques)
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/reset-password',
        element: <ResetPassword />,
        errorElement: <ErrorBoundary />,
    },

    // Route de configuration initiale (publique)
    {
        path: '/backoffice/setup',
        element: <InitialSetup />,
        errorElement: <ErrorBoundary />,
    },

    // Route de première connexion club (publique)
    {
        path: '/backoffice/club/first-login',
        element: <ClubFirstLogin />,
        errorElement: <ErrorBoundary />,
    },

    // Routes BackOffice protégées
    {
        path: '/backoffice',
        element: (
            <ProtectedRoute>
                <BackOfficeLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
            // Redirection par défaut basée sur le type d'utilisateur
            {
                index: true,
                element: <Navigate to="dashboard" replace />,
            },

            // Routes Admin
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute requiredPermissions={['admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'users',
                element: (
                    <ProtectedRoute requiredPermissions={['admin']}>
                        <UserManagement />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'clubs',
                element: (
                    <ProtectedRoute requiredPermissions={['admin']}>
                        <ClubManagement />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'events',
                element: (
                    <ProtectedRoute requiredPermissions={['admin']}>
                        <EventManagement />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'logs',
                element: (
                    <ProtectedRoute requiredPermissions={['admin']}>
                        <Logs />
                    </ProtectedRoute>
                ),
            },

            // Routes Club
            {
                path: 'club',
                children: [
                    // Dashboard Club
                    {
                        path: 'dashboard',
                        element: (
                            <ProtectedRoute requiredPermissions={['club', 'club_manager']}>
                                <ClubDashboard />
                            </ProtectedRoute>
                        ),
                    },
                    // Gestion des événements club
                    {
                        path: 'events',
                        element: (
                            <ProtectedRoute requiredPermissions={['club', 'club_manager']}>
                                <div className="p-6 bg-white rounded-lg shadow">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestion des événements</h2>
                                    <p className="text-gray-600">Page en cours de développement...</p>
                                </div>
                            </ProtectedRoute>
                        ),
                    },
                    // Création d'événement
                    {
                        path: 'events/new',
                        element: (
                            <ProtectedRoute requiredPermissions={['club', 'club_manager']}>
                                <div className="p-6 bg-white rounded-lg shadow">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Créer un événement</h2>
                                    <p className="text-gray-600">Formulaire de création en cours de développement...</p>
                                </div>
                            </ProtectedRoute>
                        ),
                    },
                    // Modification d'événement
                    {
                        path: 'events/:id/edit',
                        element: (
                            <ProtectedRoute requiredPermissions={['club', 'club_manager']}>
                                <div className="p-6 bg-white rounded-lg shadow">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifier l'événement</h2>
                                    <p className="text-gray-600">Formulaire de modification en cours de développement...</p>
                                </div>
                            </ProtectedRoute>
                        ),
                    },
                    // Profil du club
                    {
                        path: 'profile',
                        element: (
                            <ProtectedRoute requiredPermissions={['club', 'club_manager']}>
                                <div className="p-6 bg-white rounded-lg shadow">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Profil du club</h2>
                                    <p className="text-gray-600">Page de profil en cours de développement...</p>
                                </div>
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
        ],
    },
// Route 404
{
  path: "*",
  element: (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <div className="text-center max-w-md">
        {/* Code erreur */}
        <h1 className="text-9xl font-extrabold text-red-600 drop-shadow-lg">
          404
        </h1>

        {/* Titre */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
          Oups ! Page non trouvée
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-3 mb-8">
          La page que vous recherchez n’existe pas ou a été déplacée.
        </p>

        {/* Boutons */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="/"
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-red-500 transition"
          >
            Retour à l’accueil
          </a>
          <a
            href="/backoffice/login"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 bg-white shadow hover:bg-gray-50 transition"
          >
            BackOffice →
          </a>
        </div>
      </div>
    </div>
  ),
}


]);

export default router;