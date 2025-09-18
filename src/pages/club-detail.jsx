import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, Calendar, Award, Facebook, ArrowLeft, MapPin, 
  Mail, Phone, Globe, Target, Trophy, Clock, Eye,
  Instagram, Linkedin, Twitter, Youtube, ExternalLink, X
} from 'lucide-react';
import { clubService, eventService } from '../services/api.js';

export default function ClubDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('club');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Fonction pour rendre le lightbox modal
  const renderLightbox = () => {
    if (!lightboxOpen || !club || !club.images || club.images.length === 0) {
      return null;
    }
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <button 
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors z-10"
          onClick={() => setLightboxOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors"
          onClick={() => setCurrentImage((prev) => (prev === 0 ? club.images.length - 1 : prev - 1))}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-colors"
          onClick={() => setCurrentImage((prev) => (prev === club.images.length - 1 ? 0 : prev + 1))}
        >
          <ArrowLeft className="w-6 h-6 transform rotate-180" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={club.images[currentImage]}
            alt={`${club.nom} - Image ${currentImage + 1}`}
            className="max-h-[85vh] max-w-[85vw] object-contain"
            style={{ display: 'block' }}
            onError={(e) => {
              console.error('❌ Erreur de chargement image dans lightbox:', club.images[currentImage]);
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+non+disponible';
            }}
          />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full text-white text-sm">
            {currentImage + 1} / {club.images.length}
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour valider les URLs d'images
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    // Vérifier si c'est une URL HTTP valide
    if (url.startsWith('http://') || url.startsWith('https://')) return true;
    // Vérifier si c'est une base64 complète et valide
    if (url.startsWith('data:image/') && url.length > 100) return true;
    return false;
  };

  useEffect(() => {
    loadClubDetails();
  }, [id]);

  const loadClubDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Charger les détails du club
      const clubData = await clubService.getClubById(id);
      console.log('Club data received:', clubData);
      const clubInfo = clubData?.data || clubData;
      console.log('Images disponibles:', {
        imageCouverture: clubInfo?.imageCouverture,
        detailsComplets_imageCouverture: clubInfo?.detailsComplets?.imageCouverture,
        images: clubInfo?.images,
        logo: clubInfo?.logo,
        detailsComplets_logo: clubInfo?.detailsComplets?.logo
      });
      
      // Filtrer les URLs d'images valides
      if (clubInfo?.imageCouverture && !isValidImageUrl(clubInfo.imageCouverture)) {
        console.warn('Image de couverture invalide:', clubInfo.imageCouverture.substring(0, 100));
        delete clubInfo.imageCouverture;
      }
      
      // Filtrer les images du tableau
      if (clubInfo?.images) {
        clubInfo.images = clubInfo.images.filter(img => isValidImageUrl(img));
        console.log('Images filtrées:', clubInfo.images.length, 'images valides');
      }
      
      setClub(clubInfo);
      
      // Charger les événements récents du club
      const eventsData = await eventService.getClubEvents(id, { limit: 5 });
      console.log('Events data received:', eventsData);
      const eventsList = eventsData?.data?.events || eventsData?.events || [];
      setEvents(eventsList);
      
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setError('Erreur lors du chargement des détails du club');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des détails du club...</p>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600">{error || 'Club non trouvé'}</p>
            <Button 
              onClick={() => navigate('/clubs')}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
              Retour aux clubs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Lightbox Modal */}
      {renderLightbox()}
      
      {/* Header avec image de couverture */}
      <div className="relative h-64 bg-gradient-to-r from-green-500 to-green-700 overflow-hidden">
        {(club.imageCouverture || club.detailsComplets?.imageCouverture || club.images?.[0]) && (
          <img 
            src={club.imageCouverture || club.detailsComplets?.imageCouverture || club.images?.[0]} 
            alt={`${club.nom} Cover`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
            onError={(e) => {
              console.error('❌ Erreur de chargement image couverture:', e.target.src);
              e.target.style.display = 'none';
            }}
            onLoad={(e) => {
              console.log('✅ Image de couverture chargée avec succès');
            }}
          />
        )}
        
        {/* Overlay pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        
        {/* Bouton retour */}
        <Button
          onClick={() => navigate('/clubs')}
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        {/* Informations principales */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-4 overflow-hidden shadow-lg">
                {(club.logo || club.detailsComplets?.logo || club.images?.[0]) ? (
                  <img 
                    src={club.logo || club.detailsComplets?.logo || club.images?.[0]} 
                    alt={`${club.nom} Logo`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span className={`text-green-600 font-bold text-lg ${(club.logo || club.detailsComplets?.logo || club.images?.[0]) ? 'hidden' : ''}`}>
                  {club.nom?.split(' ')[0]?.substring(0, 2) || 'CL'}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{club.nom}</h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {club.categorie || 'Non définie'}
                  </span>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {club.membres || club.nombreMembres || 0} membres
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Fondé en {club.fondation ? new Date(club.fondation).getFullYear() : club.dateCreation ? new Date(club.dateCreation).getFullYear() : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions rapides */}
            <div className="flex space-x-2">
              {club.reseauxSociaux?.facebook && (
                <Button 
                  onClick={() => window.open(club.reseauxSociaux.facebook, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              )}
              <Button className="bg-white text-green-600 hover:bg-gray-100">
                <Mail className="w-4 h-4 mr-2" />
                Contacter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Clubs/Événements */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('club')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'club'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Informations du Club
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'events'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Événements ({events.length})
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'club' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {club.description || 'Aucune description disponible.'}
                  </p>
                </CardContent>
              </Card>

              {/* Galerie d'images */}
              {club.images && club.images.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Galerie ({club.images.length} image{club.images.length > 1 ? 's' : ''})
                    </h2>
                   
                    <div className={`grid gap-4 ${
                      club.images.length === 1 ? 'grid-cols-1' : 
                      club.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {club.images.map((image, index) => (
                        <div 
                          key={index}
                          className="relative bg-gray-50 rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => {
                            setCurrentImage(index);
                            setLightboxOpen(true);
                          }}
                        >
                          <img
                            key={`gallery-img-${index}`}
                            src={image}
                            alt={`${club.nom} - Image ${index + 1}`}
                            className="rounded-lg hover:scale-105 transition-transform"
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '300px',
                              objectFit: 'contain',
                              display: 'block'
                            }}
                            onError={(e) => {
                              console.error('❌ Erreur de chargement image:', image);
                              e.target.src = 'https://via.placeholder.com/400x300?text=Image+non+disponible';
                            }}
                          />
                          
                          {/* Numéro de l'image */}
                          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            {index + 1}/{club.images.length}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3 text-center">
                      Cliquez sur une image pour l'agrandir
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Objectifs */}
              {(club.detailsComplets?.objectifs || club.objectifs) && (club.detailsComplets?.objectifs || club.objectifs).length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos objectifs</h2>
                    <ul className="space-y-3">
                      {(club.detailsComplets?.objectifs || club.objectifs).map((objectif, index) => (
                        <li key={index} className="flex items-start">
                          <Target className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{objectif}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Activités */}
              {club.activites && club.activites.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Activités principales</h2>
                    <div className="flex flex-wrap gap-2">
                      {club.activites.map((activite, index) => (
                        <span 
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {activite}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Activités détaillées */}
              {club.detailsComplets?.activitesDetaillees && club.detailsComplets.activitesDetaillees.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos activités</h2>
                    <div className="space-y-4">
                      {club.detailsComplets.activitesDetaillees.map((activite, index) => (
                        <div key={index} className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <Calendar className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{activite.nom || activite.titre || activite}</h3>
                              {(typeof activite === 'object' && activite.description) && (
                                <p className="text-sm text-gray-600 mt-1">{activite.description}</p>
                              )}
                              {(typeof activite === 'object' && activite.frequence) && (
                                <span className="text-xs text-blue-600 font-medium">
                                  {activite.frequence}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Présentation détaillée */}
              {club.detailsComplets?.presentation && club.detailsComplets.presentation !== club.description && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Présentation détaillée</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {club.detailsComplets.presentation}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Réalisations */}
              {(club.detailsComplets?.realisations || club.realisations) && (club.detailsComplets?.realisations || club.realisations).length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos réalisations</h2>
                    <div className="space-y-4">
                      {(club.detailsComplets?.realisations || club.realisations).map((realisation, index) => (
                        <div key={index} className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <Trophy className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{realisation.titre}</h3>
                              <p className="text-sm text-gray-600 mt-1">{realisation.description}</p>
                              {realisation.annee && (
                                <span className="text-xs text-green-600 font-medium">
                                  {realisation.annee}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Valeurs */}
              {(club.detailsComplets?.valeurs) && club.detailsComplets.valeurs.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos valeurs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {club.detailsComplets.valeurs.map((valeur, index) => (
                        <div key={index} className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                            </div>
                            <span className="font-medium text-gray-900">{valeur}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Bénéfices */}
              {(club.detailsComplets?.benefices) && club.detailsComplets.benefices.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Pourquoi nous rejoindre ?</h2>
                    <div className="space-y-3">
                      {club.detailsComplets.benefices.map((benefice, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-orange-600 text-xs">✓</span>
                          </div>
                          <span className="text-gray-600">{benefice}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informations de contact */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Award className="w-4 h-4 text-gray-500 mr-3" />
                      <div>
                        <span className="text-gray-500">Président:</span>
                        <p className="font-medium">
                          {typeof club.president === 'string' 
                            ? club.president 
                            : club.president 
                              ? `${club.president.nom || ''} ${club.president.prenom || ''}`.trim()
                              : 'N/A'
                          }
                        </p>
                      </div>
                    </div>
                    
                    {(club.contact?.email || club.email) && (
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 text-gray-500 mr-3" />
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <p className="font-medium">{club.contact?.email || club.email}</p>
                        </div>
                      </div>
                    )}
                    
                    {(club.contact?.telephone || club.president?.telephone) && (
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 text-gray-500 mr-3" />
                        <div>
                          <span className="text-gray-500">Téléphone:</span>
                          <p className="font-medium">{club.contact?.telephone || club.president?.telephone}</p>
                        </div>
                      </div>
                    )}
                    
                    {(club.detailsComplets?.localisation || club.contact?.adresse) && (
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 text-gray-500 mr-3" />
                        <div>
                          <span className="text-gray-500">Localisation:</span>
                          <p className="font-medium">{club.detailsComplets?.localisation || club.contact?.adresse}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
                  <div className="space-y-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {club.membres || club.nombreMembres || 0}
                      </div>
                      <div className="text-sm text-gray-600">Membres</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {club.stats?.nombreEvents || events.length || 0}
                      </div>
                      <div className="text-sm text-gray-600">Événements récents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rejoindre le club */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rejoindre le club</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Intéressé par nos activités ? Rejoignez-nous !
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Devenir membre
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Onglet Événements */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Événements récents ({events.length})
              </h2>
              <Button 
                onClick={() => navigate('/events')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Voir tous les événements
              </Button>
            </div>

            {!Array.isArray(events) || events.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucun événement récent</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(events) && events.map((event, index) => (
                  <Card key={event._id || index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {event.typeEvent || 'Événement'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {event.dateDebut ? new Date(event.dateDebut).toLocaleDateString() : 'Date TBD'}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">{event.titre}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-xs text-gray-500">
                        {event.lieu && (
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.lieu}
                          </div>
                        )}
                        {event.duree && (
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {event.duree}
                          </div>
                        )}
                        {event.nombreParticipants && (
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {event.nombreParticipants} participants
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-white border"
                        onClick={() => navigate(`/event/${event._id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir détails
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer Club */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            
            {/* Contact et Email */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Contactez-nous</h3>
              {(club.contact?.email || club.email) && (
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <Mail className="w-5 h-5 mr-2" />
                  <a 
                    href={`mailto:${club.contact?.email || club.email}`}
                    className="hover:text-green-200 transition-colors"
                  >
                    {club.contact?.email || club.email}
                  </a>
                </div>
              )}
              {(club.contact?.telephone || club.president?.telephone) && (
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{club.contact?.telephone || club.president?.telephone}</span>
                </div>
              )}
            </div>

            {/* Réseaux Sociaux */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
              <div className="flex justify-center space-x-4">
                {club.reseauxSociaux?.facebook && (
                  <a
                    href={club.reseauxSociaux.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all transform hover:scale-110"
                    title="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {club.reseauxSociaux?.instagram && (
                  <a
                    href={club.reseauxSociaux.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all transform hover:scale-110"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {club.reseauxSociaux?.linkedin && (
                  <a
                    href={club.reseauxSociaux.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all transform hover:scale-110"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {club.reseauxSociaux?.twitter && (
                  <a
                    href={club.reseauxSociaux.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all transform hover:scale-110"
                    title="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {club.reseauxSociaux?.youtube && (
                  <a
                    href={club.reseauxSociaux.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all transform hover:scale-110"
                    title="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
              </div>
              
              {/* Message si aucun réseau social */}
              {!club.reseauxSociaux?.facebook && !club.reseauxSociaux?.instagram && 
               !club.reseauxSociaux?.linkedin && !club.reseauxSociaux?.twitter && 
               !club.reseauxSociaux?.youtube && (
                <p className="text-green-200 text-sm">Réseaux sociaux à venir...</p>
              )}
            </div>

            {/* Bouton Rejoindre */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-4">Rejoignez-nous !</h3>
              {club.lienRecrutement ? (
                <a
                  href={club.lienRecrutement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors transform hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Rejoignez-nous
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              ) : (
                <div className="space-y-2">
                  <Button 
                    className="bg-white text-green-700 hover:bg-green-50 font-semibold px-6 py-3"
                    onClick={() => window.location.href = `mailto:${club.contact?.email || club.email}?subject=Candidature pour rejoindre ${club.nom}`}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contactez-nous
                  </Button>
                  <p className="text-green-200 text-sm">
                    Envoyez-nous un email pour plus d'informations
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Ligne de séparation et info */}
          <div className="mt-8 pt-6 border-t border-green-400 border-opacity-30 text-center">
            <p className="text-green-200 text-sm">
              © {new Date().getFullYear()} {club.nom} - École Supérieure Privée d'Ingénierie et de Technologies ESPRIT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}