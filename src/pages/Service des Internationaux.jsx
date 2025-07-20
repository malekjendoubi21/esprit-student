import React, {useEffect, useRef, useState} from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import {Globe, Users, Plane, BookOpen, Award, Mail, Phone, ArrowLeft, MapPin, Calendar, X} from 'lucide-react';

export default function ServiceInternationalPage() {


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
  const [showContactCard, setShowContactCard] = useState(false);
  const contactCardRef = useRef(null);

// Gérer le clic en dehors de la card
  useEffect(() => {
    function handleClickOutside(event) {
      if (contactCardRef.current && !contactCardRef.current.contains(event.target)) {
        setShowContactCard(false);
      }
    }

    if (showContactCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showContactCard]);
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
              <span className="text-xl font-bold text-indigo-600">Service des Internationaux</span>
            </div>
            <Button
                onClick={() => setShowContactCard(!showContactCard)}
                className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white hover:from-indigo-700 hover:to-indigo-900 transition-colors"
            >
              <Award className="w-4 h-4 mr-2"/>
              Contacter
            </Button>
          </div>
        </div>
      </header>
      {/* Contact Card (en dehors du header) */}
      {/* Contact Card (en dehors du header) */}
      {showContactCard && (
          <div className="absolute top-20 right-4 z-50 mt-2" ref={contactCardRef}>
            <div className="bg-white rounded-lg shadow-xl border p-6 w-80">
              <div className="relative mb-4">
                <h3 className="text-lg font-semibold text-gray-900 text-center">Contact</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowContactCard(false)}
                    className="absolute right-0 top-0 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <span className="text-xl mr-3">📲</span>
                  <div>
                    <p className="text-gray-900 font-semibold">
                      Service des internationaux
                    </p>
                    <p className="text-sm text-gray-600">
                      Mojeivi Nouomsi Ricardo : <span className="font-medium"></span>
                    </p>
                    <p className="text-sm text-gray-600">
                     <span className="font-medium">55 640 117</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 bg-green-50 rounded-lg">
                  <span className="text-xl mr-3">📲</span>
                  <div>
                    <p className="text-gray-900 font-semibold">Numéro vert</p>
                    <p className="text-sm text-gray-600">
                      Étudiants internationaux : <span className="font-medium">
                    </span>
                    </p>
                    <p className="text-sm text-gray-600">
                   <span className="font-medium">
                      93 536 235</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 bg-pink-50 rounded-lg">
                  <span className="text-xl mr-3">📍</span>
                  <div>
                    <p className="text-gray-900 font-semibold">Cellule d'écoute</p>
                    <p className="text-sm text-gray-600">Bloc A, Campus Esprit</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Contactez ces services pour toute aide aux étudiants internationaux
                </p>
              </div>
            </div>
          </div>
      )}

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

          </div>
        </div>
      </section>


      {/* Bienvenue Section - Modern Design */}
      <section className="py-20 bg-gradient-to-br from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Background decorative element */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute right-1/2 bottom-0 w-[200px] h-[200px] rounded-full bg-indigo-100/50"></div>
              <div className="absolute left-1/2 top-0 w-[300px] h-[300px] rounded-full bg-blue-100/30"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left Column - Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-600/10 rounded-xl transform -rotate-6"></div>
                <img
                    src="/images/Internationaux/Etudiants-Internationaux-image.jpg"
                    alt="Étudiants Internationaux"
                    className="relative w-full h-[400px] object-cover rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-4 rounded-lg shadow-lg">
                  <p className="text-sm font-medium">+180 Étudiants</p>
                  <p className="text-xs opacity-75">de 35 pays</p>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  Bienvenue à ESPRIT
                </div>

                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Votre Aventure Internationale
                  <span className="text-indigo-600"> Commence Ici</span>
                </h2>

                <div className="prose prose-lg text-gray-600">
                  <p>
                    Chaque année, ESPRIT accueille des étudiants internationaux provenant de divers horizons. Notre mission est de garantir une intégration harmonieuse et un accompagnement personnalisé pour que chaque étudiant se sente chez lui dès son arrivée en Tunisie.
                  </p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { title: "Accompagnement", value: "24/7" },
                    { title: "Universités Partenaires", value: "45+" },
                    { title: "Taux de Satisfaction", value: "96%" },
                    { title: "Pays Représentés", value: "35" }
                  ].map((item) => (
                      <div key={item.title} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-indigo-600">{item.value}</div>
                        <div className="text-sm text-gray-600">{item.title}</div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dispositif d'accueil Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-5 space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Dispositif d'accueil</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Un accueil personnalisé dès votre <span className="text-blue-600">premier jour</span>
              </h2>

              <p className="text-xl text-gray-600">
                Notre équipe d'accueil, composée d'étudiants ambassadeurs et de membres expérimentés, est là pour vous aider à chaque étape de votre installation.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Assistance aéroport", icon: "🛬" },
                  { title: "Démarches administratives", icon: "📋" },
                  { title: "Guide logement", icon: "🏠" },
                  { title: "Support quotidien", icon: "💪" }
                ].map((service) => (
                    <div key={service.title} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-2xl mb-2 block">{service.icon}</span>
                      <h3 className="font-medium text-gray-900">{service.title}</h3>
                    </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="lg:col-span-7 relative">
              <div className="relative">
                {/* Background shapes */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl"></div>

                {/* Content grid */}
                <div className="relative grid grid-cols-2 gap-4 p-6">
                  <div className="space-y-4">
                    <img
                        src="/images/Internationaux/accueil1.jpg"
                        alt="Accueil étudiants"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-1">Équipe d'accueil</h4>
                      <p className="text-sm text-gray-600">Des étudiants ambassadeurs formés pour vous accompagner</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-gray-900 mb-1">Support 24/7</h4>
                      <p className="text-sm text-gray-600">Une assistance disponible à tout moment</p>
                    </div>
                    <img
                        src="/images/Internationaux/accueil2.jpg"
                        alt="Support étudiant"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-sm opacity-75">Satisfaction</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">24/7</p>
                    <p className="text-sm opacity-75">Assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Équipe Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Une équipe dédiée à votre service</h2>
            <p className="mt-4 text-xl text-gray-600">Notre équipe vous accompagne à chaque étape de votre parcours</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Avant votre arrivée",
                description: "Dès la confirmation de votre inscription, nous entrons en contact avec vous pour recueillir vos informations essentielles.",
                icon: "📝"
              },
              {
                title: "Accueil à l'aéroport",
                description: "Nos équipes vous attendent à l'aéroport pour vous accompagner jusqu'à votre logement.",
                icon: "✈️"
              },
              {
                title: "Installation et accompagnement",
                description: "Nous veillons à ce que vous soyez confortablement installé, en vous guidant dans vos tâches quotidiennes.",
                icon: "🏠"
              },
              {
                title: "Démarches administratives",
                description: "Un étudiant ainé vous assiste dans l'obtention des documents essentiels.",
                icon: "📋"
              }
            ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Services offerts aux étudiants internationaux</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Aide logistique",
                description: "Support pour les échanges de devises et installation",
                icon: "🔧"
              },
              {
                title: "Support académique",
                description: "Accompagnement dans votre parcours d'études",
                icon: "📚"
              },
              {
                title: "Vie quotidienne",
                description: "Organisation de sorties, conseils et groupes d'entraide",
                icon: "🌟"
              }
            ].map((service, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
                  <span className="text-4xl mb-4 block">{service.icon}</span>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi choisir Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Pourquoi choisir ESPRIT ?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Qualité d'accueil",
                description: "Une organisation fluide et une attention particulière pour chaque étudiant",
                icon: "🌟"
              },
              {
                title: "Diversité culturelle",
                description: "Une opportunité unique d'interagir avec des étudiants du monde entier",
                icon: "🌍"
              },
              {
                title: "Support continu",
                description: "Une équipe dédiée prête à répondre à toutes vos questions",
                icon: "💪"
              }
            ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Contacts utiles</h2>
              <p className="mb-8 text-lg">
                Pour toute question ou pour en savoir plus sur les démarches à suivre, contactez notre équipe.
              </p>
              <div className="inline-flex items-center space-x-2 bg-white/20 px-6 py-3 rounded-full">
                <Mail className="w-5 h-5"/>
                <span>Service.internationaux@esprit.tn</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">


          </div>
        </div>
      </section>
    </div>
  );
}
