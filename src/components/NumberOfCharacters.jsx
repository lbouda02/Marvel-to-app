// src/components/NumberOfCharacters.jsx

/**
 * NumberOfCharacters component
 * @param {*} characters - Array of characters, default is an empty array
 * @returns JSX element displaying the number of characters
 */
export default function NumberOfCharacters({ characters = [] }) {
    const count = characters.length;

    if (count === 0) {
        return <p>There is no character</p>;
    }

    if (count === 1) {
        return <p>There is 1 character</p>;
    }

    return <p>There are {count} characters</p>;
}
