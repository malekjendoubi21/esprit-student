import React from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import {Utensils, Coffee, Clock, Star, Users, Calendar, ArrowLeft, MapPin, Phone, ChefHat, Award} from 'lucide-react';

export default function RestaurantPage() {
  const menuJour = [
    {
      categorie: "Entrées",
      plats: [
        { nom: "Salade Tunisienne", prix: "4 TND", description: "Tomates, concombres, olives, thon" },
        { nom: "Chorba Frik", prix: "3 TND", description: "Soupe traditionnelle aux légumes" },
        { nom: "Brik à l'œuf", prix: "2.5 TND", description: "Brik croustillant garni d'œuf et thon" }
      ]
    },
    {
      categorie: "Plats Principaux",
      plats: [
        { nom: "Couscous Tfaya", prix: "12 TND", description: "Couscous aux légumes et viande" },
        { nom: "Grillades Mixtes", prix: "15 TND", description: "Agneau, merguez, kafta avec frites" },
        { nom: "Poisson Grillé", prix: "18 TND", description: "Poisson du jour avec riz et salade" },
        { nom: "Pâtes Bolognaise", prix: "8 TND", description: "Pâtes fraîches sauce bolognaise" }
      ]
    },
    {
      categorie: "Desserts",
      plats: [
        { nom: "Makroudh", prix: "3 TND", description: "Pâtisserie aux dattes et semoule" },
        { nom: "Baklawa", prix: "4 TND", description: "Feuilletés aux pistaches et miel" },
        { nom: "Mousse au Chocolat", prix: "5 TND", description: "Dessert léger au chocolat noir" }
      ]
    }
  ];

  const horairesService = [
    { service: "Petit-déjeuner", heures: "7h00 - 10h00", lieu: "Cafétéria" },
    { service: "Déjeuner", heures: "11h30 - 15h00", lieu: "Restaurant principal" },
    { service: "Goûter", heures: "15h00 - 17h00", lieu: "Foyer étudiant" },
    { service: "Dîner", heures: "18h00 - 21h00", lieu: "Restaurant principal" }
  ];

  const espacesDisponibles = [
    {
      nom: "Restaurant Principal",
      capacite: "300 places",
      description: "Service de restauration chaude avec menu varié",
      caracteristiques: ["Climatisé", "WiFi gratuit", "Télévision", "Terrasse"],
      horaires: "11h30 - 15h00 & 18h00 - 21h00"
    },
    {
      nom: "Cafétéria",
      capacite: "150 places",
      description: "Snacks, boissons chaudes et petits-déjeuners",
      caracteristiques: ["Service continu", "Viennoiseries", "Café", "Jus frais"],
      horaires: "7h00 - 17h00"
    },
    {
      nom: "Foyer Étudiant",
      capacite: "200 places",
      description: "Espace de détente avec distributeurs et micro-ondes",
      caracteristiques: ["Micro-ondes", "Distributeurs", "Jeux", "Espace repos"],
      horaires: "6h00 - 22h00"
    },
    {
      nom: "Terrasse Extérieure",
      capacite: "80 places",
      description: "Espace en plein air pour les beaux jours",
      caracteristiques: ["Vue panoramique", "Parasols", "Mobilier confortable", "Ambiance détendue"],
      horaires: "8h00 - 20h00"
    }
  ];

  const formules = [
    {
      nom: "Formule Étudiante",
      prix: "8 TND",
      description: "Entrée + Plat + Dessert + Boisson",
      details: ["Choix parmi 3 entrées", "Choix parmi 4 plats", "Dessert du jour", "Boisson au choix"],
      populaire: true
    },
    {
      nom: "Formule Express",
      prix: "6 TND",
      description: "Plat + Boisson",
      details: ["Plat du jour", "Boisson au choix", "Service rapide", "Idéal entre les cours"],
      populaire: false
    },
    {
      nom: "Formule Gourmande",
      prix: "12 TND",
      description: "Menu complet avec spécialités",
      details: ["Entrée raffinée", "Plat signature", "Dessert maison", "Boisson premium"],
      populaire: false
    }
  ];

  const evenements = [
    {
      titre: "Soirée Iftar Ramadan",
      date: "Mars 2025",
      description: "Iftar collectif avec menu spécial ramadan",
      type: "Événement religieux"
    },
    {
      titre: "Semaine Gastronomique Internationale",
      date: "Avril 2025",
      description: "Découverte des cuisines du monde",
      type: "Gastronomie"
    },
    {
      titre: "Barbecue d'Été",
      date: "Mai 2025",
      description: "Grillades en plein air sur la terrasse",
      type: "Convivialité"
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
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-red-600">Restaurant & Foyer</span>
            </div>
            <Button
                className="bg-gradient-to-r from-red-500 to-red-700 text-white"
            >
              <Award className="w-4 h-4 mr-2"/>
              Contacter
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section
      <section className="bg-gradient-to-r from-red-500 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Utensils className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Restaurant & Foyer
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Savourez une cuisine variée et de qualité dans un cadre convivial et moderne
            </p>

          </div>
        </div>
      </section>
      */}
      {/* Carte moderne après Hero Section */}
      <section className="py-20 bg-gray-50 flex justify-center">
        <div className="max-w-4xl w-full bg-gradient-to-r from-red-400 via-red-300 to-red-400
                  rounded-3xl shadow-2xl p-12 flex flex-col items-center text-center
                  transform hover:scale-105 transition-transform duration-300">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-6 text-red-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-4xl font-extrabold text-red-800 mb-4">
            Page en cours de développement
          </h2>
          <p className="text-lg text-red-900 max-w-3xl">
            Nous travaillons activement pour vous offrir une expérience exceptionnelle. Merci de votre patience !
          </p>
        </div>
      </section>

      {/* Menu du Jour Section
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Menu du Jour</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection quotidienne de plats frais et savoureux
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {menuJour.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-red-600 mb-4 text-center">
                    {section.categorie}
                  </h3>
                  <div className="space-y-4">
                    {section.plats.map((plat, platIndex) => (
                      <div key={platIndex} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-900">{plat.nom}</h4>
                          <span className="text-red-600 font-bold">{plat.prix}</span>
                        </div>
                        <p className="text-sm text-gray-600">{plat.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
*/}
      {/* Formules Section
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Formules</h2>
            <p className="text-xl text-gray-600">
              Des formules adaptées à tous les budgets et appétits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {formules.map((formule, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow ${formule.populaire ? 'ring-2 ring-red-500' : ''}`}>
                <CardContent className="p-6 text-center">
                  {formule.populaire && (
                    <div className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full mb-4 inline-block">
                      POPULAIRE
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{formule.nom}</h3>
                  <div className="text-3xl font-bold text-red-600 mb-4">{formule.prix}</div>
                  <p className="text-gray-600 mb-4">{formule.description}</p>
                  <ul className="space-y-2 mb-6">
                    {formule.details.map((detail, i) => (
                      <li key={i} className="text-sm text-gray-500 flex items-center">
                        <Star className="w-3 h-3 text-red-500 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${formule.populaire ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}>
                    Choisir cette formule
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
*/}
      {/* Espaces Section
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Espaces</h2>
            <p className="text-xl text-gray-600">
              Différents espaces adaptés à vos besoins
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {espacesDisponibles.map((espace, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{espace.nom}</h3>
                    <span className="text-sm text-red-600 font-medium">{espace.capacite}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{espace.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{espace.horaires}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Caractéristiques:</h4>
                    <div className="flex flex-wrap gap-1">
                      {espace.caracteristiques.map((carac, i) => (
                        <span key={i} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          {carac}
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
*/}
      {/* Horaires Section
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Horaires de Service</h2>
            <p className="text-xl text-gray-600">
              Nos services sont disponibles tout au long de la journée
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {horairesService.map((horaire, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div>
                      <h3 className="font-semibold text-gray-900">{horaire.service}</h3>
                      <p className="text-sm text-gray-500">{horaire.lieu}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">{horaire.heures}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
*/}
      {/* Événements Section
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Événements Spéciaux</h2>
            <p className="text-xl text-gray-600">
              Participez à nos événements culinaires et convivialité
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {evenements.map((evenement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{evenement.titre}</h3>
                  <p className="text-red-600 font-medium mb-2">{evenement.date}</p>
                  <p className="text-gray-600 mb-4">{evenement.description}</p>
                  <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    {evenement.type}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
*/}
      {/* Services Additionnels Section
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services Additionnels</h2>
            <p className="text-xl text-gray-600">
              Des services pratiques pour votre confort
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Coffee className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Café à Emporter</h3>
                <p className="text-sm text-gray-600">Service rapide pour vos pauses</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Réservation Groupes</h3>
                <p className="text-sm text-gray-600">Pour vos événements étudiants</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Service Continu</h3>
                <p className="text-sm text-gray-600">Ouvert de 7h à 21h</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Menus Spéciaux</h3>
                <p className="text-sm text-gray-600">Adaptés aux régimes alimentaires</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
 */}
      {/* Contact Section
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Contactez-Nous</h2>
            <p className="text-xl mb-8">
              Pour vos réservations et informations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Réservations</h3>
              <p>+216 70 250 300</p>
              <p className="text-sm text-red-200">Service 24h/24</p>
            </div>
            
            <div className="text-center">
              <ChefHat className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Chef Cuisinier</h3>
              <p>M. Mahmoud Sfar</p>
              <p className="text-sm text-red-200">15 ans d'expérience</p>
            </div>
            
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Localisation</h3>
              <p>Bâtiment C, RDC</p>
              <p className="text-sm text-red-200">Accès direct depuis la cour</p>
            </div>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}
