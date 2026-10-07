import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HomePage } from '../pages/HomePage'
import { PreferencesPage } from '../pages/PreferencesPage'
import { ProfileTeaching } from '../components/ProfileTeaching'
import { LeagueSections } from '../components/LeagueSections'
import { leagueData } from '../data'
import { officialSources } from '../officialSources'

function renderWithRouter(element: React.ReactElement) {
  return render(<MemoryRouter>{element}</MemoryRouter>)
}

describe('frontend components', () => {
  it('validates onboarding selections before saving', () => {
    renderWithRouter(<PreferencesPage />)
    fireEvent.click(screen.getByRole('button', { name: /save my preferences/i }))
    expect(screen.getByRole('alert')).toHaveTextContent('Choose a profile and select at least one league.')
  })

  it('renders profile-specific teaching content and omits it for Super Fan', () => {
    const { unmount } = render(<ProfileTeaching profile="Beginner Fan" />)
    expect(screen.getByText('Scoring')).toBeInTheDocument()
    expect(screen.getByText(/A rally gives one point/)).toBeInTheDocument()
    unmount()
    render(<ProfileTeaching profile="Super Fan" />)
    expect(screen.queryByText('A quick guide to the game.')).not.toBeInTheDocument()
  })

  it('orders homepage cards to selected leagues only', async () => {
    localStorage.setItem('volleycentral-preferences', JSON.stringify({ profile: 'Casual Fan', leagues: ['LOVB', 'MLV'] }))
    renderWithRouter(<HomePage />)
    await waitFor(() => expect(screen.getAllByRole('link', { name: /LOVB/ }).length).toBeGreaterThan(0))
    expect(screen.getByText('LOVB')).toBeInTheDocument()
    expect(screen.getByText('MLV')).toBeInTheDocument()
    expect(screen.queryByText('NCAA D1')).not.toBeInTheDocument()
  })

  it('renders official news and source links with secure new-tab attributes', () => {
    renderWithRouter(<LeagueSections league={leagueData['NCAA D1']} />)
    const links = screen.getAllByRole('link')
    const officialSource = officialSources['ncaa-d1'][0]
    expect(links.some((link) => link.getAttribute('href') === officialSource.url && link.getAttribute('target') === '_blank' && link.getAttribute('rel') === 'noopener noreferrer')).toBe(true)
    expect(links.filter((link) => link.getAttribute('target') === '_blank').length).toBeGreaterThan(0)
  })
})
