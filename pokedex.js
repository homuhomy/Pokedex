const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const searchInput = document.querySelector("[data-search]");

// Add a new array to store all Pokemon
const pokemons = [];


const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const main_types = Object.keys(colors); //take out the keys

//TODO: Modify the fetchPokemons function to save
// the fetched Pokemon data in an array for easy filtering
const fetchPokemons = async () => {

    for (let i=1; i<=pokemons_number; i++){
        await getPokemon(i);
    }
    displayPokemons(pokemons); // Display all the fetched Pokemon initially
}

// Create a new function to display an array of Pokemon on the page
function displayPokemons(pokemonList) {
    poke_container.innerHTML = ""; // Clear the container first
    pokemonList.forEach(createPokemonCard); // Create and display a card for each Pokemon
}

const getPokemon = async id =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    //fetch it
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
    pokemons.push(pokemon); // Save the Pokemon data in the array
}

//filter the displayed pokemon
function filterPokemons(searchText) {
    const filteredPokemons = pokemons.filter(pokemon => {
        const name = pokemon.name.toLowerCase();
        return name.includes(searchText.toLowerCase());
    });
    displayPokemons(filteredPokemons);
}

//search for pokemon according to user input
searchInput.addEventListener("input", (e) =>{
    const value = e.target.value;
    filterPokemons(value);
})

fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    const pokemon_type = pokemon.types.map(element => element.type.name);
    const type = main_types.find(
        type => pokemon_type.indexOf(type) > -1
    );

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonElement.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container">
<!--    or can use pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png-->
        <img alt="pokemon image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
    </div>
    
    <div class="info">
        <span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>
        <header class="text-center fs-5">${name}</header>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `;

    pokemonElement.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonElement);
}

