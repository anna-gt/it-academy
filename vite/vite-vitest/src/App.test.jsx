import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)
    const helloWorldElem = screen.getByText(/hello world/i)
		expect(helloWorldElem).toBeInTheDocument();
    screen.debug(); // prints out the jsx in the App component unto the command line
  })
})