import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Clock, MapPin, Users, Filter, Search, 
  ArrowLeft, Eye, ChevronDown, X 
} from 'lucide-react';
import { clubService, eventService } from '../services/api.js';

export default function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtreType, setFiltreType] = useState('upcoming'); // 'upcoming' ou 'past'
  const [filtreClub, setFiltreClub] = useState('Tous');
  const [recherche, setRecherche] = useState('');
  const [clubs, setClubs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadEvents();
  }, [filtreType]);

  const loadData = async () => {
    try {
      // Charger la liste des clubs pour le filtre
      const clubsData = await clubService.getClubs();
      setClubs(clubsData?.data?.clubs || clubsData?.clubs || []);
      
      // Charger les événements
      await loadEvents();
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setError('Erreur lors du chargement des données');
    }
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {
        type: filtreType === 'upcoming' ? 'upcoming' : 'past',
        limit: 50
      };
      
      console.log('Requesting events with params:', params);
      const eventsData = await eventService.getEvents(params);
      console.log('Events data:', eventsData); // Debug log
      
      // Handle different API response formats
      let eventsArray = [];
      if (eventsData?.data?.events) {
        eventsArray = eventsData.data.events;
      } else if (eventsData?.events) {
        eventsArray = eventsData.events;
      } else if (Array.isArray(eventsData)) {
        eventsArray = eventsData;
      }
      
      console.log(`Processed ${eventsArray.length} events`);
      
      if (eventsArray.length === 0 && !error) {
        console.log('No events found, but no error reported');
      }
      
      setEvents(eventsArray);
      
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
      setError('Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les événements
  const eventsFiltres = events.filter(event => {
    // Check if event has required properties
    if (!event || !event.titre) {
      return false;
    }
    
    // Filtre par recherche
    if (recherche && !event.titre.toLowerCase().includes(recherche.toLowerCase())) {
      return false;
    }
    
    // Filtre par club
    if (filtreClub !== 'Tous') {
      const clubName = typeof event.club === 'string' 
        ? event.club 
        : event.club?.nom || 
          (event.clubId && typeof event.clubId === 'object' ? event.clubId.nom : '');
          
      if (clubName !== filtreClub) {
        return false;
      }
    }
    
    return true;
  });

  // Obtenir les noms des clubs uniques
  const clubNames = ['Tous', ...new Set(
    events.filter(event => event) // Filter out undefined or null events
      .map(event => {
        if (typeof event.club === 'string') 
          return event.club;
        else if (event.club?.nom) 
          return event.club.nom;
        else if (event.clubId && typeof event.clubId === 'object')
          return event.clubId.nom;
        else
          return 'Club inconnu';
      }).filter(Boolean)
  )];

  const formatDate = (dateString) => {
    if (!dateString) return 'Date à définir';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isEventPast = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={() => navigate('/clubs')}
                variant="ghost"
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux clubs
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Événements</h1>
                <p className="text-gray-600 mt-1">
                  Découvrez les événements organisés par les clubs
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un événement..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {recherche && (
                  <button
                    onClick={() => setRecherche('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Bouton filtres */}
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Événements à venir / Passés */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setFiltreType('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                filtreType === 'upcoming'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Événements à venir
            </button>
            <button
              onClick={() => setFiltreType('past')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                filtreType === 'past'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Événements passés
            </button>
          </div>
        </div>
      </div>

      {/* Filtres étendus */}
      {showFilters && (
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Club organisateur
                </label>
                <select
                  value={filtreClub}
                  onChange={(e) => setFiltreClub(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {clubNames.map(club => (
                    <option key={club} value={club}>{club}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">{eventsFiltres.length}</div>
            <div className="text-sm text-gray-600">
              {filtreType === 'upcoming' ? 'Événements à venir' : 'Événements passés'}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">{clubNames.length - 1}</div>
            <div className="text-sm text-gray-600">Clubs organisateurs</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">
              {events.reduce((total, event) => total + (event.nombreParticipants || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Participants total</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(events.map(e => e.type).filter(Boolean)).size}
            </div>
            <div className="text-sm text-gray-600">Types d'événements</div>
          </div>
        </div>

        {/* Messages d'état */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des événements...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
              <Button 
                onClick={loadEvents}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white"
              >
                Réessayer
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && eventsFiltres.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun événement trouvé
            </h3>
            <p className="text-gray-600">
              {filtreType === 'upcoming' 
                ? "Il n'y a pas d'événements à venir pour le moment."
                : "Aucun événement passé ne correspond à vos critères."
              }
            </p>
          </div>
        )}

        {/* Liste des événements */}
        {!loading && !error && eventsFiltres.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsFiltres.map((event, index) => (
              <Card key={event._id || index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isEventPast(event.dateDebut)
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {event.type || 'Événement'}
                      </span>
                      {isEventPast(event.dateDebut) && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Terminé
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.titre}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{formatDate(event.dateDebut)}</span>
                    </div>
                    
                    {event.dateDebut && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{formatTime(event.dateDebut)}</span>
                      </div>
                    )}
                    
                    {event.lieu && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="line-clamp-1">{event.lieu}</span>
                      </div>
                    )}
                    
                    {event.nombreParticipants && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{event.nombreParticipants} participants</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Club organisateur */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-green-600">
                          {typeof event.club === 'string' 
                            ? event.club.substring(0, 2)
                            : event.club?.nom?.substring(0, 2) || 
                              (event.clubId && typeof event.clubId === 'object' 
                                ? event.clubId.nom?.substring(0, 2) || 'CL'
                                : 'CL')
                          }
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {typeof event.club === 'string' 
                          ? event.club 
                          : event.club?.nom || 
                            (event.clubId && typeof event.clubId === 'object' 
                              ? event.clubId.nom || 'Club inconnu'
                              : 'Club inconnu')
                        }
                      </span>
                    </div>
                    
                    <Button 
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                      onClick={() => navigate(`/event/${event._id}`)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}