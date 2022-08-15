import { render } from '@testing-library/react'
import Front from '../../pages/[systemID]'
import 'next/router'

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { systemID: 'invalid' } }),
}))
const getFrontersAndSystem = jest.fn(async () => ({
  fronters: null,
  system: null,
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe('fronters and system cards', () => {
  it('renders the footer only when an invalid system ID is provided', () => {
    const { container } = render(<Front />)
    expect(container).toMatchSnapshot()
  })
})
