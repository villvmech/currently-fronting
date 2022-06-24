import { Switch, System } from './pk-types'
import useSWR from 'swr'

interface FrontersAndSystem {
  fronters: Switch | null
  system: System | null
}

type FrontersAndSystemKey = string | string[] | undefined

const getFrontersAndSystem = async (
  systemID: FrontersAndSystemKey,
  includeSystem: FrontersAndSystemKey,
) => {
  let system: System | null = null
  if (includeSystem === 'true' && typeof systemID === 'string') {
    const systemData = await fetch(
      `https://api.pluralkit.me/v2/systems/${systemID}`,
    )
    if (systemData.ok) {
      system = await systemData.json()
    }
  }

  let fronters: Switch | null = null
  if (typeof systemID === 'string') {
    const frontersData = await fetch(
      `https://api.pluralkit.me/v2/systems/${systemID}/fronters`,
    )
    if (frontersData.ok) {
      fronters = await frontersData.json()
    }
  }

  return { fronters, system }
}

const useFrontersAndSystem = (
  frontersAndSystemKeys: FrontersAndSystemKey[],
) => {
  const { data } = useSWR<FrontersAndSystem>(
    [frontersAndSystemKeys[0], frontersAndSystemKeys[1]],
    (systemID, includeSystem) => getFrontersAndSystem(systemID, includeSystem),
    { refreshInterval: 30 * 1000 },
  )

  return data ? data : { fronters: null, system: null }
}

export { getFrontersAndSystem, useFrontersAndSystem }
