const dark = document.querySelector("#dark");
const body = document.querySelector("body");
const light = document.querySelector("#light");
const localStorageMode = localStorage.getItem("mode");
const countriesContainer = document.querySelector(".countries-container");

if (localStorageMode) {
  body.classList.add("dark-mode");
  dark.classList.toggle("hidden");
  light.classList.toggle("hidden");
}

const toggleBtn = () => {
  body.classList.toggle("dark-mode");
};

dark.addEventListener("click", () => {
  toggleBtn();
  localStorage.setItem("mode", "dark-mode");
});

light.addEventListener("click", () => {
  toggleBtn();
  localStorage.setItem("mode", "");
});

const filterByRegion = document.querySelector(".countries__select");
const searchInput = document.querySelector(".countries__search input");

let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/read.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countriesContainer.append(countryCard);
  });
}


