import { render, screen, fireEvent } from '@testing-library/react';
import Users from "./Users";
import axios from 'axios';
import userEvent from "@testing-library/user-event";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import React from "react";


vi.mock('axios');

describe('USERS TEST', () => {
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

    afterEach(() => {
        vi.clearAllMocks();
    })

    test('renders learn react link', async() => {
        axios.get.mockReturnValue(response);
        render(<Users />);
        const users = await screen.findAllByTestId('user-item');
        expect(users.length).toBe(3);
        expect(axios.get).toBeCalledTimes(1);
        screen.debug();
    });

    // test('test redirect to details page', async() => {
    //     axios.get.mockReturnValue(response);
    //     render(<Users />);
    //     const users = await screen.findAllByTestId('user-item');
    //     expect(users.length).toBe(3);
		// 		const user = userEvent.setup()
    //     await user.click(users[0])
    //     expect(screen.getByTestId('user-page')).toBeInTheDocument();
    // });
})