import { AvatarPosition } from '../util/types'
import DiscordCDNToMediaCache from '../util/discord-cdn-to-media-cache'

interface CardAvatarProps {
  name: string
  avatar_url: string
  color: string
  avatarPosition: AvatarPosition
}

const CardAvatar = (props: CardAvatarProps) => {
  const { name, avatar_url, color, avatarPosition } = props
  const resizedAvatarURL = `${avatar_url.replace(
    DiscordCDNToMediaCache,
    'https://media.discordapp.net/',
  )}?width=172&height=172`

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
      src={resizedAvatarURL}
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
