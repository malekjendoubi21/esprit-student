import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/api';
import adminManagementService from '../services/adminManagementService';

// État initial
const initialState = {
    user: null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: false,
    loading: true,
    error: null,
    setupRequired: false,
};

// Actions
const AuthActions = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    SET_USER: 'SET_USER',
    SET_LOADING: 'SET_LOADING',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_SETUP_REQUIRED: 'SET_SETUP_REQUIRED',
};

// Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case AuthActions.LOGIN_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case AuthActions.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        case AuthActions.LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload,
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null,
            };
        case AuthActions.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case AuthActions.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Contexte
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Vérifier le token au chargement
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('auth_token');
            
            if (token) {
                try {
                    const response = await authService.verifyToken();
                    
                    if (response.success) {
                        dispatch({
                            type: AuthActions.SET_USER,
                            payload: response.user,
                        });
                    } else {
                        // Token invalide
                        localStorage.removeItem('auth_token');
                        dispatch({ type: AuthActions.LOGOUT });
                    }
                } catch (error) {
                    localStorage.removeItem('auth_token');
                    dispatch({ type: AuthActions.LOGOUT });
                }
            } else {
                dispatch({ type: AuthActions.SET_LOADING, payload: false });
            }
        };

        checkAuth();
    }, []);

    // Actions
    const login = async (email, password) => {
        try {
            dispatch({ type: AuthActions.LOGIN_START });
            
            const response = await authService.login(email, password);
            
            if (response.success) {
                dispatch({
                    type: AuthActions.LOGIN_SUCCESS,
                    payload: {
                        user: response.user,
                        token: response.token,
                    },
                });
                return response;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch({
                type: AuthActions.LOGIN_FAILURE,
                payload: error.message,
            });
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        } finally {
            localStorage.removeItem('auth_token');
            dispatch({ type: AuthActions.LOGOUT });
        }
    };

    const clearError = () => {
        dispatch({ type: AuthActions.CLEAR_ERROR });
    };

    const updateUser = (userData) => {
        dispatch({
            type: AuthActions.SET_USER,
            payload: { ...state.user, ...userData },
        });
    };

    // Vérifier les permissions
    const hasPermission = (permission) => {
        if (!state.user) return false;
        
        // Admin a toutes les permissions
        if (state.user.role === 'admin') {
            return true;
        }
        
        // Pour les utilisateurs de type 'club'
        if (state.user.userType === 'club') {
            // Un club a les permissions 'club' et 'club_manager'
            if (permission === 'club' || permission === 'club_manager') {
                return true;
            }
        }
        
        // Pour les utilisateurs normaux avec des permissions explicites
        if (state.user.userType === 'user' && state.user.permissions) {
            const hasExplicitPermission = state.user.permissions.includes(permission);
            return hasExplicitPermission;
        }
        
        return false;
    };

    // Vérifier le rôle
    const hasRole = (roles) => {
        if (!state.user) return false;
        const userRoles = Array.isArray(roles) ? roles : [roles];
        return userRoles.includes(state.user.role);
    };

    // Vérifier le type d'utilisateur
    const isUserType = (types) => {
        if (!state.user) return false;
        const userTypes = Array.isArray(types) ? types : [types];
        return userTypes.includes(state.user.userType);
    };

    const value = {
        ...state,
        login,
        logout,
        clearError,
        updateUser,
        hasPermission,
        hasRole,
        isUserType,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};

export default AuthContext;