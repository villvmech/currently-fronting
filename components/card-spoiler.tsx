import { useState } from 'react'

interface CardSpoilerProps {
  embed: boolean
  className: string
  children: React.ReactNode
}

const CardSpoiler = (props: CardSpoilerProps) => {
  const { className, children } = props
  const [spoileredStatus, setSpoileredStatus] = useState('spoilered')
  const classNameWithSpoileredStatus = `${className} ${spoileredStatus}`

  return (
    <span
      className={classNameWithSpoileredStatus}
      onClick={() =>
        setSpoileredStatus(
          spoileredStatus === 'spoilered' ? 'unspoilered' : 'spoilered',
        )
      }>
      {children}
    </span>
  )
}

export default CardSpoiler
