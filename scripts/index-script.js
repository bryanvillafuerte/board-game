'use strict';

var characterPromiseArray = [];
var charactersArray = [];

/*
DOM VARIABLES
 */
const playNow = document.querySelector('#playnow');


/*
CLASS DEFINITIONS
 */
class Character {
    name;
    gender;
    titles;
    image;
    token;
    constructor(name, gender, titles, image, token) {
        this.name = name;
        this.gender = gender;
        this.titles = titles;
        this.image = image;
        this.token = token;
    }
}

/*
HELPER FUNCTIONS
 */
const fetchCharacterById = function(characterId, charURI) {
    const uri = charURI.substring(0) + '/' + characterId.toString();
    return fetch(uri);
};

const createPromises = function(charIds) {
    const tmpPromises = [];
    Object.keys(charIds).forEach( item => {
        tmpPromises.push(fetchCharacterById(item, characterURI));
    });
    return tmpPromises;
};

const resolveAllPromises = async function(arrayOfPromises) {
    let characters = [];
    let values = await Promise.all(arrayOfPromises);
    values = values.map( res => res.json());

    return Promise.all(values).then( allChar => {
        allChar.forEach( function(char) {
            const index = char.url.lastIndexOf('/');
            const charId = char.url.slice(index + 1);
            characters.push(
                new Character(char.name, char.gender, char.titles, characterIds[charId].image, characterIds[charId].token)
            );
        });
        return characters;
    });
};

const chooseCharacter = function(character) {
    LocalStorage.set(StorageKeys.CHARACTER, character);
};

const clearStorage = function() {
    LocalStorage.clear();
};


const addListeners = function () {
    console.log('==== ADDING LISTENERS ====');
    characterRow.addEventListener('click', (event) => {
        const target = event.target;
        if (target.nodeName.toLowerCase() === 'img') {
            const name = target.getAttribute('data-char-name');
            const chosenChar = findCharacter(name, charactersArray);
            chooseCharacter(chosenChar);
        }
    });

    playNow.addEventListener('click', (event) => {
        const char = LocalStorage.get(StorageKeys.CHARACTER);
        if (!char) {
            alert('PLEASE SELECT A CHARACTER BEFORE PLAYING!');
            return;
        }

        if (confirm(`You chose ${char.name}. Do you want to proceed?`)) {
            location.href = 'board.html';

        } else {
            console.log('Player canceled');
        }
    });
};

/*
==========================
========== MAIN ==========
==========================
 */
const main = async function() {
    console.log('===== RUNNING MAIN ======');
    clearStorage();
    characterPromiseArray = createPromises(characterIds);
    charactersArray = await resolveAllPromises(characterPromiseArray);

    renderCharacters(charactersArray);
    addListeners();
};


(function() {
    main();
})();
