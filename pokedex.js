const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;

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
const fetchPokemons = async () => {
    for (let i=1; i<=pokemons_number; i++){
        await getPokemon(i);
    }
}

const getPokemon = async id =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    //fetch it
    const res = await fetch(url);
    const pokemon = await res.json();
    console.log(pokemon);
    createPokemonCard(pokemon);
}

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
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
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
