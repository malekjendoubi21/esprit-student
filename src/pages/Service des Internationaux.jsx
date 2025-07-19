import React from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Globe, Users, Plane, BookOpen, Award, Mail, Phone, ArrowLeft, MapPin, Calendar } from 'lucide-react';

export default function ServiceInternationalPage() {
  const services = [
    {
      titre: "Accueil Étudiants Internationaux",
      description: "Accompagnement complet pour votre intégration à ESPRIT",
      icon: Users,
      details: ["Aide aux démarches administratives", "Orientation sur le campus", "Parrainage étudiant", "Intégration culturelle"]
    },
    {
      titre: "Programmes d'Échange",
      description: "Opportunités d'études dans nos universités partenaires",
      icon: Plane,
      details: ["Échange semestre/année", "Stages internationaux", "Double diplôme", "Mobilité encadrée"]
    },
    {
      titre: "Soutien Linguistique",
      description: "Cours de langues et certification internationale",
      icon: BookOpen,
      details: ["Cours de français", "Cours d'arabe", "Préparation TOEFL/IELTS", "Certificats linguistiques"]
    },
    {
      titre: "Événements Multiculturels",
      description: "Célébration de la diversité culturelle",
      icon: Globe,
      details: ["Semaines culturelles", "Festivals internationaux", "Soirées interculturelles", "Ateliers culinaires"]
    }
  ];

  const partenaires = [
    {
      pays: "France",
      universites: ["Université Paris-Saclay", "INSA Lyon", "Centrale Nantes", "Télécom Paris"],
      etudiants: "25 étudiants ESPRIT",
      programmes: ["Échange semestriel", "Double diplôme", "Stages"]
    },
    {
      pays: "Canada",
      universites: ["Université de Montréal", "Université Laval", "Concordia University"],
      etudiants: "15 étudiants ESPRIT",
      programmes: ["Échange annuel", "Recherche", "Stages d'été"]
    },
    {
      pays: "Allemagne",
      universites: ["TU Berlin", "RWTH Aachen", "Karlsruhe Institute"],
      etudiants: "20 étudiants ESPRIT",
      programmes: ["Échange semestriel", "Stages industriels", "Recherche"]
    },
    {
      pays: "Espagne",
      universites: ["Universidad Politécnica Madrid", "UPC Barcelona", "Universidad Sevilla"],
      etudiants: "18 étudiants ESPRIT",
      programmes: ["Erasmus+", "Stages", "Projets collaboratifs"]
    },
    {
      pays: "Italie",
      universites: ["Politecnico di Milano", "Università di Bologna", "Sapienza Roma"],
      etudiants: "12 étudiants ESPRIT",
      programmes: ["Échange Erasmus", "Stages", "Recherche"]
    },
    {
      pays: "Turquie",
      universites: ["Bogazici University", "Middle East Technical University", "Sabanci University"],
      etudiants: "10 étudiants ESPRIT",
      programmes: ["Échange semestriel", "Stages", "Projets"]
    }
  ];

  const etudiantsInternationaux = [
    {
      nom: "Maria Garcia",
      pays: "Espagne",
      programme: "Échange Erasmus - Génie Informatique",
      duree: "Semestre 2 - 2024/2025",
      temoignage: "Une expérience formidable ! L'accueil à ESPRIT est exceptionnel et la diversité culturelle enrichissante."
    },
    {
      nom: "Thomas Mueller",
      pays: "Allemagne",
      programme: "Stage industriel - Génie Mécanique",
      duree: "6 mois - 2024",
      temoignage: "Stage très enrichissant dans une entreprise partenaire. L'accompagnement du service international est parfait."
    },
    {
      nom: "Sophie Dubois",
      pays: "France",
      programme: "Double diplôme - Génie Civil",
      duree: "2 ans - 2023/2025",
      temoignage: "Le programme double diplôme me permet d'avoir une formation complète et une expérience internationale unique."
    },
    {
      nom: "Ahmed Al-Rashid",
      pays: "Maroc",
      programme: "Master recherche - Informatique",
      duree: "2 ans - 2024/2026",
      temoignage: "Excellente qualité de formation et recherche. Les laboratoires sont très bien équipés."
    }
  ];

  const evenements = [
    {
      titre: "Semaine Culturelle Internationale",
      date: "10-15 Mars 2025",
      description: "Célébration de la diversité culturelle avec expositions, spectacles et gastronomie du monde",
      participants: "Tous les étudiants"
    },
    {
      titre: "Forum Mobilité Internationale",
      date: "25 Avril 2025",
      description: "Présentation des opportunités d'échange et témoignages d'étudiants",
      participants: "Étudiants intéressés par la mobilité"
    },
    {
      titre: "Soirée d'Accueil Nouveaux Étudiants",
      date: "15 Septembre 2025",
      description: "Accueil et intégration des nouveaux étudiants internationaux",
      participants: "Étudiants internationaux"
    },
    {
      titre: "Café Linguistique",
      date: "Chaque vendredi 16h",
      description: "Échange linguistique et culturel informel",
      participants: "Tous les étudiants"
    }
  ];

  const statistiques = [
    {
      titre: "Étudiants Internationaux",
      valeur: "180",
      description: "De 35 pays différents",
      couleur: "text-indigo-600"
    },
    {
      titre: "Universités Partenaires",
      valeur: "45",
      description: "Dans 20 pays",
      couleur: "text-green-600"
    },
    {
      titre: "Étudiants en Mobilité",
      valeur: "120",
      description: "ESPRIT à l'étranger",
      couleur: "text-purple-600"
    },
    {
      titre: "Taux de Satisfaction",
      valeur: "96%",
      description: "Étudiants satisfaits",
      couleur: "text-orange-600"
    }
  ];

  const equipe = [
    {
      nom: "Dr. Amina Benali",
      poste: "Directrice Service International",
      email: "amina.benali@esprit.tn",
      telephone: "+216 70 250 500",
      langues: ["Français", "Anglais", "Arabe", "Espagnol"]
    },
    {
      nom: "Jean-Pierre Dubois",
      poste: "Coordinateur Mobilité Europe",
      email: "jeanpierre.dubois@esprit.tn",
      telephone: "+216 70 250 501",
      langues: ["Français", "Anglais", "Allemand"]
    },
    {
      nom: "Sarah Johnson",
      poste: "Responsable Accueil Internationaux",
      email: "sarah.johnson@esprit.tn",
      telephone: "+216 70 250 502",
      langues: ["Anglais", "Français", "Arabe"]
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
              className="flex items-center text-gray-600 hover:text-indigo-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <img src="/images/logo.png" alt="ESPRIT" className="h-10 w-auto" />
              <span className="text-xl font-bold text-indigo-600">Service des Internationaux</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Globe className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Service des Internationaux
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Votre passerelle vers le monde - Programmes d'échange, accueil international et ouverture culturelle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3">
                <Plane className="w-4 h-4 mr-2" />
                Partir à l'Étranger
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3">
                <Users className="w-4 h-4 mr-2" />
                Accueil International
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accompagnement personnalisé pour votre expérience internationale
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <service.icon className="w-8 h-8 text-indigo-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{service.titre}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.details.map((detail, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                        {detail}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ESPRIT International</h2>
            <p className="text-xl text-gray-600">
              Notre dimension internationale en chiffres
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {statistiques.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className={`text-4xl font-bold mb-2 ${stat.couleur}`}>
                    {stat.valeur}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {stat.titre}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Partenaires Universitaires</h2>
            <p className="text-xl text-gray-600">
              Réseau international d'universités prestigieuses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partenaires.map((partenaire, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <Globe className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{partenaire.pays}</h3>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Universités partenaires:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {partenaire.universites.map((uni, i) => (
                        <li key={i}>• {uni}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-indigo-800">
                      <Users className="w-3 h-3 inline mr-1" />
                      <strong>{partenaire.etudiants}</strong> actuellement
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {partenaire.programmes.map((prog, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {prog}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Témoignages</h2>
            <p className="text-xl text-gray-600">
              L'expérience de nos étudiants internationaux
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {etudiantsInternationaux.map((etudiant, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">
                        {etudiant.nom.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{etudiant.nom}</h3>
                      <p className="text-sm text-indigo-600">{etudiant.pays}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">{etudiant.programme}</p>
                    <p className="text-sm text-gray-500">{etudiant.duree}</p>
                  </div>
                  
                  <blockquote className="italic text-gray-700 border-l-4 border-indigo-500 pl-4">
                    "{etudiant.temoignage}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Événements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Événements Internationaux</h2>
            <p className="text-xl text-gray-600">
              Participez à nos activités multiculturelles
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {evenements.map((evenement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-indigo-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{evenement.titre}</h3>
                      <p className="text-sm text-indigo-600">{evenement.date}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{evenement.description}</p>
                  
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="text-sm text-indigo-800">
                      <Users className="w-3 h-3 inline mr-1" />
                      <strong>Participants:</strong> {evenement.participants}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-xl text-gray-600">
              Des professionnels multilingues à votre service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {equipe.map((membre, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {membre.nom.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{membre.nom}</h3>
                  <p className="text-indigo-600 font-medium mb-4">{membre.poste}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Mail className="w-3 h-3 mr-2" />
                      <span className="truncate">{membre.email}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Phone className="w-3 h-3 mr-2" />
                      <span>{membre.telephone}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Langues parlées:</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {membre.langues.map((langue, i) => (
                        <span key={i} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                          {langue}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Contactez-Nous</h2>
            <p className="text-xl mb-8">
              Nous sommes là pour vous accompagner dans votre projet international
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
              <p>+216 70 250 500</p>
              <p className="text-sm text-indigo-200">Lun-Ven 8h00-17h00</p>
            </div>
            
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p>international@esprit.tn</p>
              <p className="text-sm text-indigo-200">Réponse sous 24h</p>
            </div>
            
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Bureau</h3>
              <p>Bâtiment A, 3ème étage</p>
              <p className="text-sm text-indigo-200">Bureaux 301-305</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
