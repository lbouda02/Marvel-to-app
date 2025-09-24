function getCharacters() {
    fetch('data/characters.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des personnages');
            }
            return response.json();
        })
        .then(data => {
            console.log('Personnages Marvel :', data);

            // Récupérer la liste ul avec l'id "characters"
            const ul = document.getElementById('characters');

            // Vider la liste au cas où il y aurait des éléments statiques
            ul.innerHTML = '';

            // Ajouter un li pour chaque personnage
            data.forEach(character => {
                const li = document.createElement('li');
                li.textContent = character.name;
                ul.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

getCharacters();
