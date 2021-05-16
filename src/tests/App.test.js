import { render, screen } from '@testing-library/react'
import { ListMovies } from '../pages/list-movies'

test('renders learn react link', () => {
    render(<ListMovies />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
