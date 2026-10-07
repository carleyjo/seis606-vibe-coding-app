export type LeagueId = 'ncaa-d1' | 'ncaa-d2' | 'ncaa-d3' | 'lovb' | 'mlv'

export type OfficialSource = {
  label: string
  url: string
  description: string
}

export const officialSources: Record<LeagueId, OfficialSource[]> = {
  'ncaa-d1': [{ label: 'Official NCAA Division I scores', url: 'https://www.ncaa.com/scoreboard/volleyball-women/d1', description: 'Official NCAA Division I scores, standings, and news.' }],
  'ncaa-d2': [{ label: 'Official NCAA Division II scores', url: 'https://www.ncaa.com/scoreboard/volleyball-women/d2', description: 'Official NCAA Division II scores, standings, and news.' }],
  'ncaa-d3': [{ label: 'Official NCAA Division III scores', url: 'https://www.ncaa.com/scoreboard/volleyball-women/d3', description: 'Official NCAA Division III scores, standings, and news.' }],
  lovb: [{ label: 'Official LOVB scores', url: 'https://www.lovb.com/pro-league', description: 'Official LOVB professional league scores, standings, and news.' }],
  mlv: [{ label: 'Official MLV scores', url: 'https://provolleyball.com/', description: 'Official MLV scores, standings, and news.' }],
}

export const rulesSources: Record<LeagueId, OfficialSource> = {
  'ncaa-d1': { label: 'NCAA rules', url: 'https://www.ncaa.org/championships/playing-rules/womens-volleyball-playing-rules/', description: 'Official NCAA women\'s volleyball playing rules.' },
  'ncaa-d2': { label: 'NCAA rules', url: 'https://www.ncaa.org/championships/playing-rules/womens-volleyball-playing-rules/', description: 'Official NCAA women\'s volleyball playing rules.' },
  'ncaa-d3': { label: 'NCAA rules', url: 'https://www.ncaa.org/championships/playing-rules/womens-volleyball-playing-rules/', description: 'Official NCAA women\'s volleyball playing rules.' },
  lovb: { label: 'LOVB rules', url: 'https://www.lovb.com/pro-101', description: 'LOVB rules overview.' },
  mlv: { label: 'MLV rules', url: 'https://provolleyball.com/statistics-guide', description: 'MLV statistics and rules guide.' },
}
