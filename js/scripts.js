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

    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.add({name: 'Persian', height: 10, types: ['limber', 'technician', 'unnerve']});

pokemonRepository.getAll().forEach(function(pokemon) {
        if(pokemon.height >4){
            console.log(pokemon.name + ' height ' + pokemon.height + ' types: ' + pokemon.types + " Wow, it's big!");
        }
        else{
            console.log(pokemon.name + ' height ' + pokemon.height + ' types: ' + pokemon.types);
        }
    });




