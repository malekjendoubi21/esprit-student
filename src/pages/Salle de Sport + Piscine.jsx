import React from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import {Dumbbell, Waves, Clock, Users, Calendar, Trophy, ArrowLeft, MapPin, Star, Award} from 'lucide-react';

export default function SportPage() {


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-orange-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-orange-600">Sport & Piscine</span>
            </div>
            <Button
                className="bg-gradient-to-r from-orange-500 to-orange-700 text-white"
            >
              <Award className="w-4 h-4 mr-2"/>
              Contacter
            </Button>
         </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Dumbbell className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complexe Sportif ESPRIT
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Des installations modernes et variées pour votre bien-être physique et mental
            </p>

          </div>
        </div>
      </section>

      {/* Installations Section avec 6 images */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Installations</h2>
            <p className="text-xl text-gray-600">Découvrez notre salle de sport en images</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 7, 3, 4, 5, 6].map((num) => (
                <img
                    key={num}
                    src={`/images/sport/${num}.jpg`}
                    alt={`Salle de sport ${num}`}
                    className="rounded-lg shadow-md hover:shadow-lg transition duration-300 object-cover w-full h-64"
                />
            ))}
          </div>
        </div>
      </section>

      {/* Section Piscine */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Piscine</h2>
          <img
              src="/images/sport/2.jpg"
              alt="Piscine ESPRIT"
              className="rounded-lg shadow-md w-full max-h-[600px] object-cover"
          />
        </div>
      </section>

      {/* Section Tarifs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tarifs</h2>
          <img
              src="/images/sport/prix.jpg"
              alt="Tarifs du complexe"
              className="rounded-lg shadow-md w-full object-contain"
          />
        </div>
      </section>

      {/* Section Programme de l'année précédente */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Programme Année Précédente</h2>
          <img
              src="/images/sport/seances.jpg"
              alt="Programme annuel précédent"
              className="rounded-lg shadow-md w-full object-contain"
          />
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Contactez-Nous</h2>
          <p className="text-xl mb-8">
            Pour toute information ou réservation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-orange-600 hover:bg-gray-100">
              <Users className="w-4 h-4 mr-2" />
              Responsable Sport: +216 .......
            </Button>
            <Button className="bg-white text-orange-600 hover:bg-gray-100">
              <Waves className="w-4 h-4 mr-2" />
              Piscine: +216 .........
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
