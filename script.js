
const result = document.getElementById('result');

const filter = document.getElementById('filter');

const select = document.getElementById('select');

select.addEventListener('change', (e) => searchByCountry(e.target.value));

filter.addEventListener('input', (e) => filterData(e.target.value));

// Declarar um array chamado listItens
let listItens = [];

// Declarar um arrays de nomes
let listNames = [
    {picture: 'https://randomuser.me/api/portraits/women/94.jpg', 
    country: 'Brasil', name: 'Ana Santos',age: 20, city: 'São Paulo'},

    {picture: 'https://randomuser.me/api/portraits/women/95.jpg', 
    country: 'Brasil',name: 'Dalva Duarte',age: 54, city: 'São Roque'},

    {picture: 'https://randomuser.me/api/portraits/women/96.jpg', 
    country: 'Brasil',name: 'Nayra Louise',age: 33, city: 'Cajamar'}
];

let dataJson = `
    {
        "results": [ 
            {"id": 1, 
            "name": "Caio Duarte", 
            "age": 34, 
            "city": "Cajamar", 
            "country": "Brasil", 
            "picture": "https://randomuser.me/api/portraits/men/57.jpg",
            "hobby": {"first": "Jogos de PC", "second": "Escutar música"}
        },

            {"id": 2, 
            "name": "Ricardo Alves", 
            "age": 23, 
            "city": "Roma", 
            "country": "Itália", 
            "picture": "https://randomuser.me/api/portraits/men/58.jpg",
            "hobby": {"first": "Assistir filmes", "second": "Jogar futebol"}
        },

            {"id": 3, 
            "name": "Sandro Alves", 
            "age": 58, 
            "city": "Lisboa", 
            "country": "Portugal", 
            "picture": "https://randomuser.me/api/portraits/men/59.jpg",
            "hobby": {"first": "Assistir filmes", "second": "Jogar futebol"}
        }
        ]
    }
`

// Convertendo um json em um objeto Javascript 
let response = JSON.parse(dataJson);

// Exibir o conteudo da variável response no console 
// console.log(response.results);

// Declarar um array chamado listResults
// let listResults = response.results;
let listResults = []


// Exibindo o conteudo na aba console do navegador 
// console.log(listNames);

// Listar os nomes das pessoas
async function getData(){

    const res = await fetch('https://randomuser.me/api/?results=30');

    //console.log(res.status);
    //let data = await res.json();

    const {results} = await res.json();
    console.log(results);

    //removendo todos os itens da ul result 
    result.innerHTML = '';

    //1º passo- utilizar a função forEach do JS para percorrer os itens do array listNames
    results.forEach(user => {

        // 2º passo- criar um elemento li com o item do array
        const li = document.createElement('li');

        listItens.push(li);

        listResults.push(user);

        li.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first}</h4>
                <p>${user.location.city} | ${user.location.country}</p>
                <p>${user.dob.age} anos </p>
            </div>
        `;

            // 3º passo- Adiciona o li com o item na lista result
            result.appendChild(li);

    });
}

// Declarar a função filterData

function filterData(searchTerm){

    listItens.forEach(item =>{

        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())){

            item.classList.remove('hide');

        } else{

            item.classList.add('hide');
        }
    });
}

// Criar a função que pesquisa por país
function searchByCountry(value){

    console.log("O país selecionado foi:" + value);

    // Limpar os itens da nossa lista
    result.innerHTML = '';

    listResults.forEach(user => {

        if(user.location.country === value){
            // 2º passo- criar um elemento li com o item do array
            const li = document.createElement('li');

            listItens.push(li);

            li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first}</h4>
                <p>${user.location.city} | ${user.location.country}</p>
                <p>${user.dob.age} anos </p>
            </div>
            `;

            // 3º passo- Adiciona o li com o item na lista result
            result.appendChild(li);
        }

    });

}
