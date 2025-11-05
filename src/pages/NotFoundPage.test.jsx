import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import NotFoundPage from './NotFoundPage'

describe('NotFoundPage component', () => {
  test('renders heading, paragraph, and sets document title', () => {
    // 1. Rendre le composant
    render(<NotFoundPage />)

    // 2. Vérifier le titre de la page
    expect(document.title).toBe('404 - Page Not Found')

    // 3. Vérifier le titre H2
    const heading = screen.getByRole('heading', {
      level: 2,
      name: '404 - Page Not Found',
    })
    expect(heading).toBeInTheDocument()

    // 4. Vérifier le texte du paragraphe
    const paragraph = screen.getByText(
      'The page you are looking for does not exist.'
    )
    expect(paragraph).toBeInTheDocument()
  })
})