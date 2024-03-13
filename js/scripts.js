let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur', height: 7, types: ['gas', 'poison']
        },
        {
            name: 'Charmander', height: 6, types: ['blaze', 'solar-power']
        },
        {
            name: 'Beedrill', height: 1, types: ['swarm', 'sniper']
        }
    ];

    function add(pokemon){
        if (typeof pokemon === "object"){
            if(Object.keys(pokemon) === Object.keys(pokemonList[0])){
                alert("New Pokemon!");
                pokemonList.push(pokemon);
            }
            else{
                alert("Pokemon not found!")
            }
        }
    }

    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon){
        pokemonList = document.querySelector('ul');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function(event){
            showDetails(pokemon)
        })
    }

    function showDetails(pokemon){
        console.log(pokemon)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    };

    
})();

pokemonRepository.add({name: 'Persian', height: 10, types: ['limber', 'technician', 'unnerve']});

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    
    });




