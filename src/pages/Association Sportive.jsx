import React from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Trophy, Users, Calendar, Target, Award, MapPin, ArrowLeft, Clock, Star } from 'lucide-react';

export default function AssociationSportivePage() {
  const sports = [
    {
      nom: "Football",
      equipes: 3,
      membres: 45,
      niveau: "Débutant à Professionnel",
      entrainements: "Mar & Ven 19h-21h",
      capitaine: "Ahmed Mansouri",
      realisations: ["Champion régional 2024", "Finaliste coupe universitaire"]
    },
    {
      nom: "Basketball",
      equipes: 2,
      membres: 24,
      niveau: "Intermédiaire à Avancé",
      entrainements: "Lun & Mer 18h-20h",
      capitaine: "Youssef Bennani",
      realisations: ["3ème place championnat 2024", "Meilleur joueur: Youssef B."]
    },
    {
      nom: "Volleyball",
      equipes: 2,
      membres: 18,
      niveau: "Tous niveaux",
      entrainements: "Jeu & Sam 17h-19h",
      capitaine: "Fatma Zouari",
      realisations: ["Vice-champion régional 2024", "Équipe la plus fair-play"]
    },
    {
      nom: "Tennis de Table",
      equipes: 1,
      membres: 12,
      niveau: "Tous niveaux",
      entrainements: "Mar & Ven 16h-18h",
      capitaine: "Sami Trabelsi",
      realisations: ["Qualifiés finale nationale", "Champion individuel: Sami T."]
    },
    {
      nom: "Natation",
      equipes: 1,
      membres: 15,
      niveau: "Débutant à Avancé",
      entrainements: "Lun, Mer, Ven 7h-8h30",
      capitaine: "Mariem Chelbi",
      realisations: ["Record de l'école 100m nage libre", "3 médailles aux jeux universitaires"]
    },
    {
      nom: "Athlétisme",
      equipes: 1,
      membres: 20,
      niveau: "Tous niveaux",
      entrainements: "Lun & Jeu 17h-19h",
      capitaine: "Karim Sassi",
      realisations: ["Champion régional 1500m", "Équipe qualifiée aux nationaux"]
    }
  ];

  const competitions = [
    {
      nom: "Championnat Universitaire de Football",
      date: "15-17 Mars 2025",
      lieu: "Stade Municipal Ariana",
      participants: "16 équipes",
      statut: "Inscription ouverte",
      prix: "Trophée + 5000 TND"
    },
    {
      nom: "Tournoi Inter-Écoles Basketball",
      date: "22-24 Avril 2025",
      lieu: "Complexe Sportif ESPRIT",
      participants: "12 équipes",
      statut: "Qualifiés",
      prix: "Coupe + Médailles"
    },
    {
      nom: "Jeux Universitaires Tunisiens",
      date: "10-15 Mai 2025",
      lieu: "Tunis",
      participants: "8 disciplines",
      statut: "En préparation",
      prix: "Médailles + Bourses"
    },
    {
      nom: "Marathon Universitaire",
      date: "5 Juin 2025",
      lieu: "Lac de Tunis",
      participants: "Individual",
      statut: "Inscription ouverte",
      prix: "Médailles + Lots"
    }
  ];

  const bureau = [
    {
      nom: "Omar Jendoubi",
      poste: "Président",
      specialite: "Génie Mécanique",
      annee: "5ème année",
      sports: ["Football", "Basketball"],
      experience: "Captain équipe football 3 ans"
    },
    {
      nom: "Leila Mahfoudh",
      poste: "Vice-Présidente",
      specialite: "Génie Informatique",
      annee: "4ème année",
      sports: ["Volleyball", "Tennis"],
      experience: "Organisatrice tournois inter-écoles"
    },
    {
      nom: "Mehdi Bourguiba",
      poste: "Secrétaire Général",
      specialite: "Génie Industriel",
      annee: "3ème année",
      sports: ["Natation", "Athlétisme"],
      experience: "Nageur semi-professionnel"
    },
    {
      nom: "Dorra Laabidi",
      poste: "Trésorière",
      specialite: "Génie Civil",
      annee: "4ème année",
      sports: ["Tennis de table", "Volleyball"],
      experience: "Gestionnaire équipements sportifs"
    }
  ];

  const evenements = [
    {
      titre: "Journée Portes Ouvertes Sportives",
      date: "20 Février 2025",
      description: "Découverte de tous les sports et inscription aux équipes",
      type: "Recrutement"
    },
    {
      titre: "Tournoi Amical Multi-Sports",
      date: "15 Mars 2025",
      description: "Compétition amicale entre toutes les équipes ESPRIT",
      type: "Compétition"
    },
    {
      titre: "Soirée de Gala Sportive",
      date: "30 Mai 2025",
      description: "Remise des trophées et célébration des performances",
      type: "Cérémonie"
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
              className="flex items-center text-gray-600 hover:text-yellow-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <img src="/images/logo.png" alt="ESPRIT" className="h-10 w-auto" />
              <span className="text-xl font-bold text-yellow-600">Association Sportive</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Association Sportive ESPRIT
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Excellence sportive, esprit d'équipe et dépassement de soi - Rejoignez nos équipes de compétition !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3">
                <Users className="w-4 h-4 mr-2" />
                Rejoindre une Équipe
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-3">
                <Calendar className="w-4 h-4 mr-2" />
                Calendrier Compétitions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Disciplines</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              6 sports de compétition avec des équipes de tous niveaux
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports.map((sport, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{sport.nom}</h3>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {sport.membres} membres
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-3 h-3 mr-1" />
                        {sport.equipes} équipe{sport.equipes > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Target className="w-4 h-4 mr-2" />
                      <span>Niveau: {sport.niveau}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Entraînements: {sport.entrainements}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2" />
                      <span>Capitaine: {sport.capitaine}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Réalisations 2024:</h4>
                    <ul className="space-y-1">
                      {sport.realisations.map((realisation, i) => (
                        <li key={i} className="text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                          {realisation}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    Rejoindre l'équipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bureau Section */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bureau de l'Association</h2>
            <p className="text-xl text-gray-600">
              Une équipe dédiée à la promotion du sport étudiant
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bureau.map((membre, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {membre.nom.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{membre.nom}</h3>
                  <p className="text-yellow-600 font-medium mb-2">{membre.poste}</p>
                  <p className="text-sm text-gray-600 mb-1">{membre.specialite}</p>
                  <p className="text-sm text-gray-600 mb-3">{membre.annee}</p>
                  
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-1">Sports pratiqués:</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {membre.sports.map((sport, i) => (
                        <span key={i} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 italic">{membre.experience}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compétitions 2025</h2>
            <p className="text-xl text-gray-600">
              Calendrier des compétitions et tournois
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {competitions.map((competition, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{competition.nom}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      competition.statut === 'Qualifiés' ? 'bg-green-100 text-green-800' :
                      competition.statut === 'Inscription ouverte' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {competition.statut}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{competition.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{competition.lieu}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{competition.participants}</span>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-yellow-800">
                      <Trophy className="w-3 h-3 inline mr-1" />
                      <strong>Prix:</strong> {competition.prix}
                    </p>
                  </div>
                  
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    {competition.statut === 'Qualifiés' ? 'Voir détails' : 'S\'inscrire'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Événements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Événements à Venir</h2>
            <p className="text-xl text-gray-600">
              Participez à nos événements sportifs et conviviaux
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {evenements.map((evenement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{evenement.titre}</h3>
                  <p className="text-yellow-600 font-medium mb-2">{evenement.date}</p>
                  <p className="text-gray-600 mb-4">{evenement.description}</p>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    {evenement.type}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Performances</h2>
            <p className="text-xl text-gray-600">
              L'excellence sportive d'ESPRIT en chiffres
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">6</div>
              <div className="text-gray-600">Disciplines</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">134</div>
              <div className="text-gray-600">Athlètes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">15</div>
              <div className="text-gray-600">Trophées 2024</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">25</div>
              <div className="text-gray-600">Compétitions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez-Nous !</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Que vous soyez débutant ou confirmé, il y a une place pour vous dans nos équipes !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3">
              <Users className="w-4 h-4 mr-2" />
              Inscription Équipes
            </Button>
            <Button className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3">
              <Trophy className="w-4 h-4 mr-2" />
              Calendrier Compétitions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
