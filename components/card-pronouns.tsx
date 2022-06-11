import { toHTML } from 'discord-markdown'

import parse, { HTMLReactParserOptions } from 'html-react-parser'

interface CardPronounsProps {
  pronouns: string
  htmlReactParserOptions: HTMLReactParserOptions
}

const CardPronouns = (props: CardPronounsProps) => {
  const { pronouns, htmlReactParserOptions } = props

  return (
    <div>
      {parse(toHTML(pronouns, { embed: true }), htmlReactParserOptions)}
    </div>
  )
}

export default CardPronouns
