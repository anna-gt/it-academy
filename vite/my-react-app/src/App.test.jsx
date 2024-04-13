import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
import '@testing-library/jest-dom';

describe('TEST APP', () => {
	// test('renders learn vite ', () => {
	// 	render(<App />);
	// 	const HelloElem = screen.getByText(/hello world/i);
	// 	const btn = screen.getByRole('button');
	// 	const input = screen.getByPlaceholderText(/input value/i);
	// 	expect(HelloElem).toBeInTheDocument();
	// 	expect(btn).toBeInTheDocument();
	// 	expect(input).toMatchSnapshot();
	// });

	// test('renders learn vite ', async () => {
	// 	render(<App />);
	// 	// const helloElem = screen.queryByText(/hello2/i)
	// 	// expect(helloElem).toBeNull()
	// 	const helloWorldElem = await screen.findByText(/data/i)
	// 	expect(helloWorldElem).toBeInTheDocument();
		
	// });

	// test('click event', () => {
	// 	render(<App />);
	// 	const btn = screen.getByTestId('toggle-btn');
	// 	expect(screen.queryByTestId('toggle-elem')).toBeNull();
	// 	fireEvent.click(btn)
	// 	expect(screen.queryByTestId('toggle-elem')).toBeInTheDocument();
	// 	fireEvent.click(btn)
	// 	expect(screen.queryByTestId('toggle-elem')).toBeNull();
	// });

	// test('input event', async () => {
	// 	render(<App />);
	// 	const input = screen.getByPlaceholderText(/input value/i);
	// 	expect(screen.queryByTestId('value-elem')).toContainHTML('');
	// 	screen.debug();
	// 	// Искуственное событие
	// 	// fireEvent.input(input, {
	// 	// 	target: {value: '131455'}
	// 	// })
	// 	// Близко к пользователю, обрабатываются события нажатия клавиш и тд
	// 	const user = userEvent.setup()
	// 	await user.type(input, '131455' )
	// 	expect(screen.getByTestId('value-elem')).toContainHTML('131455');
	// 	screen.debug();
	// });
	
})

