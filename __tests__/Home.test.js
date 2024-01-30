import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import Home from '@/pages'

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: async () => Promise.resolve(
            {
                status: 200,
                body: [
                    {
                        id: 15,
                        first_name: "John",
                        last_name: "Doe",
                        email: "john.doe@email.com",
                        job_title: "Software Engineer",
                        birth_date: "1990-05-15T00:00:00.000Z",
                        hire_date: "2020-01-10T00:00:00.000Z",
                        phone_number: "1234567890",
                        salary: "75000"
                    },
                    {
                        id: 16,
                        first_name: "Jane",
                        last_name: "Smith",
                        email: "jane.smith@email.com",
                        job_title: "Data Scientist",
                        birth_date: "1988-08-20T00:00:00.000Z",
                        hire_date: "2018-03-22T00:00:00.000Z",
                        phone_number: "9876543210",
                        salary: "85000"
                    }, 
                    {
                        id: 17,
                        first_name: "Michael",
                        last_name: "Johnson",
                        email: "michael.johnson@email.com",
                        job_title: "Project Manager",
                        birth_date: "1985-12-03T00:00:00.000Z",
                        hire_date: "2015-06-05T00:00:00.000Z",
                        phone_number: "5554443333",
                        salary: "95000"
                    }
                ]
            }
        ) 
    })
);

describe('Checking if home loads', () => {
    test('Check home elements', async () => {
        await act(async () => {
            render(<Home/>)
        });
        
        let res = await fetch("/api/getAll");
        let json = await res.json();
        // checking if mock fetch works

        // check if mock fetch is functional
        expect(json.body.length).toEqual(3);
        
        // check if names from api fetch were properly inserted into the document
        expect(screen.getByText("John")).toBeInTheDocument();
        expect(screen.getByText("Jane")).toBeInTheDocument();
        expect(screen.getByText("Michael")).toBeInTheDocument();

        // check if heading element is loaded in
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        

        global.fetch.mockClear();
    })
})