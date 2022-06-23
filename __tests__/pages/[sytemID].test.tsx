import { render } from '@testing-library/react'
import Front from '../../pages/[systemID]'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const getFrontersAndSystem = jest.spyOn(
  require('../../util/front-utils'),
  'getFrontersAndSystem',
)

describe('fronters and system cards', () => {
  it('renders the footer only when an invalid system ID is provided', () => {
    useRouter.mockImplementation(() => ({
      query: {
        systemID: 'invalid',
      },
    }))
    getFrontersAndSystem.mockImplementation(() => {
      return {
        fronters: null,
        system: null,
      }
    })

    const { container } = render(<Front />)
    expect(container).toMatchSnapshot()
  })
})
