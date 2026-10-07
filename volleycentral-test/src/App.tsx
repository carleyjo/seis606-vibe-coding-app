import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SiteShell } from './components/SiteShell'
import { HomePage } from './pages/HomePage'
import { LeaguePage } from './pages/LeaguePage'
import { LeaguesPage } from './pages/LeaguesPage'
import { PreferencesPage } from './pages/PreferencesPage'

function App() {
  return <BrowserRouter><Routes><Route element={<SiteShell />}><Route path="/" element={<HomePage />} /><Route path="/preferences" element={<PreferencesPage />} /><Route path="/leagues" element={<LeaguesPage />} /><Route path="/leagues/:leagueSlug" element={<LeaguePage />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></BrowserRouter>
}

export default App
