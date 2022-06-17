import { AvatarPosition } from '../util/types'
import { DiscordCDNAttachmentRegex } from '../util/discord-cdn-handling'

interface CardAvatarProps {
  name: string
  avatar_url: string
  color: string
  avatarPosition: AvatarPosition
}

const CardAvatar = (props: CardAvatarProps) => {
  const { name, avatar_url, color, avatarPosition } = props
  const resizedAvatarURL = avatar_url.replace(
    DiscordCDNAttachmentRegex,
    'https://media.discordapp.net/attachments/$1?width=256&height=256&format=webp',
  )

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
