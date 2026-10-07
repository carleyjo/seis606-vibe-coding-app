import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LeagueSections } from '../components/LeagueSections'
import { leagueData } from '../data'
import { sampleDataAdapter } from '../dataAdapter'
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
  return <section className="league-page"><div className={`league-banner ${league.tone}`}><Link className="back-link" to="/leagues/ncaa-d1">← All leagues</Link><p className="eyebrow">MVP league coverage</p><h1>{league.name}</h1><p>{league.detail}. Explore scores, schedules, standings, and attributed news links.</p></div><LeagueSections league={league} /><p className="source-note">Sample data for {league.name}. Sources and freshness will be connected during the data integration phase.</p></section>
}
