import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('App', () => {
    it('renders without crashing', () => {
        render(<Home />)

        expect(screen.getByText('Save and see your changes instantly.')).toBeInTheDocument()
    })
})