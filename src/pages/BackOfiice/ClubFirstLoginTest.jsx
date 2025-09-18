import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { firstLoginService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ClubFirstLogin = () => {
    console.log('ClubFirstLogin component rendering...');
    
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center mb-4">Première connexion</h1>
                <p className="text-center text-gray-600">
                    Test - le composant se charge correctement
                </p>
                <div className="mt-4 p-4 bg-blue-100 rounded">
                    <p>Si vous voyez ce message, le composant fonctionne.</p>
                </div>
            </div>
        </div>
    );
};

export default ClubFirstLogin;