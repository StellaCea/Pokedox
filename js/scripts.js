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
            showModal(pokemon.name, pokemon.imageUrl, 'Height: ' + pokemon.height)
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

    function showModal(title, url, text){
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerText = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerHTML = 'Close';
        closeButton.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let imgElement = document.createElement('img');
        imgElement.src = url;

        let contentElement = document.createElement('p')
        contentElement.innerText = text

        modal.appendChild(closeButton);
        modal.appendChild(titleElement);
        modal.appendChild(imgElement);
        modal.appendChild(contentElement);

        modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer){
                hideModal();
            }
        })
    }

    function hideModal(){
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    })


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





