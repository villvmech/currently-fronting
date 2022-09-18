import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Card from '../components/card'
import { BannerPosition, AvatarPosition } from '../utils/types'
import hljs from 'highlight.js'
import { useFrontersAndSystem } from '../utils/front-utils'

const Front: NextPage = () => {
  const router = useRouter()
  const { systemID, s, b, a } = router.query
  const { fronters, system } = useFrontersAndSystem([systemID, s])

  useEffect(() => {
    hljs.configure({ cssSelector: 'pre code.hljs' })
    hljs.highlightAll()
  }, [fronters, system])

  let bannerPosition: BannerPosition
  switch (b) {
    case 'text':
      bannerPosition = 'text'
      break
    case 'bottom':
      bannerPosition = 'bottom'
      break
    case 'none':
      bannerPosition = 'none'
      break
    default:
      bannerPosition = 'top'
  }

  let avatarPosition: AvatarPosition
  switch (a) {
    case 'right':
      avatarPosition = 'right'
      break
    case 'center':
      avatarPosition = 'center'
      break
    case 'none':
      avatarPosition = 'none'
      break
    default:
      avatarPosition = 'left'
  }

  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Head>
        <title>
          {fronters
            ? fronters.members.map(member => member.name).join(' | ')
            : 'currently fronting'}
        </title>
        <meta
          name='description'
          content={
            system
              ? `Current fronters for ${system.name}`
              : "a web app for displaying a PluralKit system's current public fronters"
          }
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='container mx-auto p-2 flex flex-row flex-wrap justify-center gap-2'>
        {fronters &&
          fronters?.members.map(member => (
            <Card
              key={member.uuid}
              data={member}
              bannerPosition={bannerPosition}
              avatarPosition={avatarPosition}
            />
          ))}

        {system && (
          <Card
            data={system}
            bannerPosition={bannerPosition}
            avatarPosition={avatarPosition}
          />
        )}
      </div>

      {/* prettier-ignore */}
      <footer className='container mx-auto mb-2 max-w-md md:max-w-4xl p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-center text-sm rounded'>
        Powered by <span className='italic'>a lot</span> of <a href='https://github.com/systemic-chaos/currently-fronting/blob/main/package.json'>open source software</a> and designed to interface with <a href='https://pluralkit.me/'>PluralKit</a>. Developed by <a href='https://github.com/ArcanaOfSouls'>Arcana</a> and available under the <a href='https://github.com/systemic-chaos/currently-fronting/blob/main/LICENSE'>AGPL 3.0 license</a>. Find a bug? Follow the instructions on <a href='https://github.com/systemic-chaos/currently-fronting'>GitHub</a> in the README.
      </footer>
    </div>
  )
}

export default Front
