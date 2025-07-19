import React from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Heart, Phone, Mail, Clock, Shield, Users, ArrowLeft, MapPin } from 'lucide-react';

export default function CelluleEcoutePage() {
  const services = [
    {
      titre: "Écoute Psychologique",
      description: "Soutien individuel avec des psychologues professionnels",
      icon: Heart,
      disponibilite: "Lun-Ven 8h-17h"
    },
    {
      titre: "Orientation Académique",
      description: "Conseil et accompagnement dans vos choix d'études",
      icon: Users,
      disponibilite: "Sur rendez-vous"
    },
    {
      titre: "Gestion du Stress",
      description: "Techniques de relaxation et gestion de l'anxiété",
      icon: Shield,
      disponibilite: "Ateliers hebdomadaires"
    }
  ];

  const equipe = [
    {
      nom: "Dr. Amina Belgacem",
      poste: "Psychologue Clinicienne",
      specialite: "Psychologie des adolescents et jeunes adultes",
      experience: "8 ans d'expérience",
      disponibilite: "Lundi, Mercredi, Vendredi"
    },
    {
      nom: "Dr. Karim Hamdi",
      poste: "Conseiller d'Orientation",
      specialite: "Orientation académique et professionnelle",
      experience: "5 ans d'expérience",
      disponibilite: "Mardi, Jeudi"
    },
    {
      nom: "Sarah Trabelsi",
      poste: "Assistante Sociale",
      specialite: "Accompagnement social et familial",
      experience: "6 ans d'expérience",
      disponibilite: "Lundi à Vendredi"
    }
  ];

  const horaires = [
    { jour: "Lundi", heures: "8h00 - 17h00", type: "Consultation libre" },
    { jour: "Mardi", heures: "8h00 - 17h00", type: "Sur rendez-vous" },
    { jour: "Mercredi", heures: "8h00 - 17h00", type: "Consultation libre" },
    { jour: "Jeudi", heures: "8h00 - 17h00", type: "Ateliers de groupe" },
    { jour: "Vendredi", heures: "8h00 - 16h00", type: "Consultation libre" }
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
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <img src="/images/logo.png" alt="ESPRIT" className="h-10 w-auto" />
              <span className="text-xl font-bold text-blue-600">Cellule d'Écoute</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cellule d'Écoute
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Un espace bienveillant pour votre bien-être psychologique et votre épanouissement personnel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                <Phone className="w-4 h-4 mr-2" />
                Urgence 24h/24
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                <Mail className="w-4 h-4 mr-2" />
                Prendre RDV
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
              Accompagnement personnalisé et confidentiel pour votre bien-être
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{service.titre}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-center text-sm text-blue-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.disponibilite}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Confidentialité Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Confidentialité Garantie</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tous nos entretiens sont strictement confidentiels et respectent le secret professionnel
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Nos Engagements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    Écoute sans jugement
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    Confidentialité absolue
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    Respect de votre rythme
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    Accompagnement personnalisé
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Quand Nous Consulter ?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    Stress et anxiété
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    Difficultés relationnelles
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    Problèmes familiaux
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                    Orientation académique
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Équipe Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-xl text-gray-600">
              Des professionnels qualifiés à votre écoute
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {equipe.map((membre, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {membre.nom.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{membre.nom}</h3>
                  <p className="text-blue-600 font-medium mb-2">{membre.poste}</p>
                  <p className="text-sm text-gray-600 mb-2">{membre.specialite}</p>
                  <p className="text-sm text-gray-500 mb-2">{membre.experience}</p>
                  <div className="text-xs text-blue-600">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {membre.disponibilite}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Horaires d'Ouverture</h2>
            <p className="text-xl text-gray-600">
              Nous sommes là pour vous accompagner
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {horaires.map((horaire, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900 w-20">{horaire.jour}</span>
                      <span className="text-gray-600 ml-4">{horaire.heures}</span>
                    </div>
                    <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {horaire.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Contactez-Nous</h2>
            <p className="text-xl mb-8">
              N'hésitez pas à nous contacter, nous sommes là pour vous aider
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Urgence 24h/24</p>
                <p>+216 70 250 000</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Email</p>
                <p>ecoute@esprit.tn</p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Localisation</p>
                <p>Bâtiment A, 1er étage</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
