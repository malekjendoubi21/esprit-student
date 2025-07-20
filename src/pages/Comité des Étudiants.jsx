import React, {useState} from 'react';
import { Button } from "@/components/ui/button.jsx"
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Users, Mail, Phone, Calendar, Target, Award, ArrowLeft,X } from 'lucide-react';
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";

export default function ComitePage() {
  const [selectedImage, setSelectedImage] = useState(null);


  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = [
    "/images/comite/1.jpg",
    "/images/comite/2.jpg",
    "/images/comite/3.jpg",
    "/images/comite/4.jpg",
    "/images/comite/5.jpg",
    "/images/comite/6.jpg"
  ];

  const slides = images.map((src) => ({ src }));





  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="flex items-center text-gray-600 hover:text-[#E30613]"
              >
                <ArrowLeft className="w-4 h-4 mr-2"/>
                Retour
              </Button>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-[#E30613]">Comité des Étudiants</span>
              </div>
              <Button
                  className="bg-gradient-to-r from-[#E30613] to-[#c00010] text-white"
              >
                <Award className="w-4 h-4 mr-2"/>
                Contacter
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#E30613] to-[#c00010] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-6 text-white"/>


              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Comité des Étudiants
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Votre voix, vos droits, votre représentation au sein d'ESPRIT
              </p>
            </div>
          </div>
        </section>

        {/* Définition du Comité Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center"><img
                src="/images/logo.png"
                alt="ESPRIT"
                className="h-20 w-auto mx-auto mb-6"
            />

              <p className="text-lg text-gray-700 leading-relaxed">
                Le comité des étudiants joue un rôle clé en tant que pont entre l’administration et les étudiants,
                en représentant leurs besoins, leurs idées et leurs préoccupations. Composé d’étudiants élus, il
                travaille à promouvoir une vie académique et sociale enrichissante à travers l’organisation
                d’événements culturels, sportifs et éducatifs. Il agit également comme médiateur pour résoudre
                les conflits et propose des initiatives visant à améliorer les conditions d’apprentissage. Grâce
                à sa mission de communication et d’écoute, le comité s’efforce de créer un environnement inclusif
                où chaque étudiant peut s’exprimer et contribuer à la dynamique de l’établissement.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Représenter, défendre et améliorer les conditions de vie étudiante à ESPRIT
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Target className="w-12 h-12 text-[#E30613] mx-auto mb-4"/>
                  <h3 className="text-xl font-semibold mb-3">Représentation</h3>
                  <p className="text-gray-600">
                    Être votre voix auprès de l'administration et défendre vos intérêts dans toutes les instances
                    décisionnelles.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-[#E30613] mx-auto mb-4"/>
                  <h3 className="text-xl font-semibold mb-3">Animation</h3>
                  <p className="text-gray-600">
                    Organiser des événements, activités et projets pour enrichir votre expérience étudiante.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-[#E30613] mx-auto mb-4"/>
                  <h3 className="text-xl font-semibold mb-3">Amélioration</h3>
                  <p className="text-gray-600">
                    Proposer et mettre en œuvre des améliorations concrètes pour la vie étudiante.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>













        {/* Nos Événements Section */}
        <div className="text-center py-8">
          <h1 className="text-xl font-medium text-gray-700 mb-6">
            Voici quelques photos de nos événements cette année 📸
          </h1>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 max-w-6xl mx-auto space-y-4">
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`Photo ${i + 1}`}
                    className="w-full rounded-lg cursor-pointer mb-4 break-inside-avoid hover:scale-105 transition-transform"
                    onClick={() => {
                      setIndex(i);
                      setOpen(true);
                    }}
                />
            ))}
          </div>

          <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={slides}
              index={index}
              on={{view: ({index}) => setIndex(index)}}
          />
        </div>

        {/* Modal plein écran */}
        {selectedImage && (
            <div
                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
            >
              <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X className="w-8 h-8"/>
              </button>

              <div className="max-h-full max-w-full overflow-auto">
                <img
                    src={selectedImage}
                    alt="Événement agrandi"
                    className="mx-auto max-h-[90vh] object-contain"
                />
              </div>
            </div>
        )}

        {/* Membres Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
              <p className="text-xl text-gray-600">
                Découvrez l'organigramme du Comité des Étudiants
              </p>
            </div>

            <div className="flex justify-center">
              <img
                  src="/images/comite/464305367_17933059286940045_4416428624700108406_n.jpg"
                  alt="Organigramme du Comité"
                  className="max-w-full h-auto rounded-lg shadow-lg"
              />
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

        {/* Contact Section */}
        <section className="py-16 bg-[#E30613] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Contactez-Nous</h2>
              <p className="text-xl mb-8">
                Une question, une suggestion, une réclamation ? Nous sommes là pour vous écouter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#E30613] hover:bg-gray-100">
                  <Mail className="w-4 h-4 mr-2"/>
                  Comite.deseleves@esprit.tn
                </Button>
                <Button className="bg-white text-[#E30613] hover:bg-gray-100">
                  <Phone className="w-4 h-4 mr-2"/>
                  (+216) 23 781 138
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
