import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Homee() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center border border-gray-200">
                <div className="flex flex-col items-center">
                    <AlertCircle className="w-16 h-16 text-red-600 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Site en cours de développement</h1>
                    <p className="text-gray-600 mb-6">
                        Nous travaillons actuellement sur ce site pour vous offrir la meilleure expérience possible.
                        Merci de votre patience.
                    </p>
                    <button
                        disabled
                        className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg opacity-70 cursor-not-allowed"
                    >
                        À venir bientôt
                    </button>
                </div>
            </div>
        </div>
    );
}
