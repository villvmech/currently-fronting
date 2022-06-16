import { AvatarPosition } from '../util/types'

interface CardAvatarProps {
  name: string
  avatar_url: string
  color: string
  avatarPosition: AvatarPosition
}

const CardAvatar = (props: CardAvatarProps) => {
  const { name, avatar_url, color, avatarPosition } = props
  let floatClass: string
  switch (avatarPosition) {
    case 'right':
      floatClass = 'float-right ml-2'
      break
    case 'center':
      floatClass = 'mx-auto'
      break
    default:
      floatClass = 'float-left mr-2'
  }

  return (
    <img
      className={`max-h-48 border-4 object-cover rounded ${floatClass}`}
      src={avatar_url}
      alt={`Avatar for ${name}`}
      style={{
        borderColor: `#${color}`,
      }}
      width={172}
      height={172}
    />
  )
}

export default CardAvatar
