import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR, { Key } from 'swr'
import MemberCard from '../components/member-card'
import { Switch, System } from '../util/types'

interface FrontersAndSystem {
  fronters: Switch | null
  system: System | null
}

const getFrontersAndSystem = async (systemID: Key) => {
  const systemData = await fetch(
    `https://api.pluralkit.me/v2/systems/${systemID}`,
  )

  let system: System | null = null
  if (systemData.ok) {
    system = await systemData.json()
  }

  const frontersData = await fetch(
    `https://api.pluralkit.me/v2/systems/${systemID}/fronters`,
  )

  let fronters: Switch | null = null
  if (frontersData.ok) {
    fronters = await frontersData.json()
  }

  return { fronters: fronters, system: system }
}

const getServerSideProps: GetServerSideProps = async context => {
  const { fronters, system } = await getFrontersAndSystem(
    context.params?.system,
  )

  return {
    props: {
      fallback: { fronters, system },
    },
  }
}

const useFrontersAndSystem = (systemID: Key) => {
  const { data } = useSWR<FrontersAndSystem>(
    systemID,
    (systemID: Key) => getFrontersAndSystem(systemID),
    { refreshInterval: 30 * 1000 },
  )

  const { fronters, system } = data ? data : { fronters: null, system: null }
  return {
    fronters,
    system,
  }
}

const Home: NextPage = () => {
  const router = useRouter()
  const { systemID } = router.query
  const { fronters, system } = useFrontersAndSystem(systemID as Key)

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

        {fronters &&
          fronters?.members.map(member => (
            <MemberCard key={member.id} member={member} isSystem={false} />
          ))}
      </div>

      {/* prettier-ignore */}
      <footer className='container mx-auto max-w-4xl p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 text-center rounded'>
      Powered by <span className="italic">a lot</span> of <a href="https://github.com/obscura-scripturae/currently-fronting/blob/main/package.json">open source software</a> and designed to interface with <a href="https://pluralkit.me/">PluralKit</a>. Developed by <a href="https://github.com/pulchra-mentis">pulchra mentis</a> and available under the <a href="https://github.com/obscura-scripturae/currently-fronting/blob/main/LICENSE">AGPL 3.0 license</a>. Find a bug? Follow the instructions on <a href="https://github.com/obscura-scripturae/currently-fronting">GitHub</a> in the README.
    </footer>
    </div>
  )
}

export { getServerSideProps }
export default Home
