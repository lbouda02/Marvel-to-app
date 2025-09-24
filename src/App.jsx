import './App.css'
import characters from './data/characters.json'

function App() {
  return (
    <>
      <h1>Marvel Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
