import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CharacterDetail from './CharacterDetail'

// --- Données Mock ---

// 1. Un personnage complet avec une miniature
const fullCharacter = {
  id: '101',
  name: 'Spider-Man',
  description: 'Bitten by a radioactive spider...',
  modified: '2020-01-01T12:00:00Z',
  thumbnail: {
    path: 'http://example.com/spidey',
    extension: 'jpg',
  },
}

// 2. Un personnage sans miniature (thumbnail est null)
const noThumbCharacter = {
  id: '102',
  name: 'Hulk',
  description: 'Always angry.',
  modified: '2019-01-01T12:00:00Z',
  thumbnail: null, // Le composant vérifie si "character.thumbnail" existe
}

// --- Tests ---

describe('CharacterDetail component', () => {
  test('renders "No character" when no character prop is provided', () => {
    render(<CharacterDetail />)
    // Vérifie que le texte "No character" est affiché
    expect(screen.getByText('No character')).toBeInTheDocument()
  })

  test('renders "No character" when character prop is an empty object', () => {
    render(<CharacterDetail character={{}} />)
    // Le comportement par défaut du prop fait la même chose, mais c'est un bon test
    expect(screen.getByText('No character')).toBeInTheDocument()
  })

  test('renders full character details when a character is provided', () => {
    render(<CharacterDetail character={fullCharacter} />)

    // Vérifie le titre H2
    expect(
      screen.getByRole('heading', { level: 2, name: 'Spider-Man' })
    ).toBeInTheDocument()

    // Vérifie la description
    expect(
      screen.getByText('Bitten by a radioactive spider...')
    ).toBeInTheDocument()

    // Vérifie la date de modification
    expect(screen.getByText('2020-01-01T12:00:00Z')).toBeInTheDocument()

    // Vérifie que l'image est présente
    const img = screen.getByRole('img', { name: 'Spider-Man' })
    expect(img).toBeInTheDocument()

    // Vérifie que la source de l'image est correcte
    expect(img).toHaveAttribute(
      'src',
      'http://example.com/spidey/standard_large.jpg'
    )
  })

  test('renders details but no image if thumbnail is missing', () => {
    render(<CharacterDetail character={noThumbCharacter} />)

    // Vérifie que le nom est présent
    expect(
      screen.getByRole('heading', { level: 2, name: 'Hulk' })
    ).toBeInTheDocument()

    // Vérifie que la description est présente
    expect(screen.getByText('Always angry.')).toBeInTheDocument()

    // Utilise queryByRole pour vérifier que l'image N'EXISTE PAS
    const img = screen.queryByRole('img', { name: 'Hulk' })
    expect(img).not.toBeInTheDocument()
  })
})