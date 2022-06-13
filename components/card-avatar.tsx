interface CardAvatarProps {
  name: string
  avatar_url: string
  color: string
}

const CardAvatar = (props: CardAvatarProps) => {
  const { name, avatar_url, color } = props

  return (
    <img
      className='max-h-48 border-4 object-cover rounded float-left mr-2'
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
