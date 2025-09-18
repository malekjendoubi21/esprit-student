import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BREADCRUMBS } from '../config/routes';

const Breadcrumb = ({ customBreadcrumbs = null }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Utiliser les breadcrumbs personnalisés ou ceux de la configuration
    const breadcrumbs = customBreadcrumbs || BREADCRUMBS[currentPath] || [];

    if (breadcrumbs.length === 0) {
        return null;
    }

    return (
        <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            <svg
                                className="w-6 h-6 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                        {index === breadcrumbs.length - 1 ? (
                            // Dernier élément - pas de lien
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                                {crumb.label}
                            </span>
                        ) : (
                            // Éléments intermédiaires - avec lien
                            <Link
                                to={crumb.path}
                                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                            >
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;