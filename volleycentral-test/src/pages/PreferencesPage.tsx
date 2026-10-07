import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { readPreferences, savePreferences } from '../lib/preferences'
import { leagueNames, profiles, type LeagueName, type Preferences, type Profile } from '../types'

export function PreferencesPage() {
  const navigate = useNavigate()
  const current = readPreferences()
  const [profile, setProfile] = useState<Profile | ''>(current?.profile ?? '')
  const [selectedLeagues, setSelectedLeagues] = useState<LeagueName[]>(current?.leagues ?? [])
  const [error, setError] = useState('')
  function toggleLeague(league: LeagueName) { setSelectedLeagues((items) => items.includes(league) ? items.filter((item) => item !== league) : [...items, league]) }
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (!profile || selectedLeagues.length === 0) { setError('Choose a profile and select at least one league.'); return }; savePreferences({ profile, leagues: selectedLeagues } as Preferences); navigate('/') }
  return <section className="preferences-page"><div className="preferences-intro"><p className="eyebrow">Personalized User Experience</p><h1>Set your<br /><em>home court.</em></h1><p>Choose your volleyball perspective and the leagues that should lead your homepage.</p></div><form className="preferences-form" onSubmit={submit}><fieldset><legend>Volleyball profile</legend><div className="choice-grid">{profiles.map((item) => <label className={`choice ${profile === item ? 'selected' : ''}`} key={item}><input type="radio" name="profile" value={item} checked={profile === item} onChange={() => setProfile(item)} />{item}</label>)}</div></fieldset><fieldset><legend>Preferred leagues</legend><div className="choice-grid league-choices">{leagueNames.map((item) => <label className={`choice ${selectedLeagues.includes(item) ? 'selected' : ''}`} key={item}><input type="checkbox" checked={selectedLeagues.includes(item)} onChange={() => toggleLeague(item)} />{item}</label>)}</div></fieldset>{error && <p className="form-error" role="alert">{error}</p>}<button className="save-button" type="submit">Save my preferences <span aria-hidden="true">↗</span></button></form></section>
}
