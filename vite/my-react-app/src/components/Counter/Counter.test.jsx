import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';
import { Provider } from 'react-redux';
import { createReduxStore } from '../../store/store'
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';

describe('Counter test', () => {
	test('Test render', () => {
		render(renderWithRedux(<Counter />));
		const incrementBtn = screen.getByTestId('increment-btn');
		expect(screen.getByTestId('value-title')).toHaveTextContent('0');
		fireEvent.click(incrementBtn);
		expect(screen.getByTestId('value-title')).toHaveTextContent('1');
	});
	
});
