import { AvatarPosition } from '../utils/types'
import { resizeMedia } from '../utils/discord-cdn-handling'

interface CardAvatarProps {
  name: string
  avatar_url: string
  color: string
  avatarPosition: AvatarPosition
}

const CardAvatar = (props: CardAvatarProps) => {
  const { name, avatar_url, color, avatarPosition } = props
  const resizedAvatarURL = resizeMedia(avatar_url)

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
      className={`h-48 w-48 border-4 object-cover rounded ${floatClass}`}
      src={resizedAvatarURL}
      alt={`Avatar for ${name}`}
      style={{
        borderColor: `#${color}`,
      }}
      width={256}
      height={256}
    />
  )
}

export default CardAvatar
