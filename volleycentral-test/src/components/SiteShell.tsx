import { NavLink, Outlet } from 'react-router-dom'
import volleyballLogo from '../assets/Volleyball-PNG-Image.png'

export function SiteShell() {
  return <><nav className="site-nav" aria-label="Main navigation"><NavLink className="wordmark" to="/" aria-label="VolleyCentral home"><span className="wordmark-mark">V</span>VolleyCentral</NavLink><div className="nav-links"><NavLink to="/" end>Home</NavLink><NavLink to="/leagues">Leagues</NavLink><NavLink to="/preferences">Preferences</NavLink></div></nav><main><Outlet /></main><footer id="about"><span>VolleyCentral © 2026</span><span>Made for the love of the game.</span><span>Instagram (coming soon)</span></footer></>
}

export function HeroArt() {
  return <div className="hero-art" aria-label="Graphic illustration of a volleyball over a court"><div className="art-label">EST. 2026<br /><span>ALL SET</span></div><img className="volleyball-logo" src={volleyballLogo} alt="Volleyball" /><div className="court-lines"><i /><i /><i /><i /></div><div className="hero-stamp">VC<br /><small>SPORTS MEDIA</small></div></div>
}
