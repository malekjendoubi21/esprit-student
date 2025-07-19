import React from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Briefcase, Users, Calendar, Award, BookOpen, TrendingUp, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export default function CentreCarrierePage() {
  const services = [
    {
      titre: "Coaching CV & Lettre de Motivation",
      description: "Optimisation de vos documents de candidature avec des experts RH",
      icon: BookOpen,
      duree: "1-2 séances",
      prix: "Gratuit"
    },
    {
      titre: "Préparation aux Entretiens",
      description: "Simulations d'entretiens et techniques de communication",
      icon: Users,
      duree: "Sessions individuelles",
      prix: "Gratuit"
    },
    {
      titre: "Orientation Professionnelle",
      description: "Conseils personnalisés pour votre parcours professionnel",
      icon: TrendingUp,
      duree: "Suivi sur mesure",
      prix: "Gratuit"
    },
    {
      titre: "Recherche de Stages",
      description: "Accompagnement dans la recherche et candidature de stages",
      icon: Briefcase,
      duree: "Tout au long de l'année",
      prix: "Gratuit"
    }
  ];

  const evenements = [
    {
      titre: "Forum Emploi ESPRIT 2025",
      date: "15-17 Mars 2025",
      description: "Plus de 80 entreprises présentes pour recruter nos étudiants",
      participants: "2000+ étudiants",
      secteurs: ["IT", "Ingénierie", "Finance", "Conseil"],
      type: "Forum"
    },
    {
      titre: "Journée Portes Ouvertes Entreprises",
      date: "25 Avril 2025",
      description: "Visites d'entreprises et rencontres avec des professionnels",
      participants: "150 étudiants",
      secteurs: ["Tech", "Automobile", "Énergie"],
      type: "Visite"
    },
    {
      titre: "Conférence Entrepreneuriat",
      date: "10 Mai 2025",
      description: "Témoignages d'entrepreneurs et présentation d'opportunités",
      participants: "300 étudiants",
      secteurs: ["Startups", "Innovation", "Business"],
      type: "Conférence"
    }
  ];

  const partenaires = [
    {
      nom: "Tunisie Telecom",
      secteur: "Télécommunications",
      offres: "15 stages + 8 CDI",
      type: "Partenariat Premium"
    },
    {
      nom: "Banque de Tunisie",
      secteur: "Finance",
      offres: "20 stages + 12 CDI",
      type: "Partenariat Premium"
    },
    {
      nom: "Sofrecom",
      secteur: "Consulting IT",
      offres: "10 stages + 6 CDI",
      type: "Partenariat"
    },
    {
      nom: "Leoni",
      secteur: "Automobile",
      offres: "25 stages + 15 CDI",
      type: "Partenariat Premium"
    },
    {
      nom: "CGI",
      secteur: "Services IT",
      offres: "18 stages + 10 CDI",
      type: "Partenariat"
    },
    {
      nom: "Actia",
      secteur: "Électronique",
      offres: "12 stages + 8 CDI",
      type: "Partenariat"
    }
  ];

  const statistiques = [
    {
      titre: "Taux d'Insertion",
      valeur: "94%",
      description: "Dans les 6 mois après diplôme",
      couleur: "text-purple-600"
    },
    {
      titre: "Salaire Moyen",
      valeur: "2800 TND",
      description: "Salaire de début de carrière",
      couleur: "text-green-600"
    },
    {
      titre: "Entreprises Partenaires",
      valeur: "120+",
      description: "Partenaires actifs",
      couleur: "text-blue-600"
    },
    {
      titre: "Offres Annuelles",
      valeur: "400+",
      description: "Stages et emplois",
      couleur: "text-orange-600"
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
              className="flex items-center text-gray-600 hover:text-purple-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <img src="/images/logo.png" alt="ESPRIT" className="h-10 w-auto" />
              <span className="text-xl font-bold text-purple-600">Centre de Carrière</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Centre de Carrière
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Votre passerelle vers l'emploi - Accompagnement personnalisé pour votre insertion professionnelle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                <Calendar className="w-4 h-4 mr-2" />
                Prendre RDV
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
                <Briefcase className="w-4 h-4 mr-2" />
                Consulter les Offres
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
              Accompagnement complet pour votre réussite professionnelle
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <service.icon className="w-8 h-8 text-purple-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{service.titre}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Durée: {service.duree}</span>
                    <span className="text-purple-600 font-medium">{service.prix}</span>
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Résultats</h2>
            <p className="text-xl text-gray-600">
              Le succès de nos étudiants en chiffres
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

      {/* Événements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Événements à Venir</h2>
            <p className="text-xl text-gray-600">
              Opportunités de networking et de recrutement
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {evenements.map((evenement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      evenement.type === 'Forum' ? 'bg-purple-100 text-purple-800' :
                      evenement.type === 'Visite' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {evenement.type}
                    </span>
                    <span className="text-sm text-gray-500">{evenement.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{evenement.titre}</h3>
                  <p className="text-gray-600 mb-4">{evenement.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{evenement.participants}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {evenement.secteurs.map((secteur, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {secteur}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    S'inscrire
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Partenaires</h2>
            <p className="text-xl text-gray-600">
              Entreprises qui font confiance à nos étudiants
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partenaires.map((partenaire, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{partenaire.nom}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      partenaire.type === 'Partenariat Premium' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {partenaire.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{partenaire.secteur}</p>
                  
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <Briefcase className="w-3 h-3 inline mr-1" />
                      <strong>Offres 2025:</strong> {partenaire.offres}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment Ça Marche ?</h2>
            <p className="text-xl text-gray-600">
              Votre parcours vers l'emploi en 4 étapes
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Diagnostic</h3>
              <p className="text-gray-600">Évaluation de vos compétences et objectifs professionnels</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Préparation</h3>
              <p className="text-gray-600">Coaching CV, lettre de motivation et entretiens</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Candidature</h3>
              <p className="text-gray-600">Mise en relation avec nos entreprises partenaires</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Suivi</h3>
              <p className="text-gray-600">Accompagnement jusqu'à la signature du contrat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Contactez-Nous</h2>
            <p className="text-xl mb-8">
              Notre équipe est là pour vous accompagner dans votre réussite
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
              <p>+216 70 250 200</p>
              <p className="text-sm text-purple-200">Lun-Ven 8h30-17h00</p>
            </div>
            
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p>carriere@esprit.tn</p>
              <p className="text-sm text-purple-200">Réponse sous 24h</p>
            </div>
            
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Bureau</h3>
              <p>Bâtiment B, 2ème étage</p>
              <p className="text-sm text-purple-200">Bureaux 201-205</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
