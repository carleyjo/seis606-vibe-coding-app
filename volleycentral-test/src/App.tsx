import './App.css'
import volleyballLogo from './assets/Volleyball-PNG-Image.png'

const leagues = [
  { name: 'NCAA D1', detail: 'The highest level of college volleyball', number: '01', tone: 'coral' },
  { name: 'NCAA D2', detail: 'Big matchups, bigger stories', number: '02', tone: 'pink' },
  { name: 'NCAA D3', detail: 'The game, played with purpose', number: '03', tone: 'lavender' },
  { name: 'LOVB', detail: 'The next generation of pro', number: '04', tone: 'sun' },
  { name: 'MLV', detail: 'Major League Volleyball', number: '05', tone: 'sky' },
]

function App() {
  return (
    <main>
      <nav className="site-nav" aria-label="Main navigation"><a className="wordmark" href="#top" aria-label="VolleyCentral home"><span className="wordmark-mark">V</span>VolleyCentral</a><div className="nav-links"><a href="#leagues">Leagues</a><a href="#latest">Latest</a><a href="#about">About</a></div><a className="nav-button" href="#leagues">Explore coverage <span aria-hidden="true">↗</span></a></nav>
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><span className="live-dot" /> The pulse of the game</p><h1>Everything<br /><em>Volleyball.</em><br />One Place.</h1><p className="hero-description">Scores, stories, schedules, and the moments that make the sport impossible to ignore.</p><a className="primary-button" href="#leagues">Find your league <span aria-hidden="true">↓</span></a></div><div className="hero-art" aria-label="Graphic illustration of a volleyball over a court"><div className="art-label">EST. 2026<br /><span>ALL SET</span></div><img src={volleyballLogo} alt="Volleyball" /><div className="court-lines"><i /><i /><i /><i /></div><div className="hero-stamp">VC<br /><small>SPORTS MEDIA</small></div></div><div className="scroll-note"><span>Scroll to explore</span><i /></div></section>
      <section className="league-section" id="leagues"><div className="section-heading"><div><p className="eyebrow">Your game, your way</p><h2>Choose your<br /><em>court.</em></h2></div><p>From college rivalries to the newest pro leagues, stay close to every side of volleyball.</p></div><div className="league-grid">{leagues.map((league) => <a className={`league-card ${league.tone}`} href="#latest" key={league.name}><span className="card-number">{league.number}</span><span className="card-arrow" aria-hidden="true">↗</span><span className="card-content"><strong>{league.name}</strong><small>{league.detail}</small></span></a>)}</div></section>
      <section className="latest-section" id="latest"><p className="eyebrow">Inside the lines</p><div className="latest-row"><h2>The latest <em>rally.</em></h2><a href="#top" className="text-link">View all stories <span aria-hidden="true">↗</span></a></div></section><footer id="about"><span>VolleyCentral © 2026</span><span>Made for the love of the game.</span><span>Instagram&nbsp;&nbsp; / &nbsp;&nbsp;X</span></footer>
    </main>
  )
}

export default App
