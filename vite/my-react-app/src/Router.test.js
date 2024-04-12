import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom';



describe('TEST APP', () => {
	test('Router test', () => {
			render(<App/>);
			const mainLink = screen.getByTestId('main-link')
			const aboutLink = screen.getByTestId('about-link')
			fireEvent.click(aboutLink)
			expect(screen.getByTestId('about-page')).toBeInTheDocument();
			fireEvent.click(mainLink)
			expect(screen.getByTestId('main-page')).toBeInTheDocument();
	});

})