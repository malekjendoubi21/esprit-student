import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { ChevronRight, Calendar, Users, MapPin, Phone, Mail, Award, X, Menu, ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showContactCard, setShowContactCard] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  
  const integrationPhotos = [
    { id: 1, title: "Cérémonie d'Ouverture", description: "Accueil des nouveaux étudiants" },
    { id: 2, title: "Activités de Team Building", description: "Jeux et défis en équipe" },
    { id: 3, title: "Présentation des Clubs", description: "Découverte des clubs étudiants" },
    { id: 4, title: "Soirée de Gala", description: "Événement de clôture festif" },
    { id: 5, title: "Moments de Convivialité", description: "Échanges entre étudiants" }
  ];

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-16 w-full max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/images/logo.png" alt="ESPRIT" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <h2 clasName="text-xm text-gray-500 -mt-1"></h2>
              </div>
            </div>

            {/* Right Side: Navigation + Actions */}
            <div className="flex items-center space-x-8">
              {/* Desktop Navigation */}
<nav className="hidden lg:flex items-center space-x-6">
  <a href="#comite" className="relative group py-2 text-gray-700 hover:text-red-400 transition-colors duration-200 font-medium">
    Comité
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
  </a>
  <a href="#ecoute" className="relative group py-2 text-gray-700 hover:text-red-400 transition-colors duration-200 font-medium">
    Cellule d'Écoute
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
  </a>
  <a href="#clubs" className="relative group py-2 text-gray-700 hover:text-red-400 transition-colors duration-200 font-medium">
    Clubs
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
  </a>
  <a href="#sport" className="relative group py-2 text-gray-700 hover:text-red-400 transition-colors duration-200 font-medium">
    Sport
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
  </a>
  <a href="#carriere" className="relative group py-2 text-gray-700 hover:text-red-400 transition-colors duration-200 font-medium">
    Carrière
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
  </a>
  <a href="#restaurant" className="relative group py-2 text-gray-700 hover:text-red-400 transition-colors duration-200 font-medium">
    Restaurant
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
  </a>
