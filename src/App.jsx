import './App.css'
import characters from './data/characters.json'
import CharactersList from './components/CharactersList'
import NumberOfCharacters from './components/NumberOfCharacters'

function App() {
  return (
    <>
      <h1>Marvel Characters</h1>
      <NumberOfCharacters characters={characters} />
      <CharactersList characters={characters} />
    </>
  )
}

export default App
