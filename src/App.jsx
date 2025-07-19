import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Comite from './pages/Comité des Étudiants'
import CelluleEcoute from './pages/Cellule d\'Écoute'
import Clubs from './pages/clubs'
import Sport from './pages/Salle de Sport + Piscine'
import CentreCarriere from './pages/Centre de Carrière'
import Restaurant from './pages/Restaurant + Foyer'
import AssociationSportive from './pages/Association Sportive'
import International from './pages/Service des Internationaux'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/comite" element={<Comite />} />
      <Route path="/cellule-ecoute" element={<CelluleEcoute />} />
      <Route path="/clubs" element={<Clubs />} />
      <Route path="/sport" element={<Sport />} />
      <Route path="/centre-carriere" element={<CentreCarriere />} />
      <Route path="/restaurant" element={<Restaurant />} />
      <Route path="/association-sportive" element={<AssociationSportive />} />
      <Route path="/international" element={<International />} />
    </Routes>
  )
}

export default App
