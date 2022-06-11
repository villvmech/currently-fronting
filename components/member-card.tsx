import { Member } from '../util/types'
import { toHTML } from 'discord-markdown'
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  Text,
} from 'html-react-parser'

interface MemberCardProps {
  member: Member | string
}

const MemberCard = (props: MemberCardProps) => {
  const { member } = props

  if (typeof member === 'string') {
    return (
      <div className='container max-w-md p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-center rounded'>
        {member}
      </div>
    )
  } else {
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
              const timestamp = new Date(parseInt(p1) * 1000)
              const format: string = p2 ? p2.substr(1) : 'f'
              let dateTimeFormatOptions = {
                t: { timeStyle: 'short' },
                T: { timeStyle: 'medium' },
                d: { dateStyle: 'short' },
                D: { dateStyle: 'medium' },
                f: { dateStyle: 'medium', timeStyle: 'short' },
                F: { dateStyle: 'long', timeStyle: 'short' },
              }[format]
              return Intl.DateTimeFormat(
                [],
                dateTimeFormatOptions as Intl.DateTimeFormatOptions,
              ).format(timestamp)
            },
          )
          return <span>{formattedDateTime}</span>
        }
      },
    } as HTMLReactParserOptions

    return (
      <div className='container max-w-md p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-center rounded flex flex-col items-center gap-2'>
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
}

export default MemberCard
