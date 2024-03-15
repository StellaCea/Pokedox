let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){
        if (Object.keys(pokemon).includes('name') &&
        (typeof pokemon === "object")){
            pokemonList.push(pokemon);
        } else {
            alert("Pokemon not found!")
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
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function loadList(){
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then (function (json) {
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response){
            return response.json();
        }).then (function (details) {
            hideLoadingMessage();
            item.imageUrl = details.sprites.front_defaul;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    function showLoadingMessage(){
        let loadingMessage = document.querySelector('.loading-status');
        let message = document.createElement('p')
        message.classList.add('status-message');
        message.innerText = 'Loading...'
        loadingMessage.append(message);
    }

    function hideLoadingMessage(){
        let message = document.querySelector('.status-message');
        message.parentElement.removeChild(message);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

    
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon)
    })
})





