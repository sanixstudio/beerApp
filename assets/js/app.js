// [x] test fecth API call
// apply to alchohol filter triggers


const $ = (elm) => document.querySelector(elm);
const $$ = (elm) => document.querySelectorAll(elm);

const print = console.log;
const BASE_URL = 'https://api.punkapi.com/v2/beers';
const placeholder = `https://demofree.sirv.com/nope-not-here.jpg`

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

const hoppinessAll = $('#all-hoppiness');
const hoppinessSm = $('#hoppiness-sm');
const hoppinessMd = $('#hoppiness-md');
const hoppinessLg = $('#hoppiness-lg');

const pageNumber = $('#page-number');
const prevButton = $('#pre-btn');
const nextButton = $('#next-btn');

let page = 1;

pageNumber.textContent = page;

const clearBeerResults = () => $('.beer-results').innerHTML = "";

async function fetchBeers (url) {
    console.log(page)
    clearBeerResults()

    try {
        const response = await fetch(url);
        const data = await response.json();
        print(data.length);
        
        if(page === 1){
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }

        if(data.length === 0){
            $('.beer-results').innerHTML = `<h1>Sorry no more results >:( </h1>`;
        }
    
        if(data.length < 25) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
        
        for (const beer of data) {
            const { name,description,tagline,image_url,abv,ibu,food_pairing } = beer;
            const [ food_item_1,food_item_2,food_item_3 ] = food_pairing;
            const dishes = `Pair with: ${food_item_1}, ${food_item_2}, and ${food_item_3}`;

            $('.beer-results').innerHTML += (`
                <div class="card">
                    <div class="card-front">
                        <img src="${ image_url || placeholder }" alt="card-img">
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

hoppinessAll.addEventListener('click', () => fetchBeers(BASE_URL))
hoppinessSm.addEventListener('click', () => fetchBeers(SM_IBU_URL))
hoppinessMd.addEventListener('click', () => fetchBeers(MD_IBU_URL))
hoppinessLg.addEventListener('click', () => fetchBeers(LG_IBU_URL))

prevButton.addEventListener('click', () => {
    page--;
    pageNumber.textContent = page;
    fetchBeers(`${BASE_URL + '?page=' + page}`)
    print(`${BASE_URL + '?page=' + page}`)
})

nextButton.addEventListener('click', () => {
    page++;
    pageNumber.textContent = page;
    fetchBeers(`${BASE_URL + '?page=' + page}`)
    print(`${BASE_URL + '?page=' + page}`)
})