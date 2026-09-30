import { Link, useParams } from 'react-router-dom'
import { LeagueSections } from '../components/LeagueSections'
import { leagueData } from '../data'

export function LeaguePage() {
  const { leagueSlug } = useParams()
  const league = Object.values(leagueData).find((item) => item.slug === leagueSlug)
  if (!league) return <section className="empty-page"><p className="eyebrow">Coverage unavailable</p><h1>That league was not found.</h1><Link className="primary-button" to="/">Return home</Link></section>
  return <section className="league-page"><div className={`league-banner ${league.tone}`}><Link className="back-link" to="/leagues/ncaa-d1">← All leagues</Link><p className="eyebrow">MVP league coverage</p><h1>{league.name}</h1><p>{league.detail}. Explore scores, schedules, standings, and attributed news links.</p></div><LeagueSections league={league} /><p className="source-note">Placeholder data for {league.name}. Sources and freshness will be connected during the data integration phase.</p></section>
}
