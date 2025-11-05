import characters from '../data/characters.json'

/**
 * returns the list of characters with optional sorting
 * @param {{sort?: string, order?: string}} options
 * @returns Array
 */
export const getCharacters = ({ sort = 'name', order = 'asc' } = {}) => {
  const validSorts = ['name', 'modified'];
  const validOrders = ['asc', 'desc'];

  if (!validSorts.includes(sort)) sort = 'name';
  if (!validOrders.includes(order)) order = 'asc';

  const list = [...characters];

  list.sort((a, b) => {
    let cmp = 0;

    if (sort === 'name') {
      const na = (a.name).toString();
      const nb = (b.name).toString();
      cmp = na.localeCompare(nb, undefined, { sensitivity: 'base' });
    } else {
      // sort by modified date (fallback to 0 if invalid)
      const da = a.modified ? Date.parse(a.modified) : 0;
      const db = b.modified ? Date.parse(b.modified) : 0;
      cmp = da - db;
    }

    return order === 'asc' ? cmp : -cmp;
  });

  return list;
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
