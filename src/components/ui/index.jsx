import React from 'react';

// Composant Input réutilisable
export const Input = ({ 
    id, 
    name, 
    type = 'text', 
    value, 
    onChange, 
    placeholder, 
    error, 
    label,
    required = false,
    disabled = false,
    className = '',
    ...props 
}) => {
    const baseClasses = `
        mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
        placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500
        ${error ? 'border-red-300' : ''}
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        ${className}
    `.trim();

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={baseClasses}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

// Composant de carte pour les statistiques
export const StatCard = ({ title, value, icon, color = 'blue', trend = null }) => {
    const colorClasses = {
        blue: 'bg-blue-500 text-white',
        green: 'bg-green-500 text-white',
        yellow: 'bg-yellow-500 text-white',
        red: 'bg-red-500 text-white',
        purple: 'bg-purple-500 text-white',
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {trend && (
                        <p className={`text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.positive ? '↗' : '↘'} {trend.value}
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${colorClasses[color]} flex items-center justify-center`}>
                    <span className="text-2xl font-bold">
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Composant de chargement
export const Loading = ({ size = 'md', text = 'Chargement...' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 ${sizeClasses[size]}`}></div>
            <p className="mt-2 text-gray-600">{text}</p>
        </div>
    );
};

// Composant d'alerte
export const Alert = ({ type = 'info', title, message, onClose }) => {
    const typeClasses = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };

    const iconClasses = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    return (
        <div className={`border rounded-md p-4 ${typeClasses[type]}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <span className="text-lg">{iconClasses[type]}</span>
                </div>
                <div className="ml-3 flex-1">
                    {title && <h3 className="text-sm font-medium">{title}</h3>}
                    <div className="text-sm">{message}</div>
                </div>
                {onClose && (
                    <div className="ml-auto pl-3">
                        <button
                            onClick={onClose}
                            className="inline-flex text-gray-400 hover:text-gray-600"
                        >
                            <span className="sr-only">Fermer</span>
                            ✕
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Composant de badge de statut
export const StatusBadge = ({ status }) => {
    const statusConfig = {
        actif: { bg: 'bg-green-100', text: 'text-green-800', label: 'Actif' },
        inactif: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inactif' },
        en_attente: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En attente' },
        suspendu: { bg: 'bg-red-100', text: 'text-red-800', label: 'Suspendu' },
        valide: { bg: 'bg-green-100', text: 'text-green-800', label: 'Validé' },
        rejete: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejeté' },
        annule: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Annulé' },
        termine: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Terminé' },
    };

    const config = statusConfig[status] || statusConfig.inactif;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
};

// Composant de bouton
export const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    ...props 
}) => {
    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
        success: 'bg-green-600 hover:bg-green-700 text-white',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
        outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
            )}
            {children}
        </button>
    );
};

// Composant de modal
export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'md' }) => {
    if (!isOpen) return null;

    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Overlay */}
                <div 
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full ${maxWidthClasses[maxWidth]}`}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                {title && (
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                        {title}
                                    </h3>
                                )}
                                <div>{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant de pagination
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="outline"
                >
                    Précédent
                </Button>
                <Button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="outline"
                >
                    Suivant
                </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Page <span className="font-medium">{currentPage}</span> sur{' '}
                        <span className="font-medium">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                            ←
                        </button>
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                    page === currentPage
                                        ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                        : 'text-gray-900'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                            →
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

// Composant de recherche
export const SearchInput = ({ value, onChange, placeholder = 'Rechercher...', className = '' }) => {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};