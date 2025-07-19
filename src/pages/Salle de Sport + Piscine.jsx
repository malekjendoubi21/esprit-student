import React from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Dumbbell, Waves, Clock, Users, Calendar, Trophy, ArrowLeft, MapPin, Star } from 'lucide-react';

export default function SportPage() {
  const installations = [
    {
      nom: "Salle de Musculation",
      description: "Équipement moderne avec machines et poids libres",
      horaires: "6h00 - 22h00",
      capacite: "50 personnes",
      equipements: ["Tapis de course", "Vélos elliptiques", "Bancs de musculation", "Poids libres"],
      tarif: "Gratuit avec carte étudiant"
    },
    {
      nom: "Piscine Olympique",
      description: "Bassin de 50m avec vestiaires et douches",
      horaires: "7h00 - 20h00",
      capacite: "100 personnes",
      equipements: ["8 couloirs", "Plongeoirs", "Vestiaires", "Matériel de natation"],
      tarif: "5 TND/séance"
    },
    {
      nom: "Terrain de Football",
      description: "Terrain synthétique éclairé",
      horaires: "8h00 - 21h00",
      capacite: "22 joueurs",
      equipements: ["Éclairage", "Vestiaires", "Bancs de touche", "Buts réglementaires"],
      tarif: "Réservation 20 TND/h"
    },
    {
      nom: "Terrains de Tennis",
      description: "2 courts avec surface en dur",
      horaires: "7h00 - 19h00",
      capacite: "4 joueurs",
      equipements: ["Éclairage", "Filets", "Bancs", "Tableau de score"],
      tarif: "10 TND/h"
    },
    {
      nom: "Salle de Fitness",
      description: "Cours collectifs et entraînement fonctionnel",
      horaires: "6h00 - 21h00",
      capacite: "30 personnes",
      equipements: ["Tapis de sol", "Ballons", "Haltères", "Système audio"],
      tarif: "Gratuit avec carte étudiant"
    }
  ];

  const activites = [
    {
      nom: "Aqua Fitness",
      description: "Cours de fitness aquatique dynamique",
      horaires: "Lundi, Mercredi, Vendredi 18h00-19h00",
      coach: "Mme Sonia Belhadj",
      niveau: "Tous niveaux",
      participants: "12/15"
    },
    {
      nom: "Musculation Débutant",
      description: "Initiation à la musculation avec accompagnement",
      horaires: "Mardi, Jeudi 17h00-18h00",
      coach: "M. Karim Sfaxi",
      niveau: "Débutant",
      participants: "8/10"
    },
    {
      nom: "Natation Compétition",
      description: "Entraînement pour les compétitions inter-écoles",
      horaires: "Lundi, Mercredi, Vendredi 7h00-8h30",
      coach: "M. Slim Bouaziz",
      niveau: "Avancé",
      participants: "15/20"
    },
    {
      nom: "Football Étudiant",
      description: "Entraînement de l'équipe représentative",
      horaires: "Mardi, Jeudi 19h00-20h30",
      coach: "M. Hichem Jrad",
      niveau: "Intermédiaire",
      participants: "18/22"
    },
    {
      nom: "Tennis Club",
      description: "Cours et tournois de tennis",
      horaires: "Samedi 14h00-16h00",
      coach: "Mme Leila Mansouri",
      niveau: "Tous niveaux",
      participants: "6/8"
    },
    {
      nom: "Yoga & Relaxation",
      description: "Séances de yoga et méditation",
      horaires: "Mercredi 12h00-13h00",
      coach: "Mme Amina Gharbi",
      niveau: "Débutant",
      participants: "10/15"
    }
  ];

  const competitions = [
    {
      nom: "Championnat Inter-Écoles de Natation",
      date: "15 Mars 2025",
      lieu: "Piscine ESPRIT",
      participants: "120 étudiants",
      prix: "Trophées + Médailles"
    },
    {
      nom: "Tournoi de Football Universitaire",
      date: "22-24 Avril 2025",
      lieu: "Terrain ESPRIT",
      participants: "16 équipes",
      prix: "Coupe + 3000 TND"
    },
    {
      nom: "Open de Tennis ESPRIT",
      date: "10-12 Mai 2025",
      lieu: "Courts de tennis",
      participants: "32 joueurs",
      prix: "Raquettes + Trophées"
    }
  ];

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
              <img src="/images/logo.png" alt="ESPRIT" className="h-10 w-auto" />
              <span className="text-xl font-bold text-orange-600">Sport & Piscine</span>
            </div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3">
                <Calendar className="w-4 h-4 mr-2" />
                Réserver un Créneau
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3">
                <Users className="w-4 h-4 mr-2" />
                Rejoindre un Cours
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Installations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Installations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Équipements modernes et espaces dédiés à tous les sports
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installations.map((installation, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {installation.nom.includes('Piscine') ? (
                      <Waves className="w-8 h-8 text-orange-600 mr-3" />
                    ) : (
                      <Dumbbell className="w-8 h-8 text-orange-600 mr-3" />
                    )}
                    <h3 className="text-xl font-semibold text-gray-900">{installation.nom}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{installation.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{installation.horaires}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Capacité: {installation.capacite}</span>
                    </div>
                    <div className="flex items-center text-sm text-orange-600 font-medium">
                      <Star className="w-4 h-4 mr-2" />
                      <span>{installation.tarif}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Équipements:</h4>
                    <div className="flex flex-wrap gap-1">
                      {installation.equipements.map((equipement, i) => (
                        <span key={i} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          {equipement}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activités Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cours et Activités</h2>
            <p className="text-xl text-gray-600">
              Programmes d'entraînement encadrés par des professionnels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activites.map((activite, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{activite.nom}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activite.niveau === 'Débutant' ? 'bg-green-100 text-green-800' :
                      activite.niveau === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800' :
                      activite.niveau === 'Avancé' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activite.niveau}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{activite.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{activite.horaires}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Coach: {activite.coach}</span>
                    </div>
                    <div className="flex items-center text-sm text-orange-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Places: {activite.participants}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    S'inscrire
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compétitions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compétitions à Venir</h2>
            <p className="text-xl text-gray-600">
              Participez aux tournois et championnats inter-écoles
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {competitions.map((competition, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{competition.nom}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{competition.date}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{competition.lieu}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{competition.participants}</span>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-orange-800">
                      <Trophy className="w-3 h-3 inline mr-1" />
                      <strong>Prix:</strong> {competition.prix}
                    </p>
                  </div>
                  
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Participer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Horaires d'Ouverture</h2>
            <p className="text-xl text-gray-600">
              Accès libre avec votre carte étudiante
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Installations Couvertes</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Salle de Musculation</span>
                      <span className="font-medium">6h00 - 22h00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Salle de Fitness</span>
                      <span className="font-medium">6h00 - 21h00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Piscine</span>
                      <span className="font-medium">7h00 - 20h00</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Installations Extérieures</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Terrain de Football</span>
                      <span className="font-medium">8h00 - 21h00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Courts de Tennis</span>
                      <span className="font-medium">7h00 - 19h00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Piste d'Athlétisme</span>
                      <span className="font-medium">6h00 - 20h00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
              Responsable Sport: +216 70 250 100
            </Button>
            <Button className="bg-white text-orange-600 hover:bg-gray-100">
              <Waves className="w-4 h-4 mr-2" />
              Piscine: +216 70 250 101
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
