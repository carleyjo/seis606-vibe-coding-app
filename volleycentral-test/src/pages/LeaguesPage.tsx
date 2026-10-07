import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { leaguePath } from '../data'
import { sampleDataAdapter } from '../dataAdapter'
import { getVisibleLeagues, readPreferences } from '../lib/preferences'
import type { LeagueData } from '../types'

export function LeaguesPage() {
  const preferences = readPreferences()
  const [leagues, setLeagues] = useState<LeagueData[]>([])
  useEffect(() => { sampleDataAdapter.getLeagues().then(setLeagues) }, [])
  const orderedLeagues = getVisibleLeagues(leagues, preferences)
  return <section className="leagues-index"><div className="section-heading"><div><p className="eyebrow">MVP coverage</p><h1>Choose your<br /><em>league.</em></h1></div><p>Explore sample scores, schedules, standings, news, and official sources for every supported competition.</p></div><div className="league-index-grid">{orderedLeagues.map((league) => <Link className={`league-index-card ${league.tone} ${preferences?.leagues.includes(league.name) ? 'is-preferred' : ''}`} to={leaguePath(league.name)} key={league.name}><span className="card-number">{league.name}</span>{preferences?.leagues.includes(league.name) && <span className="your-league">Your league</span>}<h2>{league.name}</h2><p>{league.detail}</p><span className="card-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
}
