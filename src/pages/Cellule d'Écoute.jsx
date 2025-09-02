import React, {useEffect, useRef, useState} from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import {Heart, Phone, Mail, Clock, Shield, Users, ArrowLeft, MapPin, Award, X} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function CelluleEcoutePage() {
  const [showContactCard, setShowContactCard] = useState(false);
  const contactCardRef = useRef(null);
  const navigate = useNavigate();
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
      <header className="relative bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
                variant="ghost"
                onClick={() => navigate('/home')}
                className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-blue-600">Cellule d'Écoute</span>
            </div>
            <Button
                onClick={() => setShowContactCard(!showContactCard)}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            >
              <Award className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>
        {/* Contact Card */}
        {showContactCard && (
            <div className="absolute top-full right-4 z-50 mt-2" ref={contactCardRef}>
              <div className="bg-white rounded-lg shadow-xl border p-6 w-96">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Notre Équipe</h3>
                  <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowContactCard(false)}
                      className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4"/>
                  </Button>
                </div>

                {/* Zied SAIDI */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200">
                    <img
                        src="/images/cellule/ziedsaidi.PNG"
                        alt="Zied SAIDI"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div
                        className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg"
                        style={{display: 'none'}}>
                      ZS
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Zied SAIDI</h4>
                    <p className="text-sm text-blue-600">Cellule d'écoute</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Mail className="w-4 h-4 mr-1"/> zied.saidi@esprit.tn
                    </p>
                  </div>
                </div>

                {/* Safa BEN HAMMOU */}
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200">
                    <img
                        src="/images/cellule/safa-benhammou.PNG"
                        alt="Safa BEN HAMMOU"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div
                        className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg"
                        style={{display: 'none'}}>
                      SB
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Safa BEN HAMMOU</h4>
                    <p className="text-sm text-blue-600">Psychologue</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Mail className="w-4 h-4 mr-1"/> safa.benhammou@esprit.tn
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Une équipe dédiée à votre bien-être à l’écoute des étudiants
                  </p>
                </div>
              </div>

            </div>


        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white"/>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Espace d'Écoute et d'Orientation
            </h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Un espace confidentiel pour soutenir et orienter les étudiants. C'est un lieu où vous pouvez parler de vos
              doutes, de vos problèmes et trouver une orientation dans différents domaines (scolarité, stress/anxiété,
              tristesse, mal-être, etc.)
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                <Phone className="w-4 h-4 mr-2"/>
                +216 92 234 330
              </Button>
              <Button variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                <Mail className="w-4 h-4 mr-2"/>
                Cellule.decoute@esprit.tn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Approche</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              La priorité est donnée au soutien de la parole et à l'écoute, ainsi qu'à l'initiation d'une réflexion
              personnelle,
              afin d'élaborer avec l'étudiant des réponses adaptées à chaque situation.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              À ce titre, et si nécessaire, des orientations vers différents partenaires peuvent être proposées,
              en facilitant et en accompagnant l'étudiant dans cette démarche.
            </p>
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Missions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six missions principales pour votre accompagnement et votre bien-être
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                numero: "1",
                titre: "Liens avec les Alumni",
                description: "Maintenir des liens forts entre les anciens étudiants et l'école",
                icon: Users
              },
              {
                numero: "2", 
                titre: "Gestion des Réclamations",
                description: "Recevoir les réclamations concernant les cours, la logistique et l'environnement scolaire",
                icon: Mail
              },
              {
                numero: "3",
                titre: "Relation avec les Délégués",
                description: "Être en relation avec les délégués de classes",
                icon: Users
              },
              {
                numero: "4",
                titre: "Conseils et Orientations",
                description: "Fournir des conseils et orientations aux étudiants",
                icon: Heart
              },
              {
                numero: "5",
                titre: "Orientation Spécialisée",
                description: "Orientation vers un praticien si nécessaire",
                icon: Shield
              },
              {
                numero: "6",
                titre: "Mesures Préventives",
                description: "Proposer des mesures préventives",
                icon: Shield
              }
            ].map((mission, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                      {mission.numero}
                    </div>
                    <mission.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{mission.titre}</h3>
                  <p className="text-gray-600">{mission.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cadre de Fonctionnement Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cadre de Fonctionnement</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un fonctionnement basé sur l'adhésion volontaire et la confidentialité
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Demande de Rendez-vous</h3>
                <p className="text-gray-600 mb-4">
                  Les étudiants en difficulté peuvent solliciter, par téléphone ou par mail, un rendez-vous avec la cellule d'écoute 
                  en indiquant leurs coordonnées téléphoniques. Ils seront contactés et reçus dès que possible.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium">00216 92 234 330</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium">Cellule.decoute@esprit.tn</span>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <span className="font-medium">Cellule d'écoute, RDC, Bloc A, ESPRIT El Ghazela</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Adhésion Volontaire</h3>
                <p className="text-gray-600 mb-4">
                  La cellule d'écoute fonctionne sur la base de l'adhésion volontaire des étudiants : 
                  cette démarche doit rester libre et volontaire.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Principe Fondamental</h4>
                  <p className="text-blue-700 text-sm">
                    Aucune obligation, aucune contrainte. Votre démarche vers nous doit être personnelle et motivée 
                    par votre propre volonté d'être accompagné.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Engagements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Engagements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des garanties strictes pour votre confidentialité et votre accompagnement
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Engagement des Membres</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Les informations et documents de la cellule sont réservés à ses membres
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Aucune information ne figure dans le dossier médical ou administratif de l'étudiant
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Devoir de confidentialité absolue pour chaque membre
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Engagement à ne pas diffuser d'informations, pendant et après le traitement
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Engagement de l'Institution</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Moyens techniques et organisationnels pour l'optimisation des actions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Respect des plannings nécessaires au bon fonctionnement
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Support institutionnel complet pour les membres de la cellule
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Garantie de conditions optimales d'exercice
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Principes Déontologiques Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Principes Déontologiques</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des principes éthiques rigoureux pour garantir la qualité de notre accompagnement
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Confidentialité et Secret Médical</h3>
                <p className="text-gray-600 mb-3">
                  La confidentialité est essentielle pour l'efficacité du travail au sein de la cellule. 
                  Elle concerne tous les membres de la cellule.
                </p>
                <p className="text-gray-600 text-sm">
                  Les membres s'engagent à partager les informations uniquement avec les membres de la cellule, 
                  lors des réunions d'analyse ou de travail restreint visant à trouver des solutions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Engagement Transparent</h3>
                <p className="text-gray-600">
                  Tous nos engagements sont clairement définis et communiqués. 
                  La transparence dans notre approche garantit une relation de confiance avec les étudiants.
                </p>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Spécificité de la Demande</h3>
                <p className="text-gray-600">
                  Les membres de la cellule doivent se concentrer uniquement sur le domaine et la situation 
                  liés à la demande, en respectant les limites de leur intervention.
                </p>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Collaboration avec des Spécialistes</h3>
                <p className="text-gray-600">
                  Si besoin, des orientations vers différents partenaires peuvent être soutenues 
                  en facilitant et en accompagnant l'étudiant dans cette démarche.
                </p>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Distanciation dans la Recherche de Solutions</h3>
                <p className="text-gray-600">
                  Les membres de la cellule s'engagent à améliorer globalement une situation difficile, 
                  sans imposer une solution unique, en offrant une véritable aide à la personne concernée. 
                  L'étudiant reste acteur de ses choix et de son parcours.
                </p>
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
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Zied SAIDI */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/images/cellule/ziedsaidi.PNG" 
                    alt="Zied SAIDI"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                    ZS
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Zied SAIDI</h3>
                <p className="text-blue-600 font-medium mb-4">Cellule d'écoute</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>zied.saidi@esprit.tn</span>
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Spécialité:</strong> Écoute et orientation des étudiants
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Safa BEN HAMMOU */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/images/cellule/safa-benhammou.PNG" 
                    alt="Safa BEN HAMMOU"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{display: 'none'}}>
                    SB
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Safa BEN HAMMOU</h3>
                <p className="text-blue-600 font-medium mb-4">Psychologue</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>Safa.benhammou@esprit.tn</span>
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Spécialité:</strong> Accompagnement psychologique et soutien étudiant
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Contactez la Cellule d'Écoute</h2>
            <p className="text-xl mb-8">
              N'hésitez pas à nous contacter, nous sommes là pour vous accompagner dans la confidentialité
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Téléphone</p>
                <p>00216 92 234 330</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Email</p>
                <p>Cellule.decoute@esprit.tn</p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Localisation</p>
                <p>RDC, Bloc A, ESPRIT El Ghazela</p>
              </div>
            </div>
            
            <div className="mt-12 bg-blue-700 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Rappel Important</h3>
              <p className="text-blue-100">
                La cellule d'écoute fonctionne sur la base de l'adhésion volontaire des étudiants. 
                Votre démarche doit rester libre et volontaire. Toutes nos interventions sont strictement confidentielles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
