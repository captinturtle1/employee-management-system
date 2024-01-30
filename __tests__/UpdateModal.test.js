import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import UpdateModal from '@/components/updateModal';

const currentlyUpdating = [
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
    }
]

describe('Checking if UpdateModal loads', () => {
    test('Check UpdateModal heading', async () => {
        await act(async () => {
            render(<UpdateModal currentlyUpdating={currentlyUpdating}/>)
        });

        expect(screen.getByText("Update Employee")).toBeInTheDocument();
    })
})