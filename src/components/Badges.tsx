export interface BadgeProps {
  badgeState: string[]
  index: number
}

const Badges = ({ badgeState, index }: BadgeProps) => {
  const handleBadge = (str: string) => {
    if (str === 'n') {
      return 'badge-neutral'
    }
    if (str === 'e') {
      return 'badge-error'
    }
    if (str === 'y') {
      return 'badge-success'
    }
  }

  return (
    <section className="text-center space-x-2">
      {badgeState.map((badge, i) => (
        <div
          key={i}
          className={`badge ${handleBadge(badge)} ${
            i === index ? 'ring-1 ring-offset-1 ring-offset-gray-700 ring-cyan-500' : ''
          }`}
        ></div>
      ))}
    </section>
  )
}

export default Badges
