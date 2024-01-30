import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import Reports from '@/pages/reports';

describe('Checking if Reports loads', () => {
    test('Check Reports heading', async () => {
        await act(async () => {
            render(<Reports/>)
        });

        expect(screen.getByText("Generate Reports")).toBeInTheDocument();
    })
})