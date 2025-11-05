// src/api/characters-api.test.js

import { describe, expect, jest, test } from '@jest/globals';

import { getCharacters, getCharacterById } from './characters-api';
// Importer l'original pour le test d'immutabilité
import originalCharacters from '../data/characters.json';

// --- Configuration du Mock ---

// Données factices conçues pour tester le tri.
// Elles sont intentionnellement dans le désordre (par nom et par date).
const mockCharacters = [
  { id: 1, name: 'B-Character', modified: '2023-01-02T00:00:00Z' }, // Nom: B, Date: 2
  { id: 2, name: 'A-Character', modified: '2023-01-03T00:00:00Z' }, // Nom: A, Date: 3
  { id: 3, name: 'C-Character', modified: '2023-01-01T00:00:00Z' }, // Nom: C, Date: 1
  { id: 4, name: 'D-Character', modified: null }, // Nom: D, Date: 0 (fallback)
];

// On mock le module .json pour qu'il retourne nos données de test
jest.mock('../data/characters.json', () => [
  // C'est cet ordre que la fonction 'getCharacters' verra au départ
  { id: 1, name: 'B-Character', modified: '2023-01-02T00:00:00Z' },
  { id: 2, name: 'A-Character', modified: '2023-01-03T00:00:00Z' },
  { id: 3, name: 'C-Character', modified: '2023-01-01T00:00:00Z' },
  { id: 4, name: 'D-Character', modified: null },
]);

// --- Suite de Tests ---

describe('characters-api', () => {
  // Helper pour vérifier l'ordre des IDs (plus lisible)
  const getIds = (list) => list.map((c) => c.id);

  describe('getCharacters', () => {
    // Ordre attendu par nom (asc) : A (2), B (1), C (3), D (4)
    const expectedNameAsc = [2, 1, 3, 4];
    // Ordre attendu par nom (desc) : D (4), C (3), B (1), A (2)
    const expectedNameDesc = [4, 3, 1, 2];
    // Ordre attendu par date (asc) : D (4, null/0), C (3), B (1), A (2)
    const expectedDateAsc = [4, 3, 1, 2];
    // Ordre attendu par date (desc) : A (2), B (1), C (3), D (4, null/0)
    const expectedDateDesc = [2, 1, 3, 4];

    test('devrait retourner les personnages triés par nom (asc) par défaut', () => {
      const result = getCharacters();
      expect(getIds(result)).toEqual(expectedNameAsc);
    });

    test('devrait retourner les personnages triés par nom (desc)', () => {
      const result = getCharacters({ sort: 'name', order: 'desc' });
      expect(getIds(result)).toEqual(expectedNameDesc);
    });

    test('devrait retourner les personnages triés par date (asc)', () => {
      const result = getCharacters({ sort: 'modified', order: 'asc' });
      expect(getIds(result)).toEqual(expectedDateAsc);
    });

    test('devrait gérer le fallback (date null) en le plaçant au début en asc', () => {
      const result = getCharacters({ sort: 'modified', order: 'asc' });
      expect(result[0].id).toBe(4); // L'ID 4 (date null) doit être premier
    });

    test('devrait retourner les personnages triés par date (desc)', () => {
      const result = getCharacters({ sort: 'modified', order: 'desc' });
      expect(getIds(result)).toEqual(expectedDateDesc);
    });

    test('devrait gérer le fallback (date null) en le plaçant à la fin en desc', () => {
      const result = getCharacters({ sort: 'modified', order: 'desc' });
      expect(result[result.length - 1].id).toBe(4); // L'ID 4 (date null) doit être dernier
    });

    test("devrait utiliser le tri par nom (asc) si le 'sort' est invalide", () => {
      const result = getCharacters({ sort: 'invalidKey' });
      expect(getIds(result)).toEqual(expectedNameAsc);
    });

    test("devrait utiliser l'ordre (asc) si 'order' est invalide", () => {
      // On teste avec 'modified' pour s'assurer que 'asc' est bien appliqué
      const result = getCharacters({ sort: 'modified', order: 'invalidOrder' });
      expect(getIds(result)).toEqual(expectedDateAsc);
    });

    test('devrait retourner une nouvelle instance du tableau (immutabilité)', () => {
      const result = getCharacters();
      
      // 1. Vérifie que c'est un nouveau tableau
      expect(result).not.toBe(originalCharacters); 
      
      // 2. Vérifie que le tableau original (mocké) n'a pas été modifié
      // (L'original importé par Jest est 'originalCharacters', qui pointe vers notre mock)
      const originalMockOrder = [1, 2, 3, 4]; // Ordre de notre mock
      expect(getIds(originalCharacters)).toEqual(originalMockOrder);
    });
  });

  // --- Tests pour getCharacterById (mis à jour avec le nouveau mock) ---

  describe('getCharacterById', () => {
    test("devrait retourner le bon personnage si l'ID est valide", () => {
      const result = getCharacterById(2); // Demande 'A-Character'
      expect(result).toEqual({
        id: 2,
        name: 'A-Character',
        modified: '2023-01-03T00:00:00Z',
      });
    });

    test("devrait lever une erreur si aucun personnage n'est trouvé", () => {
      const invalidId = 999;
      // On vérifie que la fonction lève (throw) une erreur
      expect(() => getCharacterById(invalidId)).toThrow(
        `Aucun personnage trouvé avec l'id ${invalidId}`
      );
    });
  });
});