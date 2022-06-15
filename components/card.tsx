import { Member, System } from '../util/types'
import CardAvatar from './card-avatar'
import CardBanner from './card-banner'
import CardPronouns from './card-pronouns'
import CardDescription from './card-description'
import DiscordMarkdownParserOptions from '../util/discord-markdown-parser-options'

interface CardProps {
  data: Member | System
}

const Card = (props: CardProps) => {
  const { data } = props
  const name = data.name
  const banner = data.banner
  const avatar_url = data.avatar_url
  const color = data.color
  const pronouns = data.pronouns
  const description = data.description
  const display_name = 'display_name' in data ? data.display_name : 'System'
  const birthday = 'birthday' in data ? data.birthday : null

  const cardClasses =
    'container max-w-md p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-center rounded flex flex-col gap-2'
  return (
    <div className={cardClasses}>
      {banner && (
        <CardBanner banner={banner}>
          <h1 className='text-xl font-bold'>{name}</h1>
          {display_name && display_name && (
            <h2 className='text-lg italic'>{display_name}</h2>
          )}
          {pronouns && (
            <CardPronouns
              pronouns={pronouns}
              htmlReactParserOptions={DiscordMarkdownParserOptions}
            />
          )}
          {birthday && <div className='italic'>{birthday}</div>}
        </CardBanner>
      )}
      <div>
        {avatar_url && (
          <CardAvatar name={name} avatar_url={avatar_url} color={color} />
        )}
        <div>
          {!banner && (
            <div>
              <h1 className='text-xl font-bold'>{name}</h1>
              {display_name && display_name && (
                <h2 className='text-lg italic'>{display_name}</h2>
              )}
              {pronouns && (
                <CardPronouns
                  pronouns={pronouns}
                  htmlReactParserOptions={DiscordMarkdownParserOptions}
                />
              )}
              {birthday && <div className='italic'>{birthday}</div>}
            </div>
          )}
          {description && (
            <CardDescription
              description={description}
              htmlReactParserOptions={DiscordMarkdownParserOptions}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
