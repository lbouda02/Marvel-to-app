import { expect, test, describe } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import CharacterDetailPage from './CharacterDetailPage'

// --- Données Mock ---
const mockCharacter = {
  id: '101',
  name: 'Spider-Man',
  description: 'Bitten by a radioactive spider...',
  thumbnail: {
    path: 'http://example.com/spidey',
    extension: 'jpg',
  },
}

// --- Test ---
describe('CharacterDetailPage', () => {
  test('renders character details from loader and sets document title', async () => {
    // 1. Créer le stub de route (comme pour CharactersPage)
    const Stub = createRoutesStub([
      {
        path: '/characters/:characterId',
        Component: CharacterDetailPage,
        // Le loader fournit la donnée que `useLoaderData` va récupérer
        loader: () => mockCharacter,
        HydrateFallback: () => null,
      },
    ])

    // 2. Rendre le stub en lui disant sur quelle URL on est
    render(<Stub initialEntries={['/characters/101']} />)

    // 3. Vérifications (Assertions)

    // On attend que le H2 (rendu par CharacterDetail) s'affiche
    const heading = await screen.findByRole('heading', {
      level: 2,
      name: 'Spider-Man',
    })
    expect(heading).toBeInTheDocument()

    // On vérifie que le titre de la page (document.title) est correct
    // (Ceci est géré directement par CharacterDetailPage)
    expect(document.title).toBe('Spider-Man | Marvel App')

    // On vérifie que les autres détails (rendus par CharacterDetail) sont là
    expect(
      screen.getByText('Bitten by a radioactive spider...')
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Spider-Man' })).toBeInTheDocument()
  })
})