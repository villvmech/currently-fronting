import { toHTML } from 'discord-markdown'
import parse, { HTMLReactParserOptions } from 'html-react-parser'

interface CardTextProps {
  text: string
  embed: boolean
  className?: string
  htmlReactParserOptions: HTMLReactParserOptions
}

const CardText = (props: CardTextProps) => {
  const { text, embed, htmlReactParserOptions, className } = props

  return (
    <div className={className}>
      {parse(toHTML(text, { embed: embed }), htmlReactParserOptions)}
    </div>
  )
}

export default CardText
