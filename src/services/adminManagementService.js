import api from './api';

/**
 * Service pour la gestion des administrateurs
 */
class AdminManagementService {
    /**
     * Vérifie si l'application est configurée (au moins un admin existe)
     */
    async checkSetup() {
        try {
            const response = await api.get('/admin-management/check-setup');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la vérification du setup:', error);
            throw error;
        }
    }

    /**
     * Configuration initiale - crée le premier admin
     */
    async initialSetup(adminData) {
        try {
            const response = await api.post('/admin-management/initial-setup', adminData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la configuration initiale:', error);
            throw error;
        }
    }

    /**
     * Crée un admin par défaut
     */
    async createDefaultAdmin() {
        try {
            const response = await api.post('/admin-management/create-default');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de l\'admin par défaut:', error);
            throw error;
        }
    }

    /**
     * Crée plusieurs admins
     */
    async createMultipleAdmins() {
        try {
            const response = await api.post('/admin-management/create-multiple');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création des admins multiples:', error);
            throw error;
        }
    }

    /**
     * Liste tous les administrateurs
     */
    async listAdmins() {
        try {
            const response = await api.get('/admin-management/list');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des admins:', error);
            throw error;
        }
    }

    /**
     * Réinitialise le mot de passe d'un admin
     */
    async resetAdminPassword(email, newPassword) {
        try {
            const response = await api.post('/admin-management/reset-password', {
                email,
                newPassword
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe:', error);
            throw error;
        }
    }

    /**
     * Crée un nouvel admin personnalisé
     */
    async createCustomAdmin(adminData) {
        try {
            const response = await api.post('/admin-management/create-custom', adminData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création de l\'admin personnalisé:', error);
            throw error;
        }
    }

    /**
     * Désactive un admin
     */
    async deactivateAdmin(adminId) {
        try {
            const response = await api.patch(`/admin-management/${adminId}/deactivate`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la désactivation de l\'admin:', error);
            throw error;
        }
    }

    /**
     * Active un admin
     */
    async activateAdmin(adminId) {
        try {
            const response = await api.patch(`/admin-management/${adminId}/activate`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'activation de l\'admin:', error);
            throw error;
        }
    }

    /**
     * Met à jour les informations d'un admin
     */
    async updateAdmin(adminId, updateData) {
        try {
            const response = await api.patch(`/admin-management/${adminId}`, updateData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'admin:', error);
            throw error;
        }
    }

    /**
     * Supprime un admin (attention: action irréversible)
     */
    async deleteAdmin(adminId) {
        try {
            const response = await api.delete(`/admin-management/${adminId}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'admin:', error);
            throw error;
        }
    }

    /**
     * Obtient les statistiques des admins
     */
    async getAdminStats() {
        try {
            const response = await api.get('/admin-management/stats');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques:', error);
            throw error;
        }
    }

    /**
     * Vérifie les permissions d'un admin
     */
    async checkAdminPermissions(adminId) {
        try {
            const response = await api.get(`/admin-management/${adminId}/permissions`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la vérification des permissions:', error);
            throw error;
        }
    }

    /**
     * Met à jour les permissions d'un admin
     */
    async updateAdminPermissions(adminId, permissions) {
        try {
            const response = await api.patch(`/admin-management/${adminId}/permissions`, {
                permissions
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour des permissions:', error);
            throw error;
        }
    }

    /**
     * Obtient l'historique des connexions d'un admin
     */
    async getAdminLoginHistory(adminId, options = {}) {
        try {
            const queryParams = new URLSearchParams(options).toString();
            const url = `/admin-management/${adminId}/login-history${queryParams ? `?${queryParams}` : ''}`;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'historique:', error);
            throw error;
        }
    }

    /**
     * Force la déconnexion d'un admin
     */
    async forceLogoutAdmin(adminId) {
        try {
            const response = await api.post(`/admin-management/${adminId}/force-logout`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la déconnexion forcée:', error);
            throw error;
        }
    }

    /**
     * Exporte la liste des admins
     */
    async exportAdmins(format = 'json') {
        try {
            const response = await api.get(`/admin-management/export?format=${format}`, {
                responseType: format === 'csv' ? 'blob' : 'json'
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'export:', error);
            throw error;
        }
    }
}

// Instance singleton
const adminManagementService = new AdminManagementService();

export default adminManagementService;