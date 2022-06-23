import { getFrontersAndSystem } from '../../util/front-utils'
import 'isomorphic-fetch'
import { sampleSwitch } from '../../__data__/test-data'

const fetch = jest.fn()
global.fetch = fetch
global.Response = Response

afterEach(() => {
  jest.clearAllMocks()
})

describe('get fronters and system from the PluralKit API', () => {
  it('returns fronters and system both as null if the API responds with an error for either request', async () => {
    fetch.mockImplementation(async () => {
      return new Response(null, { status: 404 })
    })

    const { fronters, system } = await getFrontersAndSystem('invalid', 'true')
    expect(fronters).toBeNull()
    expect(system).toBeNull()
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('returns fronters with system set to null if includeSystem is set to "false"', async () => {
    fetch.mockImplementationOnce(async () => {
      return new Response(JSON.stringify(sampleSwitch), { status: 200 })
    })

    const { fronters } = await getFrontersAndSystem('invalid', 'false')
    expect(fronters).toHaveProperty('id')
    expect(fronters?.members).toHaveLength(1)
    expect(fronters?.members[0].id).not.toBeNull()
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
