import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ContactPage from './ContactPage'

describe('ContactPage component', () => {
  test('renders heading, paragraph, email link, and sets document title', () => {
    // 1. Rendre le composant
    render(<ContactPage />)

    // 2. Vérifier le titre de la page
    expect(document.title).toBe('Contact | Marvel App')

    // 3. Vérifier le titre H2
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Contact Us',
    })
    expect(heading).toBeInTheDocument()

    // 4. Vérifier la présence du lien (par son rôle et son nom)
    const emailLink = screen.getByRole('link', {
      name: 'marvelApp@gmail.com',
    })
    expect(emailLink).toBeInTheDocument()

    // 5. Vérifier que le lien a le bon attribut 'href'
    expect(emailLink).toHaveAttribute('href', 'mailto:marvelApp@gmail.com')

    // 6. Vérifier que le texte complet du paragraphe est présent
    expect(
      screen.getByText(/Feel free to contact us at/i)
    ).toBeInTheDocument()
  })
})