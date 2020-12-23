// [x] test fecth API call
// apply to alchohol filter triggers


const $ = (elm) => document.querySelector(elm);
const $$ = (elm) => document.querySelectorAll(elm);

let abvLevel = "";
let ibuLevel = "";

const print = console.log;
// URL.com/?pagination= &abv= &ibu
const BASE_URL = 'https://api.punkapi.com/v2/beers';
const placeholder = `https://demofree.sirv.com/nope-not-here.jpg`

const levels = {
    smAbv: "&abv_lt=4.6",
    mdAbv: "&abv_gt=4.5&abv_lt=7.6",
    lgAbv: "&abv_gt=7.5",
    smIbu: "&ibu_lt=35",
    mdIbu: "&ibu_gt=34&ibu_lt=75",
    lgIbu: "&ibu_gt=74"
}

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

alcoholAll.addEventListener('click', () => {
    abvLevel = "";
    page = 1;
    pageNumber.textContent = page;
    let pageNum = "?page=" + page
    fetchBeers(BASE_URL + pageNum + abvLevel + ibuLevel)
})

// smAbv
alcoholSm.addEventListener('click', () => {
    abvLevel = levels.smAbv
    let pageNum = "?page=" + page 
    pageNumber.textContent = page;
    fetchBeers(BASE_URL + pageNum + abvLevel + ibuLevel)
    print(BASE_URL + pageNum + abvLevel + ibuLevel)
})

// mdAbv
alcoholMd.addEventListener('click', () => {
    abvLevel = levels.mdAbv
    let pageNum = "?page=" + page 
    pageNumber.textContent = page;
    fetchBeers(BASE_URL + pageNum + abvLevel + ibuLevel)
    print(BASE_URL + pageNum + abvLevel + ibuLevel)
})

// lgAbv
alcoholLg.addEventListener('click', () => {
    abvLevel = levels.lgAbv
    let pageNum = "?page=" + page 
    pageNumber.textContent = page;
    fetchBeers(BASE_URL + pageNum + abvLevel + ibuLevel)
    print(BASE_URL + pageNum + abvLevel + ibuLevel)
})

hoppinessAll.addEventListener('click', () => {
    ibuLevel = "";
    page = 1;
    let pageNum = "?page=" + page
    pageNumber.textContent = page;
    fetchBeers(BASE_URL + pageNum + abvLevel + ibuLevel)
})

// smIbu
hoppinessSm.addEventListener('click', () => {
    ibuLevel = levels.smIbu
    page = 1;
    let pageNum = "?page=" + page 
    pageNumber.textContent = page;
    fetchBeers(BASE_URL + pageNum + abvLevel + ibuLevel)
    print(BASE_URL + pageNum + abvLevel + ibuLevel)
})

// mgIbu
hoppinessMd.addEventListener('click', () => {
    ibuLevel = levels.mdIbu
    page = 1;
    let pageNum = "?page=" + page 
    pageNumber.textContent = page;
    fetchBeers(BASE_URL + pageNum + abvLevel + ibuLevel)
    print(BASE_URL + pageNum + abvLevel + ibuLevel)
})

// lgIbu
hoppinessLg.addEventListener('click', () => {
    ibuLevel = levels.lgIbu
    page = 1;
    let pageNum = "?page=" + page 
    pageNumber.textContent = page;
    fetchBeers(BASE_URL + pageNum + abvLevel + ibuLevel)
    print(BASE_URL + pageNum + abvLevel + ibuLevel)
})

// pagination
prevButton.addEventListener('click', () => {
    page--;
    pageNumber.textContent = page;
    fetchBeers(`${BASE_URL + '?page=' + page + abvLevel + ibuLevel}`)
    print(`${BASE_URL + '?page=' + page + abvLevel + ibuLevel}`)
})

nextButton.addEventListener('click', () => {
    page++;
    pageNumber.textContent = page;
    fetchBeers(`${BASE_URL + '?page=' + page + abvLevel + ibuLevel}`)
    print(`${BASE_URL + '?page=' + page + abvLevel + ibuLevel}`)
})

const abvFilterBtns = $$('.alcohol-levels .filterBtn')
const ibuFilterBtns = $$('.hoppiness-levels .filterBtn')

abvFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const target = e.target.closest("img")
        const active = $('.alcohol-levels .active');
        
        if (active) {
            active.classList.remove('active')
        }

        target.classList.add('active')

    })
})

ibuFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const target = e.target.closest("img")
        const active = $('.hoppiness-levels .active');
        
        if (active) {
            active.classList.remove('active')
        }

        target.classList.add('active')

    })
})
