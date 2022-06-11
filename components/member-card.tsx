import { Member, System } from '../util/types'
import { toHTML } from 'discord-markdown'
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  Text,
} from 'html-react-parser'
import { DateTime, DateTimeFormatOptions } from 'luxon'

interface MemberCardProps {
  member?: Member
  system?: System
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

const MemberCard = (props: MemberCardProps) => {
  const { member, system } = props
  
  const memberCardClasses = system
    ? 'container max-w-xl p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-center rounded'
    : 'container max-w-md p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-center rounded flex flex-col items-center gap-2'
  return (
    <div className={memberCardClasses}>
      {member.banner && (
        <img
          className='max-h-48 object-cover rounded'
          src={member.banner}
          alt={member.name}
        />
      )}
      <div>
        {member.avatar_url && (
          <img
            className='max-h-48 border-4 object-cover rounded float-left mr-2'
            src={member.avatar_url}
            alt={member.name}
            style={{
              borderColor: `#${member.color}`,
            }}
          />
        )}
        <div>
          <h1 className='text-xl font-bold'>{member.name}</h1>
          {member.display_name && (
            <h2 className='text-lg italic'>{member.display_name}</h2>
          )}
          {member.pronouns && (
            <div>
              {parse(
                toHTML(member.pronouns, { embed: true }),
                htmlReactParserOptions,
              )}
            </div>
          )}
          {member.birthday && <div className='italic'>{member.birthday}</div>}
          {member.description && (
            <div className='text-justify max-w-prose'>
              {parse(
                toHTML(member.description, { embed: true }),
                htmlReactParserOptions,
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemberCard
