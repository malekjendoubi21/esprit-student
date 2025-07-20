import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Users, Calendar, Award, Code, Music, Camera, Cpu, Globe, ArrowLeft, Search, Filter, X, Target, Trophy, BookOpen, Facebook } from 'lucide-react';

export default function ClubsPage() {
  const [filtreCategorie, setFiltreCategorie] = useState('Tous');
  const [recherche, setRecherche] = useState('');
  const [clubModal, setClubModal] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const clubs = [
    {
      nom: "ESPRIT Club ACM",
      categorie: "Informatique",
      description: "Club dédié à l'informatique théorique et pratique, programming contests et recherche",
      membres: 45,
      president: "Dridi Chaher",
      email: "esprit-club-acm@esprit.tn",
      fondation: "2015",
      activites: ["Programming Contest", "Workshops", "Conférences Tech"],
      prochainEvent: "ACM Programming Contest - 15 Mars 2025",
      facebook: "https://www.facebook.com/acm.esprit",
      detailsComplets: {
        nomComplet: "ACM Esprit Student Chapter",
        presentation: "Le club ACM Esprit Student Chapter est une antenne étudiante officielle de l'Association for Computing Machinery (ACM), la plus grande société scientifique dédiée à l'informatique dans le monde. Notre club se spécialise dans la programmation compétitive, avec des workshops hebdomadaires de problem solving qui permettent aux étudiants d'améliorer leurs compétences en algorithmique. En parallèle, nous proposons régulièrement des ateliers techniques sur des sujets variés tels que l'intelligence artificielle, le développement web, l'utilisation de Git, ou encore le framework Symfony.",
        objectifs: [
          "Approfondir les compétences des étudiants en algorithmique et en développement",
          "Préparer les membres aux compétitions nationales et internationales",
          "Créer un environnement dynamique d'échange et d'apprentissage"
        ],
        activitesDetaillees: [
          "Workshops hebdomadaires de Problem Solving, couvrant différents sujets liés à la programmation compétitive",
          "Série de workshops autour de l'intelligence artificielle (IA)",
          "Formations ponctuelles sur des outils pratiques comme Git, Symfony, etc.",
          "Organisation de compétitions, comme Solve It 2.0, dont la deuxième édition s'est tenue cette année",
          "Participation active à des événements inter-facultés et à des compétitions telles que IEEEXtreme et TCPC"
        ],
        focusCompetition: "Nous préparons activement nos membres au TCPC (Tunisian Collegiate Programming Contest). Une bonne performance à cette compétition peut permettre aux étudiants de représenter la Tunisie à l'international, notamment en Égypte pour la phase régionale.",
        valeurs: [
          "Esprit de challenge",
          "Apprentissage continu", 
          "Partage des connaissances",
          "Ouverture et entraide"
        ],
        images: [
          "/images/club/acm/acm1.jpg",
          "/images/club/acm/acm2.jpg",
          "/images/club/acm/acm3.jpg"
        ]
      }
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
      <header className="bg-white shadow-sm border-b relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-green-600 hover:bg-green-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-green-600">Clubs Étudiants</span>
            </div>
            <Button 
              onClick={() => setShowContactCard(!showContactCard)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Award className="w-4 h-4 mr-2" />
              Créer un Club
            </Button>
          </div>
        </div>

        {/* Contact Card */}
        {showContactCard && (
          <div className="absolute top-full right-4 z-50 mt-2" ref={contactCardRef}>
            <div className="bg-white rounded-lg shadow-xl border p-6 w-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact pour créer un club</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowContactCard(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-green-200">
                  <img
                    src="/images/club/tasnim-ghorbel.jpg"
                    alt="Tasnim Ghorbel"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg" style={{display: 'none'}}>
                    TG
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Tasnim Ghorbel</h4>
                  <p className="text-gray-600 text-sm">Responsable des clubs</p>
                  <p className="text-gray-600 text-sm">Comité des étudiants</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-lg mr-2">📞</span>
                  <span className="text-gray-700 font-medium">90 011 892</span>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-lg mr-2">✉️</span>
                  <span className="text-gray-700 text-sm">Ghorbel.Tasnim@esprit.tn</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Contactez-la pour créer votre propre club étudiant
                </p>
              </div>
            </div>
          </div>



        )}
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
                  size="sm"
                  onClick={() => setFiltreCategorie(categorie)}
                  className={filtreCategorie === categorie ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'}
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
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                        {club.nom === "ESPRIT Club ACM" ? (
                          <img 
                            src="/images/club/acm/logo.jpg" 
                            alt="ACM Logo"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <span className={`text-white font-bold text-sm ${club.nom === "ESPRIT Club ACM" ? 'hidden' : ''}`}>
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
                    {club.facebook ? (
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => window.open(club.facebook, '_blank')}
                      >
                        <Facebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                    ) : (
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <Users className="w-4 h-4 mr-2" />
                        Rejoindre
                      </Button>
                    )}
                    <Button 
                      className="flex-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-white border"
                      onClick={() => {
                        if (club.detailsComplets) {
                          setClubModal(club);
                        }
                      }}
                    >
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Envie de Créer Votre Club ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Vous avez une passion à partager ? Créez votre propre club et rassemblez une communauté autour de vos intérêts !
            </p>
          
          </div>
          
          {/* Contact Section */}
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Pour créer votre club, contactez :</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white">
                <img 
                  src="/images/club/tasnim-ghorbel.jpg" 
                  alt="Tasnim Ghorbel"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-white/20 flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                  TG
                </div>
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">Tasnim Ghorbel</h4>
                <p className="text-white/90 text-sm">Responsable des clubs</p>
                <p className="text-white/90 text-sm">Comité des étudiants</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 space-y-2">
              <p className="text-lg font-semibold">📞 90 011 892</p>
              <p className="text-sm">✉️ Ghorbel.Tasnim@esprit.tn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal des détails du club */}
      {clubModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          {/* Test de chargement d'image invisible */}
          <img 
            src="/images/club/acm/coveracm.jpg" 
            alt="" 
            style={{ display: 'none' }}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              console.log('Erreur: Image coveracm.jpg non trouvée');
              setImageLoaded(false);
            }}
          />
          
          {/* Background conditionnel */}
          <div
            className="absolute inset-0"
            style={{
              background: imageLoaded 
                ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/club/acm/coveracm.jpg') center/cover no-repeat`
                : 'linear-gradient(135deg, #059669 0%, #047857 100%)'
            }}
          ></div>
          
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl">
            {/* Header du modal */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{clubModal.detailsComplets.nomComplet}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setClubModal(null)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Contenu du modal */}
            <div className="p-6">
              {/* Images du club */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {clubModal.detailsComplets.images.map((image, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${clubModal.nom} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center text-white font-bold text-lg overflow-hidden" style={{display: 'none'}}>
                      <img 
                        src="/images/club/acm/logo.jpg" 
                        alt="ACM Logo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <span style={{display: 'none'}}>ACM</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Présentation */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                  Présentation du Club
                </h3>
                <p className="text-gray-600 leading-relaxed">{clubModal.detailsComplets.presentation}</p>
              </div>

              {/* Objectifs */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Objectifs
                </h3>
                <ul className="space-y-2">
                  {clubModal.detailsComplets.objectifs.map((objectif, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {objectif}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activités détaillées */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-green-600" />
                  Activités Principales
                </h3>
                <ul className="space-y-2">
                  {clubModal.detailsComplets.activitesDetaillees.map((activite, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {activite}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Focus Compétition */}
              <div className="mb-6 bg-green-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-green-800 flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Focus Compétition
                </h3>
                <p className="text-green-700">{clubModal.detailsComplets.focusCompetition}</p>
              </div>

              {/* Valeurs */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-600" />
                  Nos Valeurs
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {clubModal.detailsComplets.valeurs.map((valeur, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-lg text-center">
                      <span className="text-gray-700 font-medium">{valeur}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t">
                {clubModal.facebook ? (
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open(clubModal.facebook, '_blank')}
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Suivre sur Facebook
                  </Button>
                ) : (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Rejoindre le Club
                  </Button>
                )}
                <Button className="flex-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-white border">
                  Contacter : {clubModal.email}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
