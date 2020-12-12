// [x] test fecth API call
// apply to alchohol filter triggers

const $ = (elm) => document.querySelector(elm);
const print = console.log;
const BASE_URL = 'https://api.punkapi.com/v2/beers';

async function fetchBeers () {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    for (const beer of data) {
        const { name,description,tagline,image_url,abv,ibu,food_pairing } = beer;
        const [ food_item_1,food_item_2,food_item_3 ] = food_pairing;
        const dishes = `Pair with: ${food_item_1}, ${food_item_2}, and ${food_item_3}`;

        // assign to card
        // beerResults.innerHTML += (`
        $('.beer-results').innerHTML += (`
            <div class="card">
                <div class="card-front">
                    <img src="${ image_url }" alt="card-img">
                    <h4>${ name }</h4>
                    <div class="content-levels">
                        <p class="abv">ABV: &nbsp;<span id="abv">${ abv }</span>%</p>
                        <p class="ibu">IBU: &nbsp;<span id="ibu">${ ibu }</span></p>
                    </div>
                </div>
                <div class="card-back">
                    <h4>${ name }</h4>
                    <p class="tagline">${ tagline }</p>
                    <p class="description">${ description }</p>
                    <i class="food-pair">${ dishes }</i>
                </div>
            </div>
        `);
    }

}

fetchBeers()