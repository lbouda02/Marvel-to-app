import characters from '../data/characters.json'

/**
 * returns the list of characters
 * @returns 
 */
export const getCharacters = () => {
  return characters;
}

/**
 * returns a character by id
 * @param {*} id 
 * @returns 
 * @throws Error if character not found
 */
export const getCharacterById = (id) => {
  const character = characters.find(character => character.id === id);

  if (!character) {
    throw new Error(`Aucun personnage trouvé avec l'id ${id}`);
  }

  return character;
};
