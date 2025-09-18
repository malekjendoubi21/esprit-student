import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Users, Calendar, Award, Facebook, Filter, X } from 'lucide-react';

// Import des services API
import { clubService } from '../services/api.js';

export default function ClubsPage() {
  const navigate = useNavigate();
  const [filtreCategorie, setFiltreCategorie] = useState('Tous');
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger les clubs depuis l'API
  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await clubService.getClubs();
      console.log('Clubs chargés:', data);
      // L'API retourne { data: { clubs: [...] } }
      const clubsList = data?.data?.clubs || data?.clubs || [];
      setClubs(clubsList);
    } catch (err) {
      console.error('Erreur lors du chargement des clubs:', err);
      setError('Erreur lors du chargement des clubs. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Obtenir les catégories uniques
  const categories = ['Tous', ...new Set(clubs.map(club => club.categorie).filter(Boolean))];

  // Filtrer les clubs
  const clubsFiltres = filtreCategorie === 'Tous' 
    ? clubs 
    : clubs.filter(club => club.categorie === filtreCategorie);

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec navigation */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Clubs Étudiants ESPRIT
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Rejoignez une communauté passionnée et développez vos compétences
            </p>
            
            {/* Navigation Clubs/Événements */}
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 text-lg font-medium"
                onClick={() => navigate('/clubs')}
              >
                Clubs
              </Button>
              <Button 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-6 py-3 text-lg font-medium"
                onClick={() => navigate('/events')}
              >
                Événements
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((categorie) => (
              <Button
                key={categorie}
                onClick={() => setFiltreCategorie(categorie)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filtreCategorie === categorie
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {categorie}
              </Button>
            ))}
            {filtreCategorie !== 'Tous' && (
              <Button
                onClick={() => setFiltreCategorie('Tous')}
                className="px-3 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-full text-sm"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {loading ? 'Chargement...' : `${clubsFiltres.length} Club${clubsFiltres.length > 1 ? 's' : ''}`}
              {filtreCategorie !== 'Tous' && ` - ${filtreCategorie}`}
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les clubs qui correspondent à vos intérêts
            </p>
          </div>

          {/* Messages d'état */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des clubs...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600">{error}</p>
                <Button 
                  onClick={loadClubs}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                >
                  Réessayer
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && clubsFiltres.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-gray-600">Aucun club trouvé avec ces critères.</p>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubsFiltres.map((club, index) => (
                <Card key={club._id || index} className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mr-3 overflow-hidden">
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
                          <span className={`text-white font-bold text-sm ${(club.logo || club.detailsComplets?.logo || club.images?.[0]) ? 'hidden' : ''}`}>
                            {club.nom?.split(' ')[0]?.substring(0, 2) || 'CL'}
                          </span>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {club.categorie || 'Non définie'}
                        </span>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {club.membres || club.nombreMembres || 0}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{club.nom}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{club.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Award className="w-3 h-3 mr-2" />
                        <span>Président: {
                          typeof club.president === 'string' 
                            ? club.president 
                            : club.president 
                              ? `${club.president.nom || ''} ${club.president.prenom || ''}`.trim()
                              : 'N/A'
                        }</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-2" />
                        <span>Fondé en {club.fondation ? new Date(club.fondation).getFullYear() : club.dateCreation ? new Date(club.dateCreation).getFullYear() : 'N/A'}</span>
                      </div>
                    </div>

                    {club.activites && club.activites.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Activités principales:</h4>
                        <div className="flex flex-wrap gap-1">
                          {club.activites.slice(0, 3).map((activite, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {activite}
                            </span>
                          ))}
                          {club.activites.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              +{club.activites.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 mt-auto">
                      {club.reseauxSociaux?.facebook ? (
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => window.open(club.reseauxSociaux.facebook, '_blank')}
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
                        onClick={() => navigate(`/club/${club._id}`)}
                      >
                        En savoir plus
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}