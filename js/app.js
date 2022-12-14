/************************************
 * Control error or empty message   *
 * **********************************/
const emptyMessage = displayStyle => {
    document.getElementById('empty-message').style.display = displayStyle;
}
const errorMessage = displayStyle => {
    document.getElementById('error-message').style.display = displayStyle;
}

/*********************
 * Control Spinner   *
 * *******************/
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

/*************************
 * Control Search Result *
 * **********************/
const clearSearchResult = () => {
    document.getElementById('search-result').textContent = '';
}

/********************************
 * Control Single Phone Detail  *
 * *****************************/
const clearSinglePhoneDetail = () => {
    document.getElementById('phone-detail').textContent = '';
}

/*************************************************************
 * Search by Phone Name (Display 20 or less than 20 images)  *
 * **********************************************************/
const searchPhone = () => {
    // display spinner
    toggleSpinner('block');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search field
    searchField.value = '';

    if (searchText == '') {  // When search field is empty
        emptyMessage('block');
        errorMessage('none');
        clearSearchResult();
        clearSinglePhoneDetail();
        toggleSpinner('none');
    }
    else {
        emptyMessage('none');

        // load valid search data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch20Result(data.data));
    }
}

/**************************
 * display search result  *
 **************************/
const displaySearch20Result = phones => {

    const searchResult = document.getElementById('search-result');
    // clean previous search result
    searchResult.textContent = '';
    if (phones.length == 0) {
        // display error message and hide spinner
        errorMessage('block');
        toggleSpinner('none');
    }
    else {
        // hide error message and previous phone detail(if exist)
        errorMessage('none');
        clearSinglePhoneDetail();
        let counter = 0;
        phones.forEach(phone => {
            counter++;
            if (counter <= 20) { // Display only 20 images if the result have more than 20.
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                <div class="card w-75">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2 class="card-title">${phone.brand} </h2>
                        <h4 class="card-title">${phone.phone_name}</h4>
                        <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-success w-75">Detail</button>
                    </div>
                 </div>
                `;
                searchResult.appendChild(div);
            }
        });
        // hide spinner
        toggleSpinner('none');
    }
}

/******************************************************
 * Start of Search by Phone Name (Display all images)  *
 * ****************************************************/
const searchAllPhone = () => {
    // display spinner
    toggleSpinner('block');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search field
    searchField.value = '';

    if (searchText == '') {  // When search field is empty
        emptyMessage('block');
        errorMessage('none');
        clearSearchResult();
        clearSinglePhoneDetail();
        toggleSpinner('none');
    }
    else {
        emptyMessage('none');

        // load valid search data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchAllResult(data.data));
    }
}

/*************************
 * Display Search Result *
 *************************/
const displaySearchAllResult = phones => {

    const searchResult = document.getElementById('search-result');
    // clean previous search result
    searchResult.textContent = '';
    if (phones.length == 0) {
        errorMessage('block');
        toggleSpinner('none');
    }
    else {
        errorMessage('none');
        clearSinglePhoneDetail();
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card w-75">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2 class="card-title">${phone.brand} </h2>
                        <h4 class="card-title">${phone.phone_name}</h4>
                        <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-success w-75">Detail</button>
                    </div>
                 </div>
                `;
            searchResult.appendChild(div);
            // }
        });
        // hide spinner
        toggleSpinner('none');
    }
}

/*****************************************************
 * End of Search by Phone Name (Display all images) **
 * ***************************************************/

/****************************
 * Click on Details Button **
 * **************************/
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data));
}

const displayPhoneDetail = phone => {
    // console.log(phone.data.mainFeatures);
    const phoneDetails = document.getElementById('phone-detail');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card h-100 my-1 p-2">
        <img src="${phone.data.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title">Name:        ${phone.data.name}</h4>
            <h5 class="card-title text-center text-white bg-dark">Main Features</h5>
            <p class="card-title">Release Date: ${phone.data.releaseDate ? phone.data.releaseDate : 'No Release Date Found'}</p>
            <hr>
            <p class="card-title">Chipset:      ${phone.data.mainFeatures.chipSet}</p>
            <hr>
            <p class="card-title">Display Size: ${phone.data.mainFeatures.chipSet}</p>
            <hr>
            <p class="card-title">RAM:          ${phone.data.mainFeatures.memory}</p>
            <hr>
            <p class="card-title">ROM:          ${phone.data.mainFeatures.storage}</p>
            <hr>
            <p class="card-title">Sensors: ${phone.data.mainFeatures.sensors}</p>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}
