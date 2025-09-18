// Configuration API
const API_BASE_URL = 'https://esprit-student-backend.onrender.com/api';

// Utilitaire pour les requêtes HTTP
class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('auth_token');
    }

    // Méthode pour définir le token
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('auth_token', token);
        } else {
            localStorage.removeItem('auth_token');
        }
    }

    // Headers par défaut
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    // Méthode générique pour les requêtes
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getHeaders(),
            ...options,
        };

        try {
            console.log(`[ApiService] Request to: ${url}`, config);
            const response = await fetch(url, config);
            
            console.log(`[ApiService] Response status from ${endpoint}:`, response.status);
            
            // Try to parse JSON, but handle potential errors
            let data;
            try {
                data = await response.json();
            } catch (parseError) {
                console.error(`[ApiService] JSON parse error for ${endpoint}:`, parseError);
                throw new Error(`Erreur de format de réponse: ${parseError.message}`);
            }

            console.log(`[ApiService] Response data from ${endpoint}:`, data);

            if (!response.ok) {
                throw new Error(data.message || `Erreur HTTP: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`[ApiService] Request error for ${endpoint}:`, error);
            throw error;
        }
    }

    // Méthodes HTTP
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url, { method: 'GET' });
    }

    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Instance unique du service
const apiService = new ApiService();

// Services spécialisés

// Service d'authentification
export const authService = {
    // Connexion
    async login(email, password) {
        const response = await apiService.post('/auth/login', { email, password });
        if (response.success && response.token) {
            apiService.setToken(response.token);
        }
        return response;
    },

    // Déconnexion
    async logout() {
        const response = await apiService.post('/auth/logout');
        apiService.setToken(null);
        return response;
    },

    // Vérifier le token
    async verifyToken() {
        return apiService.get('/auth/verify');
    },

    // Mot de passe oublié
    async forgotPassword(email) {
        return apiService.post('/auth/forgot-password', { email });
    },

    // Changer le mot de passe
    async changePassword(currentPassword, newPassword) {
        return apiService.post('/auth/change-password', {
            currentPassword,
            newPassword,
        });
    },
};

// Service des utilisateurs
export const userService = {
    // Obtenir tous les utilisateurs
    async getUsers(params = {}) {
        return apiService.get('/users', params);
    },

    // Obtenir un utilisateur par ID
    async getUserById(id) {
        return apiService.get(`/users/${id}`);
    },

    // Créer un utilisateur
    async createUser(userData) {
        return apiService.post('/users', userData);
    },

    // Mettre à jour un utilisateur
    async updateUser(id, userData) {
        return apiService.put(`/users/${id}`, userData);
    },

    // Supprimer un utilisateur
    async deleteUser(id) {
        return apiService.delete(`/users/${id}`);
    },

    // Réinitialiser le mot de passe
    async resetPassword(id) {
        return apiService.post(`/users/${id}/reset-password`);
    },

    // Obtenir les statistiques
    async getStats() {
        return apiService.get('/users/stats');
    },
};

// Service des clubs
export const clubService = {
    // Obtenir tous les clubs publiquement
    async getClubs(params = {}) {
        return apiService.get('/clubs/public', params);
    },

    // Obtenir un club par ID publiquement
    async getClubById(id) {
        console.log(`[clubService] Fetching club with ID: ${id}`);
        try {
            const response = await apiService.get(`/clubs/${id}/public`);
            console.log(`[clubService] Club data received:`, response);
            return response;
        } catch (error) {
            console.error(`[clubService] Error fetching club ${id}:`, error);
            throw error;
        }
    },
    
    // Pour le debugging - vérifier le statut d'un club
    async checkClubStatus(id) {
        console.log(`[clubService] Checking status for club ID: ${id}`);
        try {
            const response = await apiService.get(`/clubs/${id}/status`);
            console.log(`[clubService] Club status:`, response);
            return response;
        } catch (error) {
            console.error(`[clubService] Error checking club status ${id}:`, error);
            throw error;
        }
    },

    // Créer un club
    async createClub(clubData) {
        return apiService.post('/clubs', clubData);
    },

    // Obtenir mon profil (pour les clubs connectés)
    async getMyProfile() {
        return apiService.get('/clubs/my/profile');
    },

    // Alias pour getMyProfile (compatibilité)
    async getClubProfile() {
        return this.getMyProfile();
    },

    // Mettre à jour mon profil
    async updateMyProfile(profileData) {
        return apiService.put('/clubs/my/profile', profileData);
    },

    // Mettre à jour un club (admin)
    async updateClub(id, clubData) {
        return apiService.put(`/clubs/${id}/profile`, clubData);
    },
    
    // Mettre à jour le statut d'un club (admin)
    async updateClubStatus(id, statusData) {
        return apiService.put(`/clubs/${id}/status`, statusData);
    },

    // Supprimer un club
    async deleteClub(id) {
        return apiService.delete(`/clubs/${id}`);
    },

    // Assigner un responsable
    async assignResponsable(clubId, responsableId) {
        return apiService.put(`/clubs/${clubId}/assign-responsable`, {
            responsableId,
        });
    },

    // Changer le mot de passe (club)
    async changePassword(currentPassword, newPassword) {
        return apiService.post('/clubs/my/change-password', {
            currentPassword,
            newPassword,
        });
    },

    // Obtenir les statistiques
    async getStats() {
        return apiService.get('/clubs/stats');
    },

    // Obtenir les statistiques pour le club connecté
    async getClubStats() {
        return apiService.get('/clubs/my/stats');
    },
};

// Service des événements
export const eventService = {
    // Obtenir tous les événements publiquement (route publique)
    async getEvents(params = {}) {
        return apiService.get('/events/public', params);
    },
    
    // Obtenir tous les événements (admin)
    async getAllEvents(params = {}) {
        return apiService.get('/events', params);
    },

    // Obtenir mes événements (club)
    async getMyEvents(params = {}) {
        return apiService.get('/events/my/events', params);
    },

    // Obtenir les événements d'un club spécifique (pour la page de détail)
    async getClubEvents(clubId, params = {}) {
        if (clubId) {
            return apiService.get(`/events/club/${clubId}`, params);
        } else {
            // Fallback pour les événements du club connecté
            return this.getMyEvents(params);
        }
    },

    // Obtenir un événement par ID
    async getEventById(id) {
        return apiService.get(`/events/${id}`);
    },

    // Créer un événement
    async createEvent(eventData) {
        return apiService.post('/events', eventData);
    },

    // Mettre à jour un événement
    async updateEvent(id, eventData) {
        return apiService.put(`/events/${id}`, eventData);
    },

    // Supprimer un événement
    async deleteEvent(id) {
        return apiService.delete(`/events/${id}`);
    },

    // Valider un événement (admin)
    async validateEvent(id, statut, raisonRejet = '') {
        return apiService.put(`/events/${id}/validate`, {
            statut,
            raisonRejet,
        });
    },

    // Obtenir les statistiques
    async getStats() {
        return apiService.get('/events/stats');
    },
};

// Service admin
export const adminService = {
    // Obtenir les statistiques du dashboard
    async getDashboardStats() {
        return apiService.get('/admin/dashboard/stats');
    },

    // Obtenir les logs récents
    async getRecentLogs() {
        return apiService.get('/admin/logs/recent');
    },

    // Obtenir tous les logs avec pagination et filtres
    async getLogs(params = {}) {
        const queryParams = new URLSearchParams();
        
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.action) queryParams.append('action', params.action);
        if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
        if (params.dateTo) queryParams.append('dateTo', params.dateTo);
        if (params.userId) queryParams.append('userId', params.userId);
        
        const queryString = queryParams.toString();
        const url = queryString ? `/admin/logs?${queryString}` : '/admin/logs';
        
        return apiService.get(url);
    },

    // Obtenir les statistiques des logs
    async getLogsStats() {
        return apiService.get('/admin/logs/stats');
    },

    // Créer des logs de test
    async createTestLogs() {
        return apiService.post('/admin/logs/test');
    },

    // Supprimer les logs de test
    async deleteTestLogs() {
        return apiService.delete('/admin/logs/test');
    },

    // Nettoyer les logs orphelins
    async cleanOrphanLogs() {
        return apiService.delete('/admin/logs/orphans');
    },

    // Créer un club
    async createClub(clubData) {
        return apiService.post('/clubs', clubData);
    },

    // Changer le statut d'un club
    async updateClubStatus(clubId, statut, raisonRejet = '') {
        return apiService.put(`/admin/clubs/${clubId}/status`, {
            statut,
            raisonRejet,
        });
    },

    // Changer le statut d'un événement
    async updateEventStatus(eventId, statut, raisonRejet = '') {
        return apiService.put(`/admin/events/${eventId}/status`, {
            statut,
            raisonRejet,
        });
    },
};

// Service première connexion
export const firstLoginService = {
    // Vérifier si c'est la première connexion
    async checkFirstLogin() {
        return apiService.get('/first-login/check');
    },

    // Obtenir le guide
    async getGuide() {
        return apiService.get('/first-login/guide');
    },

    // Compléter le profil
    async completeProfile(profileData) {
        return apiService.post('/first-login/complete', profileData);
    },

    // Sauvegarder un brouillon
    async saveDraft(profileData) {
        return apiService.post('/first-login/save-draft', profileData);
    },
};

// Service de réinitialisation de mot de passe
export const passwordResetService = {
    // Demander une réinitialisation
    async requestReset(email, userType) {
        return apiService.post('/password-reset/request-reset', { email, userType });
    },

    // Vérifier un token de réinitialisation
    async verifyResetToken(token, userType) {
        return apiService.get('/password-reset/verify-token', { token, userType });
    },

    // Réinitialiser le mot de passe
    async resetPassword(token, userType, newPassword, confirmPassword) {
        return apiService.post('/password-reset/reset', { 
            token, 
            userType, 
            newPassword, 
            confirmPassword 
        });
    },
};

// Export par défaut du service principal
export default apiService;