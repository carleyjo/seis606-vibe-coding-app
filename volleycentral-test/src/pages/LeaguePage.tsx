import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LeagueSections } from '../components/LeagueSections'
import { leagueData, leaguePath } from '../data'
import { sampleDataAdapter } from '../dataAdapter'
import { getVisibleLeagues, readPreferences } from '../lib/preferences'
import type { LeagueData, LeagueName } from '../types'

export function LeaguePage() {
  const { leagueSlug } = useParams()
  const leagueName = Object.values(leagueData).find((item) => item.slug === leagueSlug)?.name as LeagueName | undefined
  const [league, setLeague] = useState<LeagueData | null>(null)
  useEffect(() => {
    let active = true
    if (leagueName) sampleDataAdapter.getLeague(leagueName).then((data) => { if (active) setLeague(data) })
    return () => { active = false }
  }, [leagueName])
  if (!leagueName) return <section className="empty-page"><p className="eyebrow">Coverage unavailable</p><h1>That league was not found.</h1><Link className="primary-button" to="/">Return home</Link></section>
  if (!league) return <section className="empty-page"><p className="eyebrow">Sample data</p><h1>Loading coverage...</h1></section>
  const preferences = readPreferences()
  const visibleLeagues = getVisibleLeagues(Object.values(leagueData), preferences)
  const switcherLeagues = visibleLeagues.some((item) => item.name === league.name) ? visibleLeagues : [...visibleLeagues, league]
  const notPreferred = Boolean(preferences && !preferences.leagues.includes(league.name))
  return <section className="league-page"><div className={`league-banner ${league.tone}`}><Link className="back-link" to="/leagues">← All leagues</Link><p className="eyebrow">MVP league coverage</p><h1>{league.name}</h1><p>{league.detail}. Explore scores, schedules, standings, and attributed news links.</p></div>{notPreferred && <p className="preference-note">Not in your preferences. <Link to="/preferences">Update preferences</Link></p>}<nav className="league-switcher" aria-label="League navigation">{switcherLeagues.map((item) => item.name === league.name ? <span aria-current="page" key={item.name}>{item.name}</span> : <Link to={leaguePath(item.name)} key={item.name}>{item.name}</Link>)}</nav><LeagueSections league={league} /><p className="source-note">Sample data for {league.name}. Sources and freshness will be connected during the data integration phase.</p></section>
}
