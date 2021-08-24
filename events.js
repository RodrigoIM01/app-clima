import render from "../utils/render.js";
import { setUnit } from "../storage/action.js";
import storage from "./storage/createStore.js";
const $buttonTemp = document.querySelectorAll('.buttonTemp');
const $btnChangeCelsius = document.querySelector('[data-unit="metric"]');
const $btnChangeFarenheit = document.querySelector('[data-unit="imperial"]');
const $findCountryMenu =  document.querySelector('#findCountry');
const $formFindCountry = document.querySelector('#form-find');
const $countries = document.querySelector('#countries');
const $closeSearchMenu = document.querySelector('#closeSearchMenu');
const $inputLocation = document.querySelector('#inputLocation');
const $searchPlaces = document.querySelector('#searchPlaces');

$btnChangeCelsius.addEventListener('click', function () {
    
    if(!this.classList.contains('active')) {
        
        storage.dispatch(setUnit('metric'));
        const store = storage.getStore();

        $buttonTemp.forEach(function(button) {
            if(button !== this) {
                button.classList.remove('active');
            }
        }.bind(this));
    
        render({
            units: store.unit,
        });
        this.classList.add('active')

    }
    
});

$btnChangeFarenheit.addEventListener('click', function () {
    
    if(!this.classList.contains('active')) {
        
        storage.dispatch(setUnit('imperial'));
        const store = storage.getStore();
        $buttonTemp.forEach(function(button) {
            if(button !== this) {
                button.classList.remove('active');
            }
        }.bind(this));
    
        render({
            units: store.unit,
        });
        this.classList.add('active')

    }
    
});

$buttonTemp.forEach(function(button) {
    const store = storage.getStore();
    const dataset = button.dataset.unit

    if(store.unit === dataset) {
        button.classList.add('active');
    }
})

$formFindCountry.addEventListener('submit', function(e) {
    e.preventDefault();
})

$searchPlaces.addEventListener('click', function(e) {
    $findCountryMenu.classList.add('active')
})

$closeSearchMenu.addEventListener('click', function(e) {
    $findCountryMenu.classList.remove('active')
})

$inputLocation.addEventListener('input', async function(e) {
    const value = e.target.value;
    if(value.length > 2) {
        const response = await fetch(`http://localhost:3000/api/countries/${value}`)
        const data = await response.json()

        $countries.innerHTML = '';
        data.forEach(function(country) {
            const container = document.createElement('div');
            const paragraph = document.createElement('p');
            const icon = document.createElement('p');

            container.className = 'countrySuggestion';
            icon.className = 'countrySuggestionArrow';
            paragraph.innerHTML = country.name;
            icon.innerHTML = '>';
            container.append(paragraph, icon);

            $countries.appendChild(container);
        })
    } else {
        $countries.innerHTML = '';
    }
})

// Creditos al dueño del JSON con los paises
// https://gist.github.com/keeguon/2310008


// $buttonTemp.forEach(function(button) {
//     button.addEventListener('click', function() {
//         const store = storage.getStore();
//         if(!this.classList.contains('active')) {
//             this.classList.add('active');
//             // remove classList of other buttons
//             $buttonTemp.forEach(function(button) {
//                 if(button !== this) {
//                     button.classList.remove('active');
//                     storage.dispatch(setUnit(store.unit === 'metric'? 'imperial' : 'metric'))
                    
//                     render({
//                         units: store.unit === 'metric'? 'imperial' : 'metric'
//                     })
//                 }
//             }.bind(this));
//         }
//     })
// });