import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchCountries} from "./js/fetchCountries"

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    listEl: document.querySelector('.country-list'),
    divEl: document.querySelector('.country-info'),
}
refs.inputEl.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));
//console.log(refs.inputEl);

function onSearch(e) {
    e.preventDefault();

    const name = refs.inputEl.value.trim();
    //console.log(name);

    
    clearContainer();
    if (name) 
        //console.log(name);
        fetchCountries(name)
           
           .then(data => searchCountry(data))
        
    
    
}
function searchCountry(countries) {
//console.log(countries);
    
    if (countries.length > 10) {
       Notify.success("Too many matches found. Please enter a more specific name.");
    } else if (countries.length > 2 && countries.length < 10) {
        renderCountryList(countries);
    } else if (countries.length === 1) {
        renderCountryCard(countries);
    } else {
        clearError(countries);
    } 
   
}


 function renderCountryCard(countries) {
     const markupCard = countries.map((({ name, capital, population, flags, languages }) => {
         return `<li class="country-list__item">
      <div class="country-list__title">
        <img src="${flags.svg}" style="width: 45px; height: 45px" />
        <h2>${name}</h2>
      </div>
      <p><strong>Capital:</strong> ${capital}</p>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Languages:</strong> ${languages.map(lang=>lang.name)}</p>
    </li>`;
     })).join("");
    refs.listEl.insertAdjacentHTML('beforeend', markupCard)  
};


function renderCountryList(countries) {

     const markup = countries.map((({ name, flags }) => {
         return `<li class="country-list__item">
        <img src=${flags.svg}  style="width:40px;height:40px"/>
         <h2>${name}</h2>
        
                </li >`;
     })).join("");
    refs.listEl.insertAdjacentHTML('beforeend', markup)  
}

function clearError(countries) {
    if (countries.length === 0 ) {
        throw new Error("404");
    } else {
        Notify.failure("Oops, there is no country with that name");
    }
}

// function checkSpaces(string) {
//   return string.trim() !== '';
// }
function clearContainer() {
    refs.listEl.innerHTML = '';
   
}