</nav>



              {/* Actions */}
              <div className="flex items-center space-x-4">
                {/* Contact Info (Desktop only) */}
              

                {/* Contact Button */}
                <Button
                  onClick={() => setShowContactCard(!showContactCard)}
                  className="bg-[#E30613] hover:bg-[#c00010] text-white px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Contact</span>
                  
                </Button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                  aria-label="Menu"
                >
                  <Menu className={`w-6 h-6 text-[#E30613] transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        {showContactCard && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 mt-2" ref={contactCardRef}>
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 w-96 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Contactez-nous</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowContactCard(false)}
                  className="text-gray-400 hover:text-gray-600 rounded-full h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Mohamed Aziz Grissa */}
                <div className="bg-gradient-to-r from-red-50 to-red-100/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E30613]/30 shadow-sm">
                      <img
                        src="/images/mohamed-aziz-grissa.jpg"
                        alt="Mohamed Aziz Grissa"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-[#E30613] flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                        MAG
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#E30613] text-sm">Mohamed Aziz Grissa</h4>
                      <p className="text-xs text-gray-600">Président Comité des étudiants</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-3 h-3 mr-2 text-[#E30613]" />
                      +216 23 781 138
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-3 h-3 mr-2 text-[#E30613]" />
                      mohamedaziz.grissa@esprit.tn
                    </div>
                  </div>
                </div>
                
                {/* Malek Jendoubi */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-sm">
                      <img
                        src="/images/malek-jendoubi.jpg"
                        alt="Malek Jendoubi"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                        MJ
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-600 text-sm">Malek Jendoubi</h4>
                      <p className="text-xs text-gray-600">Responsable étudiant du comité d'élève</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-3 h-3 mr-2 text-blue-500" />
                      +216 96 794 608
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-3 h-3 mr-2 text-blue-500" />
                      malek.jendoubi@esprit.tn
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  N'hésitez pas à nous contacter pour toute question ou suggestion
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a href="#comite" className="block py-3 px-4 text-gray-700 hover:text-[#E30613] hover:bg-red-50 rounded-lg transition-all duration-200 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Comité des Étudiants
              </a>
              <a href="#ecoute" className="block py-3 px-4 text-gray-700 hover:text-[#E30613] hover:bg-red-50 rounded-lg transition-all duration-200 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Cellule d'Écoute
              </a>
              <a href="#clubs" className="block py-3 px-4 text-gray-700 hover:text-[#E30613] hover:bg-red-50 rounded-lg transition-all duration-200 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Clubs
              </a>
              <a href="#sport" className="block py-3 px-4 text-gray-700 hover:text-[#E30613] hover:bg-red-50 rounded-lg transition-all duration-200 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Sport & Piscine
              </a>
              <a href="#carriere" className="block py-3 px-4 text-gray-700 hover:text-[#E30613] hover:bg-red-50 rounded-lg transition-all duration-200 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Centre de Carrière
              </a>
              <a href="#restaurant" className="block py-3 px-4 text-gray-700 hover:text-[#E30613] hover:bg-red-50 rounded-lg transition-all duration-200 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Restaurant
              </a>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>(+216) 70 250 000</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>Comite.deseleves@Esprit.tn</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative text-white overflow-hidden min-h-screen flex items-center" style={{backgroundImage: "url('/images/home.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative w-full px-6 py-20">
          <div className="w-full max-w-4xl mx-auto text-center">
           
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Votre
              <span className="block text-white">Vie Étudiante</span>
              <span className="block text-3xl md:text-4xl font-normal">à ESPRIT</span>
            </h1>
            
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Découvrez tous les services, clubs et opportunités qui vous accompagnent dans votre parcours académique et personnel.
            </p>
          </div>
        </div>
      </section>      {/* Quick Access Cards */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-[#E30613]">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-[#E30613] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Comité des Étudiants</h3>
                <p className="text-gray-600 text-sm">Votre représentation étudiante</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Cellule d'Écoute</h3>
                <p className="text-gray-600 text-sm">Soutien psychologique</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Clubs Étudiants</h3>
                <p className="text-gray-600 text-sm">22 clubs actifs</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Centre de Carrière</h3>
                <p className="text-gray-600 text-sm">Accompagnement professionnel</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mois d'Intégration Photos */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-6">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-700 mb-4">
              Mois d'Intégration <span className="text-[#E30613]">2024</span>
            </h2>
            <p className="text-xl text-gray-600">
              Revivez les moments forts de l'intégration de l'année passée
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Photos d'intégration */}
            {integrationPhotos.map((photo) => (
              <div key={photo.id} className="relative group cursor-pointer" onClick={() => openPhotoModal(photo)}>
                <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
                  <img 
                    src={`/images/Mois d'Intégration 2024/${photo.id}.jpg`} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-${1500000000000 + photo.id * 100000}/800x600?q=80`;
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-[#E30613]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-lg font-bold mb-1">Voir en grand</p>
                    <p className="text-sm opacity-90">{photo.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal pour voir les photos en grand */}
          {selectedPhoto && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closePhotoModal}>
              <div className="relative max-w-4xl max-h-full">
                <button 
                  onClick={closePhotoModal}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <X className="w-8 h-8" />
                </button>
                
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src={`/images/Mois d'Intégration 2024/${selectedPhoto.id}.jpg`} 
                    alt={selectedPhoto.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-${1500000000000 + selectedPhoto.id * 100000}/1200x800?q=80`;
                    }}
                  />
                  
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedPhoto.title}</h3>
                    <p className="text-gray-600 mb-4">{selectedPhoto.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Mois d'Intégration 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="w-full px-6">
          <div className="text-center mb-16 max-w-5xl mx-auto">
            <div className="inline-block bg-gradient-to-r from-[#E30613] to-[#c00010] text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              ✨ Découvrez nos services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Nos <span className="bg-gradient-to-r from-[#E30613] to-[#c00010] bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Une gamme complète de services pour accompagner votre parcours étudiant et garantir votre épanouissement à ESPRIT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Comité des Étudiants */}
            <Card id="comite" className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E30613]/5 to-[#c00010]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-[#E30613]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-[#E30613] rounded-full"></div>
              </div>
              <CardContent className="relative p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-[#E30613] to-[#c00010] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#E30613] transition-colors duration-300">
                  Comité des Étudiants
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Votre représentation étudiante pour défendre vos droits et améliorer votre expérience universitaire.
                </p>
                <div className="space-y-3 mb-8 flex-grow">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-[#E30613] rounded-full mr-3"></div>
                    Représentation auprès de l'administration
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-[#E30613] rounded-full mr-3"></div>
                    Organisation d'événements
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-[#E30613] rounded-full mr-3"></div>
                    Gestion des réclamations
                  </div>
                </div>
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#E30613] to-[#c00010] hover:from-[#c00010] hover:to-[#E30613] text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" 
                    onClick={() => window.location.href = '/comite'}
                  >
                    <span className="mr-2">En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cellule d'Écoute */}
            <Card id="ecoute" className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <CardContent className="relative p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
                  Cellule d'Écoute
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Soutien psychologique et accompagnement personnel pour votre bien-être.
                </p>
                <div className="space-y-3 mb-8 flex-grow">
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Consultation psychologique
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Orientation et conseil
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Confidentialité garantie
                  </div>
                </div>
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" 
                    onClick={() => window.location.href = '/cellule-ecoute'}
                  >
                    <span className="mr-2">En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Les Clubs */}
            <Card id="clubs" className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <CardContent className="relative p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-green-500 transition-colors duration-300">
                  Les Clubs
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Plus de 20 clubs actifs pour développer vos passions et compétences.
                </p>
                
                <div className="space-y-2 mb-6 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100 flex-grow">
                  <div className="grid grid-cols-1 gap-2">
                    {["ESPRIT Club ACM", "ESPRIT Club YouRobot", "CLUB IEEE ESPRIT", "ESPRIT Club Radio Libertad", "ESPRIT Club Tunivisions", "Lions ESPRIT"].map((club, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors duration-200">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                        <span className="font-medium">{club}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-800 font-semibold text-sm">22 Clubs Actifs</p>
                      <p className="text-green-600 text-xs">+ de 850 membres</p>
                    </div>
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-bold text-lg">22</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" 
                    onClick={() => window.location.href = '/clubs'}
                  >
                    <span className="mr-2">En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Salle de Sport + Piscine */}
            <Card id="sport" className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <CardContent className="relative p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                  Salle de Sport + Piscine
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Installations sportives modernes pour votre bien-être physique.
                </p>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Salle de musculation équipée</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Piscine olympique</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Terrains multisports</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-800 font-semibold text-sm">Ouvert 7j/7</p>
                      <p className="text-orange-600 text-xs">6h - 22h</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" 
                    onClick={() => window.location.href = '/sport'}
                  >
                    <span className="mr-2">En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Centre de Carrière */}
            <Card id="carriere" className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <CardContent className="relative p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-purple-500 transition-colors duration-300">
                  Centre de Carrière
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Accompagnement personnalisé pour votre insertion professionnelle.
                </p>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Coaching CV et entretiens</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Stages et emplois</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 p-2 rounded-lg hover:bg-purple-50">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Networking professionnel</span>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-800 font-semibold text-sm">95% d'insertion</p>
                      <p className="text-purple-600 text-xs">dans les 6 mois</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" 
                    onClick={() => window.location.href = '/centre-carriere'}
                  >
                    <span className="mr-2">En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Restaurant + Foyer */}
            <Card id="restaurant" className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <CardContent className="relative p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-red-500 transition-colors duration-300">
                  Restaurant + Foyer
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Restauration de qualité et espaces de détente pour les étudiants.
                </p>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Menu varié et équilibré</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Espaces de restauration</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Foyer étudiant convivial</span>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-800 font-semibold text-sm">Service continu</p>
                      <p className="text-red-600 text-xs">7h30 - 17h</p>
                    </div>
                    <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" 
                    onClick={() => window.location.href = '/restaurant'}
                  >
                    <span className="mr-2">En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="w-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Association Sportive */}
            <Card className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <CardContent className="relative p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
                  Association Sportive
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Organisation d'événements sportifs, compétitions inter-écoles et tournois.
                </p>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-200 p-2 rounded-lg hover:bg-yellow-50">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Tournois inter-universitaires</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-200 p-2 rounded-lg hover:bg-yellow-50">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Événements sportifs</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-yellow-600 transition-colors duration-200 p-2 rounded-lg hover:bg-yellow-50">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Compétitions nationales</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-800 font-semibold text-sm">12 Disciplines</p>
                      <p className="text-yellow-600 text-xs">+ de 200 athlètes</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" 
                    onClick={() => window.location.href = '/association-sportive'}
                  >
                    <span className="mr-2">En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Service des Internationaux */}
            <Card id="international" className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              </div>
              <CardContent className="relative p-8 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-indigo-500 transition-colors duration-300">
                  Service des Internationaux
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Accompagnement des étudiants étrangers et programmes d'échange international.
                </p>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-lg hover:bg-indigo-50">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Accueil étudiants étrangers</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-lg hover:bg-indigo-50">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Programmes d'échange</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-lg hover:bg-indigo-50">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="font-medium">Support administratif</span>
                  </div>
                </div>
                
                <div className="bg-indigo-50 rounded-xl p-4 mb-6 border border-indigo-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-800 font-semibold text-sm">35+ Pays</p>
                      <p className="text-indigo-600 text-xs">150+ étudiants</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105" 
                    onClick={() => window.location.href = '/international'}
                  >
                    <span className="mr-2">En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conseil Scientifique + Discipline */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-6">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-700 mb-4">
              Gouvernance <span className="text-[#E30613]">Étudiante</span>
            </h2>
            <p className="text-xl text-gray-600">
              Instances représentatives et disciplinaires
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Conseil Scientifique */}
            <Card className="bg-white shadow-lg h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#E30613] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700">Conseil Scientifique</h3>
                </div>
                
                <p className="text-gray-600 mb-6">Contribue à façonner les politiques et orientations académiques de l'école.</p>
                
                {/* Représentants 2024/2025 */}
                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-semibold text-[#E30613] mb-4">Année 2024/2025</h4>
                  
                  <div className="space-y-3">
                    {/* Malek Jendoubi */}
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-3">
                        <img 
                          src="/images/conseil/malek.jpg" 
                          alt="Malek Jendoubi"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-[#E30613] rounded-full flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                          MJ
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-[#E30613] text-sm">Malek Jendoubi</h5>
                        <p className="text-xs text-gray-500">Représentant Étudiant</p>
                      </div>
                    </div>
                    
                    {/* Soulaima Hleli */}
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-3">
                        <img 
                          src="/images/conseil/soulaima-hleli.jpg" 
                          alt="Soulaima Hleli"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-[#E30613] rounded-full flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                          SH
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-[#E30613] text-sm">Soulaima Hleli</h5>
                        <p className="text-xs text-gray-500">Représentante Étudiante</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Historique 2023/2024 */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Historique 2023/2024</h4>
                    <div className="space-y-3">
                      {/* Isra Zribi */}
                      <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                        <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-3">
                          <img 
                            src="/images/conseil/isra-zribi.jpeg" 
                            alt="Isra Zribi"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                            IZ
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-600 text-sm">Isra Zribi</h5>
                          <p className="text-xs text-gray-500">Représentante Étudiante</p>
                        </div>
                      </div>
                      
                      {/* Tasnim Ghorbel */}
                      <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                        <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-3">
                          <img 
                            src="/images/conseil/tasnim-ghorbel.jpg" 
                            alt="Tasnim Ghorbel"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                            TG
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-600 text-sm">Tasnim Ghorbel</h5>
                          <p className="text-xs text-gray-500">Représentante Étudiante</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-[#E30613]">
                    <p className="text-sm text-blue-800">
                      <strong>Mission:</strong> Représenter les étudiants et contribuer à l'amélioration de la vie étudiante.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conseil de Discipline */}
            <Card className="bg-white shadow-lg h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700">Conseil de Discipline</h3>
                </div>
                
                <p className="text-gray-600 mb-6">Défend les droits des étudiants et veille à l'équité des procédures.</p>
                
                {/* Représentant 2024/2025 */}
                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Année 2024/2025</h4>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-3">
                      <img 
                        src="/images/conseil/malek.jpg" 
                        alt="Malek Jendoubi"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                        MJ
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-700 text-sm">Malek Jendoubi</h5>
                      <p className="text-xs text-gray-500">Représentant Étudiant</p>
                    </div>
                  </div>
                  
                  {/* Historique 2023/2024 */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Historique 2023/2024</h4>
                    
                    <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-3">
                        <img 
                          src="/images/conseil/isra-zribi.jpeg" 
                          alt="Isra Zribi"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                          IZ
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-600 text-sm">Isra Zribi</h5>
                        <p className="text-xs text-gray-500">Représentante Étudiante</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-gray-600">
                    <p className="text-sm text-yellow-800">
                      <strong>Mission:</strong> Défendre les intérêts des étudiants et garantir l'équité des procédures.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Nous Contacter */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full px-6">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nous Contacter</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rencontrez les responsables du comité des étudiants, votre pont vers une meilleure expérience étudiante
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card Mohamed Aziz Grissa - Président */}
            <Card className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E30613]/5 to-[#E30613]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-[#E30613]/20 group-hover:border-[#E30613]/40 transition-colors duration-300">
                    <img 
                      src="/images/mohamed-aziz-grissa.jpg" 
                      alt="Mohamed Aziz Grissa"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-[#E30613] to-[#c00010] flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                      MAG
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#E30613] transition-colors duration-300">
                    Mohamed Aziz Grissa
                  </h3>
                  <div className="inline-block bg-[#E30613]/10 text-[#E30613] px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Président Comité des étudiants
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg group-hover:bg-[#E30613]/5 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-[#E30613] mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">+216 23 781 138</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg group-hover:bg-[#E30613]/5 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-[#E30613] mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">mohamedaziz.grissa@esprit.tn</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    Responsable de la représentation étudiante et de l'amélioration de la vie étudiante à ESPRIT
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card Malek Jendoubi - Responsable étudiant */}
            <Card className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-500/20 group-hover:border-blue-500/40 transition-colors duration-300">
                    <img 
                      src="/images/malek-jendoubi.jpg" 
                      alt="Malek Jendoubi"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                      MJ
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors duration-300">
                    Malek Jendoubi
                  </h3>
                  <div className="inline-block bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Responsable étudiant du comité d'élève
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg group-hover:bg-blue-500/5 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">+216 96 794 608</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg group-hover:bg-blue-500/5 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">malek.jendoubi@esprit.tn</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    Interface entre les étudiants et l'administration, garant de vos droits et de vos besoins
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              N'hésitez pas à nous contacter pour toute question, suggestion ou problème concernant votre vie étudiante
            </p>
          
          </div>
        </div>
      </section>


{/* Footer */}
<footer className="w-full bg-white border-t border-gray-200 shadow-inner text-gray-600">
  <div className="w-full px-6 py-12">

    {/* Grille principale */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start max-w-7xl mx-auto">
      {/* Bloc gauche : Logo + Description */}
      <div>
        <img src="/images/logo.png" alt="ESPRIT" className="h-12 mb-4" />
        <h5 className="uppercase text-xs tracking-widest text-[#E30613] font-semibold">Comité des Étudiants</h5>
        <p className="text-sm mt-2 text-gray-500">
          Le comité des étudiants œuvre pour enrichir votre vie universitaire à ESPRIT.
        </p>
      </div>

      {/* Bloc centre vide pour équilibrer visuellement */}
      <div></div>

      {/* Bloc droite : Contact + Réseaux */}
      <div className="text-right">
        <h4 className="text-base font-semibold text-[#E30613] mb-4">Contact</h4>
        <div className="space-y-2 text-sm text-gray-500">
          <p className="flex justify-end items-center gap-2">
            📧 <span>Comite.deseleves@esprit.tn</span>
          </p>
          <p className="flex justify-end items-center gap-2">
            📍 <span>ESPRIT, Ariana</span>
          </p>
        </div>
        <div className="flex justify-end items-center space-x-4 mt-4 text-[#E30613]">
          <a href="https://www.facebook.com/profile.php?id=61563356062178" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
            <i className="fab fa-facebook text-lg"></i>
          </a>
          <a href="#" className="hover:scale-110 transition-transform">
            <i className="fab fa-twitter text-lg"></i>
          </a>
          <a href="https://www.instagram.com/comite_des_etudiants_esprit" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
            <i className="fab fa-instagram text-lg"></i>
          </a>
        </div>
      </div>
    </div>

    {/* Bottom bar centré */}
    <div className="mt-10 pt-6 border-t border-gray-200 text-sm max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center text-center text-gray-500 space-y-1">
        <p>© {new Date().getFullYear()} Comité des Étudiants ESPRIT. Tous droits réservés.</p>
        <p>
          En partenariat avec{" "}
          <a href="https://www.esprit.tn" className="text-[#E30613] hover:underline" target="_blank" rel="noreferrer">
            ESPRIT
          </a>
        </p>
        <p>
          Développé par <span className="font-medium text-gray-700">Malek Jendoubi</span> &{" "}
          <span className="font-medium text-gray-700">Eya Trabelsi</span> —{" "}
          <span className="italic">TWIN & SIM</span>
        </p>
      </div>
    </div>

  </div>
</footer>





    </div>
  );
}