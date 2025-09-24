function getCharacters() {
    fetch('data/characters.json') // ✅ chemin relatif
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des personnages');
            }
            return response.json();
        })
        .then(data => {
            console.log('Personnages Marvel :', data);
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

getCharacters();
