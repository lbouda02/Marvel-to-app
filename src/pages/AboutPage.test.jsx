import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AboutPage from './AboutPage'

describe('AboutPage component', () => {
  test('renders heading, paragraph, and sets document title', () => {
    // 1. Rendre le composant
    render(<AboutPage />)

    // 2. Vérifier le titre de la page
    // (Comme vous l'avez spécifié dans vos instructions)
    expect(document.title).toBe('About | Marvel App')

    // 3. Vérifier le titre H2
    // (Comme vous l'avez spécifié dans vos instructions)
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Us',
    })
    expect(heading).toBeInTheDocument()

    // 4. Vérifier le texte du paragraphe
    const paragraph = screen.getByText(
      'We are a team of Marvel fans who love to create awesome apps!'
    )
    expect(paragraph).toBeInTheDocument()
  })
})