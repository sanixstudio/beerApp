// [x] test fecth API call
// apply to alchohol filter triggers


const $ = (elm) => document.querySelector(elm);
const $$ = (elm) => document.querySelectorAll(elm);

/*



*/

const print = console.log;
const BASE_URL = 'https://api.punkapi.com/v2/beers';

const SM_ALC_URL = `${BASE_URL}/?abv_lt=4.6`;
const MD_ALC_URL = `${BASE_URL}/?abv_gt=4.5&abv_lt=7.6`;
const LG_ALC_URL = `${BASE_URL}/?abv_gt=7.5`;

const SM_IBU_URL = `${BASE_URL}/?ibu_lt=35`;
const MD_IBU_URL = `${BASE_URL}/?ibu_gt=34&ibu_lt=75`;
const LG_IBU_URL = `${BASE_URL}/?ibu_gt=74`;

const alcoholAll = $('#all-alcohol');
const alcoholSm = $('#alcohol-sm');
const alcoholMd = $('#alcohol-md');
const alcoholLg = $('#alcohol-lg');

const clearBeerResults = () => $('.beer-results').innerHTML = "";

async function fetchBeers (url) {
    clearBeerResults()
    try {
        const response = await fetch(url);
        const data = await response.json();
        print(data);
        
        for (const beer of data) {
            const { name,description,tagline,image_url,abv,ibu,food_pairing } = beer;
            const [ food_item_1,food_item_2,food_item_3 ] = food_pairing;
            const dishes = `Pair with: ${food_item_1}, ${food_item_2}, and ${food_item_3}`;

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
    } catch (error) { console.error(error) }
}


fetchBeers(BASE_URL)
alcoholAll.addEventListener('click', () => fetchBeers(BASE_URL))
alcoholSm.addEventListener('click', () => fetchBeers(SM_ALC_URL))
alcoholMd.addEventListener('click', () => fetchBeers(MD_ALC_URL))
alcoholLg.addEventListener('click', () => fetchBeers(LG_ALC_URL))
