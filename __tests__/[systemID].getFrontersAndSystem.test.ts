import { getFrontersAndSystem } from '../pages/[systemID]'
import 'isomorphic-fetch'
const fetch = jest.fn()
global.fetch = fetch
global.Response = Response

it('returns fronters and system both as null if the API responds with an error for either call', async () => {
  fetch.mockImplementation(async () => {
    return new Response(null, { status: 404 })
  })

  const { fronters, system } = await getFrontersAndSystem('invalid', 'true')
  expect(fronters).toBeNull()
  expect(system).toBeNull()
  expect(fetch).toHaveBeenCalledTimes(2)
})
