import type { Profile } from '../types'

type TeachingContent = { title: string; text: string }[]

const teachingByProfile: Partial<Record<Profile, TeachingContent>> = {
  'Beginner Fan': [
    { title: 'Scoring', text: 'A rally gives one point to the team that wins it, whether that team served or received.' },
    { title: 'Rotations', text: 'Teams rotate when they win the right to serve, moving one position around the court.' },
    { title: 'Positions', text: 'Front-row players attack near the net while back-row players defend and help receive serve.' },
    { title: 'The libero', text: 'The libero is a defensive specialist who wears a different color and follows special substitution rules.' },
  ],
  'Youth Athlete': [
    { title: 'Scoring', text: 'Every rally ends with one team earning a point, so every play can change the score.' },
    { title: 'Rotations', text: 'When a team earns the serve, its players rotate to a new spot before the next rally.' },
    { title: 'Positions', text: 'Players work together in front-row attacking spots and back-row passing and defense spots. They include the setter, outside hitter, middle blocker, rightside/opposite hitter, defensive specialist, and libero.' },
    { title: 'The libero', text: 'The libero is a back-row defense specialist who wears a different jersey.' },
  ],
  'High School Athlete': [
    { title: 'Quick scoring hint', text: 'Rally scoring means every rally awards a point.' },
    { title: 'Quick rotation hint', text: 'A team rotates when it wins the serve from its opponent.' },
    { title: 'Quick libero hint', text: 'The libero has special back-row substitution rules.' },
  ],
  Parent: [
    { title: 'Reading a match', text: 'The score shows points won, while the schedule shows when and where the next match is played.' },
    { title: 'Rotation and libero', text: 'Rotations change court spots, while the libero strengthens back-row passing and defense.' },
  ],
  'Casual Fan': [
    { title: 'Scoring hint', text: 'Every rally can add a point to either team.' },
    { title: 'Libero hint', text: 'Look for the player in the different jersey; that is usually the libero.' },
  ],
}

export function ProfileTeaching({ profile }: { profile: Profile }) {
  const content = teachingByProfile[profile]
  if (!content) return null
  return <section className="profile-teaching" aria-labelledby="teaching-title"><p className="eyebrow">For your profile</p><h2 id="teaching-title">A quick guide to the game.</h2><div className="teaching-grid">{content.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
}
