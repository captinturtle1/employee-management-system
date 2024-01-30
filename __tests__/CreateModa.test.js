import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import CreateModal from '@/components/createModal';

describe('Checking if CreateModal loads', () => {
    test('Check CreateModal heading', async () => {
        await act(async () => {
            render(<CreateModal/>)
        });

        expect(screen.getByText("Add Employee")).toBeInTheDocument();
    })
})