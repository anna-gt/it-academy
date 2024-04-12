import { render, screen, fireEvent } from '@testing-library/react';
import Users from './Users';
import axios from 'axios';

jest.mock('axios');

describe('users test', () => {
	let response;
	beforeEach(() => {
		response = {
			data: [
				{
						"id": 1,
						"name": "Leanne Graham",
				},
				{
						"id": 2,
						"name": "Ervin Howell",
				},
				{
						"id": 3,
						"name": "Clementine Bauch",
				},
		]
		}
	})
	test('', async () => {
		axios.get.mockReturnValue(response);
		render(<Users />);
		const users = await screen.findAllByTestId('user-item');
		expect(users.length).toBe(3);
		expect(axios.get).toBeCalledTimes(1);
		screen.debug();

	})
})