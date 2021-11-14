export default function fetchCountry(countryName){
   return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`)
       .then(response => {
           if (!response.ok) {
               return Promise.reject('Oops, there is no country with that name');
                }
           return response.json()
       })
};