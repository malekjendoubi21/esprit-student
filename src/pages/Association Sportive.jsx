import React from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Trophy, Users, Calendar, Target, Award, MapPin, ArrowLeft, Clock, Star } from 'lucide-react';

export default function AssociationSportivePage() {

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="flex items-center text-gray-600 hover:text-yellow-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2"/>
                Retour
              </Button>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-yellow-600">Association Sportive</span>
              </div>
              <Button
                  className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white"
              >
                <Award className="w-4 h-4 mr-2"/>
                Contacter
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section
        <section className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Trophy className="w-16 h-16 mx-auto mb-6 text-white"/>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Association Sportive ESPRIT
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Excellence sportive, esprit d'équipe et dépassement de soi - Rejoignez nos équipes de compétition !
              </p>

            </div>
          </div>
        </section>
*/}

        <section className="py-20 bg-gray-50 flex justify-center">
          <div className="max-w-4xl w-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400
                  rounded-3xl shadow-2xl p-12 flex flex-col items-center text-center
                  transform hover:scale-105 transition-transform duration-300">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-6 text-yellow-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-4xl font-extrabold text-yellow-800 mb-4">
              Page en cours de développement
            </h2>
            <p className="text-lg text-yellow-900 max-w-3xl">
              Nous travaillons activement pour vous offrir une expérience exceptionnelle. Merci de votre patience !
            </p>
          </div>
        </section>


        {/* Contact Section
        <section className="py-16 bg-yellow-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Rejoignez-Nous !</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Que vous soyez débutant ou confirmé, il y a une place pour vous dans nos équipes !
            </p>

          </div>
        </section>
        */}
      </div>
  );
}
