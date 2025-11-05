import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CharactersList from './CharactersList'

// Mock data
const characters = [
  { id: '1', name: 'Iron Man', thumbnail: { path: 'path1', extension: 'jpg' } },
  { id: '2', name: 'Hulk', thumbnail: { path: 'path2', extension: 'jpg' } },
]

describe('CharactersList component', () => {
  test('renders an empty list when no characters prop is provided', () => {
    render(
      <MemoryRouter>
        <CharactersList />
      </MemoryRouter>
    )
    // On vérifie que la liste (rôle 'list') est vide
    expect(screen.getByRole('list')).toBeEmptyDOMElement()
  })

  test('renders an empty list when characters array is empty', () => {
    render(
      <MemoryRouter>
        <CharactersList characters={[]} />
      </MemoryRouter>
    )
    // On vérifie aussi ici que la liste est vide
    expect(screen.getByRole('list')).toBeEmptyDOMElement()
  })

  test('renders all characters passed as props', () => {
    render(
      <MemoryRouter>
        <CharactersList characters={characters} />
      </MemoryRouter>
    )

    // Récupère tous les éléments de la liste (rôle 'listitem')
    const listItems = screen.getAllByRole('listitem')
    // Vérifie que nous avons le bon nombre d'éléments
    expect(listItems).toHaveLength(characters.length)

    // Vérifie que les noms sont bien présents
    expect(screen.getByText('Iron Man')).toBeInTheDocument()
    expect(screen.getByText('Hulk')).toBeInTheDocument()
  })
})