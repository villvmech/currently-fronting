import { Member, System } from '../util/types'
import {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  Text,
} from 'html-react-parser'
import { DateTime, DateTimeFormatOptions } from 'luxon'
import CardAvatar from './card-avatar'
import CardBanner from './card-banner'
import CardPronouns from './card-pronouns'
import CardDescription from './card-description'

interface CardProps {
  data: Member | System
}

const timestampRegex = /<t:(\d{10})(:[tTdDfFR])?>/g

const htmlReactParserOptions = {
  replace: (node: DOMNode) => {
    if (
      node instanceof Element &&
      node.name === 'img' &&
      node.attribs.class.split(' ').includes('d-emoji')
    ) {
      return (
        <img
          className={`${node.attribs.class} max-h-4 inline`}
          src={node.attribs.src}
          alt={node.attribs.alt}
        />
      )
    }
    if (node.type === 'text' && timestampRegex.test((node as Text).data)) {
      const textNodeData = (node as Text).data
      const formattedDateTime = textNodeData.replaceAll(
        timestampRegex,
        (match, p1, p2) => {
          const timestamp = DateTime.fromSeconds(parseInt(p1))
          const format: string = p2 ? p2[1] : 'f'
          if (format !== 'R') {
            let dateTimeFormatOptions = {
              t: { timeStyle: 'short' },
              T: { timeStyle: 'medium' },
              d: { dateStyle: 'short' },
              D: { dateStyle: 'medium' },
              f: { dateStyle: 'medium', timeStyle: 'short' },
              F: { dateStyle: 'full', timeStyle: 'short' },
            }[format]
            return timestamp.toLocaleString(
              dateTimeFormatOptions as DateTimeFormatOptions,
            )
          }
          return timestamp.toRelative() as string
        },
      )
      return <span>{formattedDateTime}</span>
    }
  },
} as HTMLReactParserOptions

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
              htmlReactParserOptions={htmlReactParserOptions}
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
                  htmlReactParserOptions={htmlReactParserOptions}
                />
              )}
              {birthday && <div className='italic'>{birthday}</div>}
            </div>
          )}
          {description && (
            <CardDescription
              description={description}
              htmlReactParserOptions={htmlReactParserOptions}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
