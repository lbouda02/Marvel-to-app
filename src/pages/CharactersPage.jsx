import CharactersList from "../components/CharactersList";
import NumberOfCharacters from "../components/NumberOfCharacters";
import { useLoaderData, useNavigate, useLocation } from "react-router";

const CharactersPage = () => {
    // change the title of the page
    document.title = "Characters | Marvel App";

    // Get the list of characters and current sort params from the loader
    const { characters = [], sort: currentSort = 'name', order: currentOrder = 'asc' } = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    const updateQuery = (key, value) => {
        const params = new URLSearchParams(location.search);
        params.set(key, value);
        // ensure both params exist so defaults persist when one changes
        if (!params.has('sort')) params.set('sort', currentSort);
        if (!params.has('order')) params.set('order', currentOrder);
        navigate(`${location.pathname}?${params.toString()}`);
    }

    return (
        <>
            <h2>Marvel Characters</h2>

            <div style={{ marginBottom: 12 }}>
                <label style={{ marginRight: 12 }}>
                    Sort by:&nbsp;
                    <select value={currentSort} onChange={(e) => updateQuery('sort', e.target.value)}>
                        <option value="name">Name</option>
                        <option value="modified">Modified</option>
                    </select>
                </label>

                <label>
                    Order:&nbsp;
                    <select value={currentOrder} onChange={(e) => updateQuery('order', e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

            <CharactersList characters={characters} />
            <br />
            <NumberOfCharacters characters={characters} />
        </>
    );
};

export default CharactersPage;