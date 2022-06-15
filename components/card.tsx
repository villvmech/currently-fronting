import { Member, System } from '../util/types'
import CardAvatar from './card-avatar'
import CardBanner from './card-banner'
import CardPronouns from './card-pronouns'
import CardDescription from './card-description'
import DiscordMarkdownParserOptions from '../util/discord-markdown-parser-options'

interface CardProps {
  member?: Member
  system?: System
}

const Card = (props: CardProps) => {
  const { member, system } = props

  const cardClasses =
    'container max-w-md p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-center rounded flex flex-col gap-2'
  return (
    <div className={cardClasses}>
      {member?.banner && (
        <CardBanner name={member.name} banner={member.banner} />
      )}
      {system?.banner && (
        <CardBanner name={system.name} banner={system.banner} />
      )}
      <div>
        {member?.avatar_url && (
          <CardAvatar
            name={member.name}
            avatar_url={member.avatar_url}
            color={member.color}
          />
        )}
        {system?.avatar_url && (
          <CardAvatar
            name={system.name}
            avatar_url={system.avatar_url}
            color={system.color}
          />
        )}
        <div>
          <h1 className='text-xl font-bold'>{member?.name ?? system?.name}</h1>
          {member && member.display_name && (
            <h2 className='text-lg italic'>{member.display_name}</h2>
          )}
          {system && <h2 className='text-lg italic'>System</h2>}
          {member?.pronouns && (
            <CardPronouns
              pronouns={member.pronouns}
              htmlReactParserOptions={DiscordMarkdownParserOptions}
            />
          )}
          {system?.pronouns && (
            <CardPronouns
              pronouns={system.pronouns}
              htmlReactParserOptions={DiscordMarkdownParserOptions}
            />
          )}
          {member?.birthday && <div className='italic'>{member.birthday}</div>}
          {member?.description && (
            <CardDescription
              description={member.description}
              htmlReactParserOptions={DiscordMarkdownParserOptions}
            />
          )}
          {system?.description && (
            <CardDescription
              description={system.description}
              htmlReactParserOptions={DiscordMarkdownParserOptions}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
