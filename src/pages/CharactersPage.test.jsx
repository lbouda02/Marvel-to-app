// src/pages/CharactersPage.test.jsx

import { expect, test, describe, beforeEach } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import userEvent from '@testing-library/user-event'
import CharactersPage from './CharactersPage'

// Mock data for characters
const characters = [
    {
        id: "1",
        name: "Thor"
    },
    {
        id: "2",
        name: "Captain America"
    }
];

// Mock loader amélioré qui lit l'URL de la requête
// C'est crucial pour simuler la façon dont React Router recharge les données
const mockLoader = ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort') || 'name';
    const order = url.searchParams.get('order') || 'asc';
    
    // Retourne les personnages ET les paramètres de tri actuels
    return { characters, sort, order };
};

// Création du stub de route en utilisant le loader amélioré
const Stub = createRoutesStub([
    {
        path: '/characters',
        Component: CharactersPage,
        HydrateFallback: () => null,
        loader: mockLoader, // Utilisation du loader qui parse l'URL
    },
]);

// Fonction d'aide pour le rendu, encapsulant le stub
// Cela nous permet de spécifier une URL initiale pour chaque test
const renderPage = (initialEntry = '/characters') => {
    render(<Stub initialEntries={[initialEntry]} />);
};

describe('CharactersPage', () => {
    let user;

    // Initialiser userEvent avant chaque test
    beforeEach(() => {
        user = userEvent.setup();
        // Réinitialiser le titre du document si nécessaire
        document.title = "";
    });

    test('render CharactersPage component with default data and selections', async () => {
        // Rendu à l'URL de base
        renderPage('/characters');

        // Attendre que le titre apparaisse
        const heading = await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' });
        expect(heading).toBeInTheDocument();

        // Vérifier le titre du document
        expect(document.title).toBe('Characters | Marvel App');

        // Vérifier la présence des personnages
        expect(screen.getByText(characters[0].name)).toBeInTheDocument();
        expect(screen.getByText(characters[1].name)).toBeInTheDocument();
        
        // Vérifier le nombre de personnages
        const numberOfCharactersElement = screen.getByText(`There are ${characters.length} characters`);
        expect(numberOfCharactersElement).toBeInTheDocument();

        // **NOUVEAU** : Vérifier les valeurs par défaut des listes déroulantes
        // 'Sort by:' est un label, getByLabelText trouve le <select> associé
        expect(screen.getByLabelText(/Sort by:/)).toHaveValue('name');
        expect(screen.getByLabelText(/Order:/)).toHaveValue('asc');
    });

    test('should update sort parameter on change and persist order', async () => {
        renderPage('/characters');

        // Attendre que la page soit chargée
        await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' });

        // Simuler le changement de l'option de tri
        const sortSelect = screen.getByLabelText(/Sort by:/);
        await user.selectOptions(sortSelect, 'modified');

        // Vérifications :
        // 1. Le 'loader' a été rappelé avec la nouvelle URL.
        // 2. Le composant s'est re-rendu avec les nouvelles props du loader.
        // 3. La valeur de la liste déroulante 'sort' est maintenant 'modified'.
        // 4. La valeur 'order' a persisté à 'asc'.
        expect(sortSelect).toHaveValue('modified');
        expect(screen.getByLabelText(/Order:/)).toHaveValue('asc');
    });

    test('should update order parameter on change and persist sort', async () => {
        renderPage('/characters');

        // Attendre que la page soit chargée
        await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' });

        // Simuler le changement de l'option d'ordre
        const orderSelect = screen.getByLabelText(/Order:/);
        await user.selectOptions(orderSelect, 'desc');

        // Vérifications :
        // 1. La valeur 'order' est maintenant 'desc'.
        // 2. La valeur 'sort' a persisté à 'name'.
        expect(orderSelect).toHaveValue('desc');
        expect(screen.getByLabelText(/Sort by:/)).toHaveValue('name');
    });

    test('should persist non-default sort when order is changed', async () => {
        // Commencer avec une URL qui a déjà un paramètre non standard
        renderPage('/characters?sort=modified');

        // Attendre que la page soit chargée avec les données initiales
        await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' });

        // Vérifier l'état initial (basé sur l'URL)
        const sortSelect = screen.getByLabelText(/Sort by:/);
        const orderSelect = screen.getByLabelText(/Order:/);
        expect(sortSelect).toHaveValue('modified');
        expect(orderSelect).toHaveValue('asc');

        // Maintenant, changer l'ordre
        await user.selectOptions(orderSelect, 'desc');

        // Vérifications :
        // 1. La valeur 'order' est maintenant 'desc'.
        // 2. La valeur 'sort' non standard ('modified') a été persistée.
        //    Ceci teste directement la ligne `if (!params.has('sort')) params.set('sort', currentSort);`
        expect(orderSelect).toHaveValue('desc');
        expect(sortSelect).toHaveValue('modified');
    });
});