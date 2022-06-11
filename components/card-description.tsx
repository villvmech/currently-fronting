import { toHTML } from 'discord-markdown'

import parse, { HTMLReactParserOptions } from 'html-react-parser'

interface CardDescriptionProps {
  description: string
  htmlReactParserOptions: HTMLReactParserOptions
}

const CardDescription = (props: CardDescriptionProps) => {
  const { description, htmlReactParserOptions } = props

  return (
    <div className='text-justify'>
      {parse(toHTML(description, { embed: true }), htmlReactParserOptions)}
    </div>
  )
}

export default CardDescription
