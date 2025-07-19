import React, { useState } from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Users, Calendar, Award, Code, Music, Camera, Cpu, Globe, ArrowLeft, Search, Filter } from 'lucide-react';

export default function ClubsPage() {
  const [filtreCategorie, setFiltreCategorie] = useState('Tous');
  const [recherche, setRecherche] = useState('');

  const clubs = [
    {
      nom: "ESPRIT Club ACM",
      categorie: "Informatique",
      description: "Club dédié à l'informatique théorique et pratique, programming contests et recherche",
      membres: 45,
      president: "Yassine Kouider",
      email: "acm@esprit.tn",
      fondation: "2015",
      activites: ["Programming Contest", "Workshops", "Conférences Tech"],
      prochainEvent: "ACM Programming Contest - 15 Mars 2025"
    },
    {
      nom: "ESPRIT Club YouRobot",
      categorie: "Robotique",
      description: "Innovation en robotique et intelligence artificielle",
      membres: 38,
      president: "Amira Benzarti",
      email: "yourobot@esprit.tn",
      fondation: "2016",
      activites: ["Conception robots", "Compétitions", "Workshops IA"],
      prochainEvent: "Robot Competition - 20 Avril 2025"
    },
    {
      nom: "CLUB IEEE ESPRIT",
      categorie: "Ingénierie",
      description: "Branch étudiante de l'IEEE pour l'avancement technologique",
      membres: 52,
      president: "Mohamed Slim Karray",
      email: "ieee@esprit.tn",
      fondation: "2014",
      activites: ["Conférences", "Projets techniques", "Networking"],
      prochainEvent: "IEEE Day - 6 Octobre 2025"
    },
    {
      nom: "ESPRIT Club Radio Libertad",
      categorie: "Média",
      description: "Radio étudiante pour l'information et le divertissement",
      membres: 28,
      president: "Salma Hadj Ali",
      email: "libertad@esprit.tn",
      fondation: "2017",
      activites: ["Émissions radio", "Podcasts", "Interviews"],
      prochainEvent: "Émission spéciale - Chaque Mardi 14h"
    },
    {
      nom: "ESPRIT Club Tunivisions",
      categorie: "Média",
      description: "Production audiovisuelle et création de contenu",
      membres: 31,
      president: "Karim Cherif",
      email: "tunivisions@esprit.tn",
      fondation: "2018",
      activites: ["Courts métrages", "Documentaires", "Clips"],
      prochainEvent: "Festival du Film Étudiant - 10 Mai 2025"
    },
    {
      nom: "Lions ESPRIT",
      categorie: "Humanitaire",
      description: "Service communautaire et actions humanitaires",
      membres: 42,
      president: "Fatma Bouazizi",
      email: "lions@esprit.tn",
      fondation: "2019",
      activites: ["Actions caritatives", "Volontariat", "Collectes"],
      prochainEvent: "Campagne de don - 25 Février 2025"
    },
    {
      nom: "Junior Entreprise GCEM",
      categorie: "Entrepreneuriat",
      description: "Projets d'ingénierie et consulting pour les entreprises",
      membres: 35,
      president: "Ahmed Trabelsi",
      email: "je.gcem@esprit.tn",
      fondation: "2013",
      activites: ["Projets clients", "Formations", "Consulting"],
      prochainEvent: "Salon de l'Entrepreneuriat - 18 Mars 2025"
    },
    {
      nom: "Junior Entreprise TIC",
      categorie: "Entrepreneuriat",
      description: "Solutions IT et développement pour les entreprises",
      membres: 29,
      president: "Nour Jelassi",
      email: "je.tic@esprit.tn",
      fondation: "2014",
      activites: ["Développement web", "Mobile apps", "Consulting IT"],
      prochainEvent: "Hackathon Entrepreneurial - 5 Avril 2025"
    },
    {
      nom: "ESPRIT Club ROTARACT",
      categorie: "Humanitaire",
      description: "Service communautaire et développement du leadership",
      membres: 48,
      president: "Ines Maaloul",
      email: "rotaract@esprit.tn",
      fondation: "2016",
      activites: ["Projets sociaux", "Leadership", "Networking"],
      prochainEvent: "Journée Environnement - 22 Avril 2025"
    },
    {
      nom: "Club Only Events",
      categorie: "Événementiel",
      description: "Organisation d'événements et animation de la vie étudiante",
      membres: 55,
      president: "Maher Bouslama",
      email: "events@esprit.tn",
      fondation: "2015",
      activites: ["Soirées étudiantes", "Concerts", "Festivals"],
      prochainEvent: "Spring Festival - 15 Mai 2025"
    },
    {
      nom: "Club Santé",
      categorie: "Santé",
      description: "Sensibilisation à la santé et au bien-être étudiant",
      membres: 33,
      president: "Dorra Mansouri",
      email: "sante@esprit.tn",
      fondation: "2018",
      activites: ["Campagnes santé", "Workshops", "Don du sang"],
      prochainEvent: "Semaine de la Santé - 8 Avril 2025"
    },
    {
      nom: "Club PITCHUP",
      categorie: "Entrepreneuriat",
      description: "Pitch training et développement d'idées d'entreprise",
      membres: 26,
      president: "Sami Gharbi",
      email: "pitchup@esprit.tn",
      fondation: "2019",
      activites: ["Pitch sessions", "Mentoring", "Business plans"],
      prochainEvent: "Pitch Competition - 12 Mars 2025"
    }
  ];

  const categories = ['Tous', 'Informatique', 'Robotique', 'Ingénierie', 'Média', 'Humanitaire', 'Entrepreneuriat', 'Événementiel', 'Santé'];

  const clubsFiltres = clubs.filter(club => {
    const matchCategorie = filtreCategorie === 'Tous' || club.categorie === filtreCategorie;
    const matchRecherche = club.nom.toLowerCase().includes(recherche.toLowerCase()) || 
                          club.description.toLowerCase().includes(recherche.toLowerCase());
    return matchCategorie && matchRecherche;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-green-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <img src="/images/logo.png" alt="ESPRIT" className="h-10 w-auto" />
              <span className="text-xl font-bold text-green-600">Clubs Étudiants</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Clubs Étudiants
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Plus de 20 clubs actifs pour développer vos passions, compétences et créer des liens durables
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                <Users className="w-4 h-4 mr-2" />
                Rejoindre un Club
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
                <Award className="w-4 h-4 mr-2" />
                Créer un Club
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un club..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(categorie => (
                <Button
                  key={categorie}
                  variant={filtreCategorie === categorie ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFiltreCategorie(categorie)}
                  className={filtreCategorie === categorie ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {categorie}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {clubsFiltres.length} Club{clubsFiltres.length > 1 ? 's' : ''} 
              {filtreCategorie !== 'Tous' && ` - ${filtreCategorie}`}
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les clubs qui correspondent à vos intérêts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubsFiltres.map((club, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {club.nom.split(' ')[0].substring(0, 2)}
                        </span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {club.categorie}
                      </span>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {club.membres}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{club.nom}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{club.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Award className="w-3 h-3 mr-2" />
                      <span>Président: {club.president}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-2" />
                      <span>Fondé en {club.fondation}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Activités principales:</h4>
                    <div className="flex flex-wrap gap-1">
                      {club.activites.map((activite, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {activite}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-green-800">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      <strong>Prochain événement:</strong> {club.prochainEvent}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      Rejoindre
                    </Button>
                    <Button variant="outline" className="flex-1">
                      En savoir plus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Clubs en Chiffres</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">22</div>
              <div className="text-gray-600">Clubs Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">850+</div>
              <div className="text-gray-600">Membres</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">120+</div>
              <div className="text-gray-600">Événements/An</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">15</div>
              <div className="text-gray-600">Compétitions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Envie de Créer Votre Club ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Vous avez une passion à partager ? Créez votre propre club et rassemblez une communauté autour de vos intérêts !
          </p>
          <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
            <Award className="w-4 h-4 mr-2" />
            Créer un Club
          </Button>
        </div>
      </section>
    </div>
  );
}
