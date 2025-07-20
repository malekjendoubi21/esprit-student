import React, {useEffect, useRef, useState} from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import {Briefcase, Users, Calendar, Award, BookOpen, TrendingUp, ArrowLeft, Mail, Phone, MapPin, X} from 'lucide-react';
import { ChevronLeft, ChevronRight } from "lucide-react"; // ou remplace par tes icônes ou SVG

export default function CentreCarrierePage() {
  const services = [
    {
      titre: "Séminaires métiers",
      description: "Sessions interactives avec des experts pour découvrir les réalités professionnelles et les compétences recherchées",
      icon: BookOpen,
      duree: "Sessions régulières",
      prix: "Gratuit"
    },
    {
      titre: "Workshops interactifs",
      description: "Ateliers pratiques pour développer des compétences spécifiques, comme la gestion de projets ou l'entrepreneuriat",
      icon: Users,
      duree: "Ateliers spécialisés",
      prix: "Gratuit"
    },
    {
      titre: "Visites d'entreprises",
      description: "Immersion dans des environnements professionnels pour mieux comprendre les attentes du marché du travail",
      icon: TrendingUp,
      duree: "Visites organisées",
      prix: "Gratuit"
    },
    {
      titre: "Conférences et débats",
      description: "Échanges enrichissants sur des thématiques actuelles et les tendances du marché",
      icon: Briefcase,
      duree: "Événements mensuels",
      prix: "Gratuit"
    }
  ];

  const servicesPreparation = [
    {
      titre: "Conseils CV & Lettre de motivation",
      description: "Conseils pour rédiger un CV percutant et des lettres de motivation convaincantes",
      icon: BookOpen
    },
    {
      titre: "Simulations d'entretiens",
      description: "Simulations d'entretiens d'embauche pour s'exercer dans des conditions réelles",
      icon: Users
    },
    {
      titre: "Formation outils numériques",
      description: "Formation à l'utilisation des outils numériques, tels que LinkedIn, pour maximiser son impact professionnel",
      icon: TrendingUp
    }
  ];

  const servicesSoftSkills = [
    {
      titre: "Communication & Prise de parole",
      description: "Amélioration des compétences en communication et de la prise de parole en public",
      icon: Users
    },
    {
      titre: "Gestion du stress",
      description: "Gestion du stress et des émotions dans des contextes professionnels",
      icon: Award
    },
    {
      titre: "Travail en équipe",
      description: "Développement de la collaboration et de l'efficacité dans le travail en équipe",
      icon: TrendingUp
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

  const photos = [1, 2, 3, 4, 5, 6];
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  function goPrev() {
    setSelectedPhotoIndex((idx) =>
        idx === 0 ? photos.length - 1 : idx - 1
    );
  }

  function goNext() {
    setSelectedPhotoIndex((idx) =>
        idx === photos.length - 1 ? 0 : idx + 1
    );
  }

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
                <ArrowLeft className="w-4 h-4 mr-2"/>
                Retour
              </Button>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-purple-600">Centre de Carrière</span>
              </div>
              <Button
                  onClick={() => setShowContactCard(!showContactCard)}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 text-white"
              >
                <Award className="w-4 h-4 mr-2"/>
                Contacter
              </Button>
            </div>
          </div>
        </header>

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
                    <X className="w-4 h-4"/>
                  </Button>
                </div>


                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200">
                    <img
                        src="/images/Centre de Carrière/ramla.jpg"
                        alt="Oussama Ben Hassen"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div
                        className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg"
                        style={{display: 'none'}}
                    >
                      OB
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Ramla Ben Ouirane</h4>
                    <p className="text-gray-600 text-sm">Responsable du Centre de Carrière</p>
                    <p className="text-gray-600 text-sm">Campus ESPRIT</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-lg mr-2">📞</span>
                    <span className="text-gray-700 font-medium">+216 70 250 200</span>
                  </div>
                  <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="text-lg mr-2">✉️</span>
                    <span className="text-gray-700 text-sm">Career.Center@Esprit.tn</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Contactez-le pour toute information sur le centre de carrière
                  </p>

                </div>
              </div>
            </div>
        )}


        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-6 text-white"/>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Centre de Carrière
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
              </p>

            </div>
          </div>
        </section>


        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Colonne gauche - Texte */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Centre de Carrière</h2>
                <p className="text-xl text-gray-600">
                  Le Centre de carrière est un espace dédié à accompagner les étudiants dans leur transition vers la vie
                  professionnelle. Il offre des outils, des ressources et des opportunités pour les aider à atteindre
                  leurs
                  objectifs de carrière.
                </p>
              </div>

              {/* Colonne droite - Image */}
              <div className="flex justify-center">
                <img
                    src="/images/Centre de Carrière/logo.jpg"
                    alt="Logo du Centre de Carrière"
                    className="w-full max-w-md object-contain rounded-lg shadow"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Activités Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Activités phares</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Le centre facilite le lien entre les étudiants et les professionnels
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              {/* Colonne gauche - Image */}
              <div className="h-full rounded-lg overflow-hidden shadow-lg">
                <img
                    src="/images/Centre de Carrière/1.jpg"
                    alt="Activités du Centre de Carrière"
                    className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Colonne droite - Liste des services */}
              <div className="flex flex-col justify-between h-full space-y-6">
                {services.map((service, index) => (
                    <Card key={index} className="flex-1 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 h-full">
                        <div className="flex items-center mb-4">
                          <service.icon className="w-8 h-8 text-purple-600 mr-3"/>
                          <h3 className="text-xl font-semibold text-gray-900">{service.titre}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Préparation aux candidatures */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Préparation aux candidatures</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Le centre propose des services pour optimiser la recherche d'emploi ou de stage
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {servicesPreparation.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <service.icon className="w-8 h-8 text-purple-600 mr-3"/>
                        <h3 className="text-lg font-semibold text-gray-900">{service.titre}</h3>
                      </div>

                      <p className="text-gray-600 flex-grow">{service.description}</p>


                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Développement personnel et soft skills */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Développement personnel et soft skills</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des activités ciblées pour renforcer ces compétences non techniques essentielles
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {servicesSoftSkills.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <service.icon className="w-8 h-8 text-purple-600 mr-3"/>
                        <h3 className="text-lg font-semibold text-gray-900">{service.titre}</h3>
                      </div>

                      <p className="text-gray-600 flex-grow">{service.description}</p>


                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Soutien à l'entrepreneuriat */}
        <section className="py-16 bg-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Soutien à l'entrepreneuriat</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Le centre encourage l'esprit entrepreneurial à travers des activités visant à favoriser l'innovation, le
                leadership et la création d'entreprise
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600 mr-3"/>
                    <h3 className="text-lg font-semibold text-gray-900">Innovation & Projets</h3>
                  </div>

                  <p className="text-gray-600 flex-grow">Développer des idées novatrices et les transformer en projets
                    concrets</p>


                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-8 h-8 text-purple-600 mr-3"/>
                    <h3 className="text-lg font-semibold text-gray-900">Lancement d'entreprise</h3>
                  </div>

                  <p className="text-gray-600 flex-grow">Fournir des ressources et des conseils pour le lancement d'une
                    entreprise</p>


                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-purple-600 mr-3"/>
                    <h3 className="text-lg font-semibold text-gray-900">Réseau d'experts</h3>
                  </div>

                  <p className="text-gray-600 flex-grow">Favoriser les échanges avec des experts et entrepreneurs
                    expérimentés</p>


                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cercle de réflexion et empowerment */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cercle de réflexion et empowerment</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Le centre organise des cercles de discussion et d'échange
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-purple-600 mr-3"/>
                    <h3 className="text-lg font-semibold text-gray-900">Inclusion & Diversité</h3>
                  </div>

                  <p className="text-gray-600 flex-grow">Promouvoir l'inclusion, la diversité et l'estime de soi</p>

                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <Award className="w-8 h-8 text-purple-600 mr-3"/>
                    <h3 className="text-lg font-semibold text-gray-900">Développement personnel</h3>
                  </div>

                  <p className="text-gray-600 flex-grow">Encourager le développement personnel et la confiance en ses
                    capacités</p>


                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-8 h-8 text-purple-600 mr-3"/>
                    <h3 className="text-lg font-semibold text-gray-900">Espace de dialogue</h3>
                  </div>

                  <p className="text-gray-600 flex-grow">Offrir un espace de dialogue pour partager des expériences et
                    des idées</p>


                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        <section className="py-12 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Notre entité en photos</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photos.map((num, index) => (
                  <div
                      key={num}
                      className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                      onClick={() => setSelectedPhotoIndex(index)}
                  >
                    <img
                        src={`/images/Centre de Carrière/${num}.jpg`}
                        alt={`Photo ${num}`}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
              ))}
            </div>

            {/* Lightbox / Modale fullscreen */}
            {selectedPhotoIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
                  {/* Image */}
                  <img
                      src={`/images/Centre de Carrière/${photos[selectedPhotoIndex]}.jpg`}
                      alt={`Photo ${photos[selectedPhotoIndex]}`}
                      className="max-w-full max-h-full object-contain rounded-md"
                  />

                  {/* Bouton fermer */}
                  <button
                      onClick={() => setSelectedPhotoIndex(null)}
                      className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
                      aria-label="Fermer la modale"
                  >
                    <X size={32}/>
                  </button>

                  {/* Flèche gauche */}
                  <button
                      onClick={goPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-80"
                      aria-label="Photo précédente"
                  >
                    <ChevronLeft size={32}/>
                  </button>

                  {/* Flèche droite */}
                  <button
                      onClick={goNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-80"
                      aria-label="Photo suivante"
                  >
                    <ChevronRight size={32}/>
                  </button>
                </div>
            )}
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

        {/* Footer Centre de Carrière - Variante Horizontale */}
        <section className="py-20 bg-gradient-to-br from-purple-700 to-purple-800 text-white">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Carte Responsable */}
            <div className="flex items-center space-x-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-300 shadow">
                <img
                    src="/images/Centre de Carrière/ramla.jpg"
                    alt="Ramla Ben Ouirane"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div
                    className="w-full h-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg"
                    style={{display: 'none'}}
                >
                  RB
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Ramla Ben Ouirane</h3>
                <p className="text-sm text-purple-100">Responsable du Centre de Carrière</p>
                <p className="text-xs text-purple-300">Campus ESPRIT</p>
              </div>
            </div>

            {/* Coordonnées */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-200"/>
                <span className="text-sm">+216 70 250 200</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-200"/>
                <span className="text-sm">Career.Center@Esprit.tn</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-200"/>
                <span className="text-sm">Bureau Centre de Carrière, Campus ESPRIT</span>
              </div>
              <div className="text-xs text-purple-300 mt-4">Lundi à Vendredi — 8h30 à 17h00</div>
            </div>

          </div>
        </section>


      </div>
  );
}
