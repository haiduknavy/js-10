import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from "lodash.debounce";
import getRefs from './js/get-refs';
import fetchCountry from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput(e){
    const value = e.target.value;
        if (value === '') {
            resetAll();
            value.trim()
            return;
        }
    resetAll();
    fetchCountry(value)
        .then(checkСonditions)
        .catch(error => {Notify.failure("Oops, there is no country with that name")})
};

function checkСonditions(response) {
    if (response.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (response.length >= 2 && response.length <= 10) {
        renderCountries(response);
    } else if (response.length === 1) {
                renderCountry(response)
    };
};

function renderCountries(countries) {
    const murkup = countries.map(({name,flags}) => {
        return ` <li class='country-list__item'>
        <img src="${flags.svg}" alt="" class='country-list__img'>
        <p class='country-list__text'>${name.official}</p></li>`
    }).join("");
  refs.list.insertAdjacentHTML('beforeend',murkup)
};

function renderCountry(country) {
    const murkup = country.map(({name,capital,population,flags,languages}) => {
        return ` <ul class="country-info_list">
        <li class="country-info__item"><img src="${flags.svg}" alt="" class='country-info__img'>
        <h1 class="country-info__title">${name.official}</h1></li>
        <li class="country-info__item"><b class='country-info__text'>Capital:</b><p>${capital}</p></li>
        <li class="country-info__item"><b class='country-info__text'>Population:</b><p>${population}</p></li>
        <li class="country-info__item"><b class='country-info__text'>Languages:</b><p>${Object.values(languages)}</p></li>
      </ul>`
    }).join("");
  refs.info.insertAdjacentHTML('beforeend',murkup)
};

function resetAll() {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
};
