import React from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Users, Mail, Phone, Calendar, Target, Award, ArrowLeft } from 'lucide-react';

export default function ComitePage() {
  const membres = [
    {
      nom: "Ahmed Ben Salem",
      poste: "Président",
      email: "ahmed.bensalem@esprit.tn",
      telephone: "+216 98 123 456",
      specialite: "Génie Logiciel",
      annee: "5ème année",
      photo: "/images/membres/ahmed.jpg"
    },
    {
      nom: "Fatima Zahra",
      poste: "Vice-Présidente",
      email: "fatima.zahra@esprit.tn",
      telephone: "+216 97 234 567",
      specialite: "Génie Informatique",
      annee: "4ème année",
      photo: "/images/membres/fatima.jpg"
    },
    {
      nom: "Mohamed Aymen",
      poste: "Secrétaire Général",
      email: "mohamed.aymen@esprit.tn",
      telephone: "+216 96 345 678",
      specialite: "Génie Industriel",
      annee: "3ème année",
      photo: "/images/membres/mohamed.jpg"
    },
    {
      nom: "Salma Ouali",
      poste: "Trésorière",
      email: "salma.ouali@esprit.tn",
      telephone: "+216 95 456 789",
      specialite: "Génie Civil",
      annee: "4ème année",
      photo: "/images/membres/salma.jpg"
    }
  ];

  const projets = [
    {
      titre: "Semaine d'Intégration 2024",
      description: "Organisation complète de la semaine d'accueil des nouveaux étudiants",
      statut: "Terminé",
      date: "Septembre 2024",
      participants: 1200
    },
    {
      titre: "Amélioration des Espaces Étudiants",
      description: "Rénovation et modernisation des espaces communs",
      statut: "En cours",
      date: "Décembre 2024",
      participants: 50
    },
    {
      titre: "Forum Emploi ESPRIT",
      description: "Organisation du forum annuel avec 80+ entreprises",
      statut: "Planifié",
      date: "Mars 2025",
      participants: 2000
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
              className="flex items-center text-gray-600 hover:text-[#E30613]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <img src="/images/logo.png" alt="ESPRIT" className="h-10 w-auto" />
              <span className="text-xl font-bold text-[#E30613]">Comité des Étudiants</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#E30613] to-[#c00010] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Comité des Étudiants
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Votre voix, vos droits, votre représentation au sein d'ESPRIT
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-[#E30613] hover:bg-gray-100 px-8 py-3">
                <Mail className="w-4 h-4 mr-2" />
                Nous Contacter
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#E30613] px-8 py-3">
                <Calendar className="w-4 h-4 mr-2" />
                Réunion Publique
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Représenter, défendre et améliorer les conditions de vie étudiante à ESPRIT
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Target className="w-12 h-12 text-[#E30613] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Représentation</h3>
                <p className="text-gray-600">
                  Être votre voix auprès de l'administration et défendre vos intérêts dans toutes les instances décisionnelles.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-[#E30613] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Animation</h3>
                <p className="text-gray-600">
                  Organiser des événements, activités et projets pour enrichir votre expérience étudiante.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-[#E30613] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Amélioration</h3>
                <p className="text-gray-600">
                  Proposer et mettre en œuvre des améliorations concrètes pour la vie étudiante.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membres Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-xl text-gray-600">
              Des étudiants engagés pour vous représenter
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membres.map((membre, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#E30613] to-[#c00010] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {membre.nom.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{membre.nom}</h3>
                  <p className="text-[#E30613] font-medium mb-2">{membre.poste}</p>
                  <p className="text-sm text-gray-600 mb-1">{membre.specialite}</p>
                  <p className="text-sm text-gray-600 mb-3">{membre.annee}</p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 flex items-center justify-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {membre.email}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center justify-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {membre.telephone}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projets Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Projets</h2>
            <p className="text-xl text-gray-600">
              Actions concrètes pour améliorer votre quotidien
            </p>
          </div>
          
          <div className="space-y-6">
            {projets.map((projet, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold mr-3">{projet.titre}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          projet.statut === 'Terminé' ? 'bg-green-100 text-green-800' :
                          projet.statut === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {projet.statut}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{projet.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="mr-4">{projet.date}</span>
                        <Users className="w-4 h-4 mr-1" />
                        <span>{projet.participants} participants</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#E30613] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Contactez-Nous</h2>
            <p className="text-xl mb-8">
              Une question, une suggestion, une réclamation ? Nous sommes là pour vous écouter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-[#E30613] hover:bg-gray-100">
                <Mail className="w-4 h-4 mr-2" />
                Comite.deseleves@esprit.tn
              </Button>
              <Button className="bg-white text-[#E30613] hover:bg-gray-100">
                <Phone className="w-4 h-4 mr-2" />
                (+216) 70 250 000
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
