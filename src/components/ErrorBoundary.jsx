import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { ROUTES } from "../config/routes";

const ErrorBoundary = () => {
  const error = useRouteError();

  console.error("Route Error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-10 text-center">
        {/* Illustration */}
        <div className="mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto h-28 w-28 text-red-500 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M4.082 16.5l6.918-12.5c.768-.833 1.962-.833 2.732 0l6.918 12.5c.77.833-.192 2.5-1.732 2.5H5.814c-1.54 0-2.502-1.667-1.732-2.5z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Oups ! Une erreur est survenue
        </h1>
        <p className="text-gray-600 mb-8">
          Pas d’inquiétude, vous pouvez revenir en arrière ou retourner à
          l’accueil.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Link
            to={ROUTES.HOME}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition"
          >
            Retour à l’accueil
          </Link>
          <Link
            to={ROUTES.BACKOFFICE_LOGIN}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition"
          >
            BackOffice →
          </Link>
        </div>

    
      </div>
    </div>
  );
};

export default ErrorBoundary;
