import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Test App', () => {
	it('Router test', async () => {
		render(<App />);
		const mainLink = screen.getByTestId('main-link')
		const aboutLink = screen.getByTestId('about-link')
		const user = userEvent.setup()
		await user.click(aboutLink)
		expect(screen.getByTestId('about-page')).toBeInTheDocument();
		await user.click(mainLink)
		expect(screen.getByTestId('main-page')).toBeInTheDocument();
	})
})