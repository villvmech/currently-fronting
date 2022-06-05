import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import useSWR, { Key } from 'swr'
import { Switch } from '../util/types'

const useFronters = (system: Key) => {
  const getFronters = async (system: Key) => {
    const data = await fetch(
      `https://api.pluralkit.me/v2/systems/${system}/fronters`,
    )
    if (data.ok) {
      const fronters: Switch = await data.json()
      return fronters
    }
    return null
  }

  const { data, error } = useSWR<Switch | null>(system, (system: Key) =>
    getFronters(system),
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
    <div className={styles.container}>
      <Head>
        <title>{fronters?.members.map(member => member.name).join('| ')}</title>
        <meta name='description' content={`Fronters for ${system}`} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  )
}

export default Home
