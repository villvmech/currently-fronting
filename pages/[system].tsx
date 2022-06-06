import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR, { Key } from 'swr'
import MemberCard from '../components/member-card'
import { Switch } from '../util/types'

const useFronters = (system: Key) => {
  const getFronters = async (system: Key) => {
    const data = await fetch(
      `https://api.pluralkit.me/v2/systems/${system}/fronters`,
    )
    if (!data.ok) {
      throw new Error(
        "An error occurred while fetching this system's data. Perhaps their fronters are private?",
      )
    } else {
      const fronters: Switch = await data.json()
      return fronters
    }
  }

  const { data, error } = useSWR<Switch | null>(
    system,
    (system: Key) => getFronters(system),
    { refreshInterval: 30 * 1000 },
  )

  return {
    fronters: data,
    isLoading: !error && !data,
    error: error,
  }
}

const Home: NextPage = () => {
  const router = useRouter()
  const { system } = router.query
  const { fronters, isLoading, error } = useFronters(system as Key)

  return (
    <div>
      <div className='container mx-auto p-2 flex flex-row flex-wrap justify-center gap-2'>
        <Head>
          <title>
            {fronters
              ? fronters.members.map(member => member.name).join(' | ')
              : 'currently fronting'}
          </title>
          <meta
            name='description'
            content="a web app for displaying a PluralKit system's current public fronters"
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        {isLoading && <MemberCard member='Loading...' />}
        {error && (
          <MemberCard member="An error occurred while fetching this system's data. Perhaps their fronters are private?" />
        )}
        {fronters &&
          fronters?.members.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
      </div>
      {/* prettier-ignore */}
      <footer className='container mx-auto max-w-4xl p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-center rounded'>
      Powered by <span className="italic">a lot</span> of <a href="https://github.com/obscura-scripturae/currently-fronting/blob/main/package.json">open source software</a> and designed to interface with <a href="https://pluralkit.me/">PluralKit</a>. Developed by <a href="https://github.com/pulchra-mentis">pulchra mentis</a> and available under the <a href="https://github.com/obscura-scripturae/currently-fronting/blob/main/LICENSE">AGPL 3.0 license</a>. Find a bug? Follow the instructions on <a href="https://github.com/obscura-scripturae/currently-fronting">GitHub</a> in the README.
    </footer>
    </div>
  )
}

export default Home
