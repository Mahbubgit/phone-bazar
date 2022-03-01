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

/*****************************
 * Search by Phone Name     **
 * ***************************/
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search field
    searchField.value = '';

    if (searchText == '') {  // When search field is empty
        emptyMessage('block');
        errorMessage('none');
        clearSearchResult();
        clearSinglePhoneDetail();
    }
    else {
        emptyMessage('none');

        // load valid search data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    }
}

// display search result
const displaySearchResult = phones => {
    // display spinner
    toggleSpinner('block');
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
            <div onclick="loadPhoneDetail('${phone.slug}')" class="card h-100 w-75 m-3 p-3">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${phone.phone_name}</h4>
                </div>
             </div>
            `;
            searchResult.appendChild(div);
        });
        // hide spinner
        toggleSpinner('none');
    }
}

const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data));
}

const displayPhoneDetail = phone => {
    const phoneDetails = document.getElementById('phone-detail');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card h-100 my-1 p-2">
        <img src="${phone.data.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title">${phone.data.name}</h4>
            <p class="card-title">${phone.data.releaseDate ? phone.data.releaseDate : 'No Release Date Found'}</p>
            <p class="card-title">${phone.data.mainFeatures.chipSet}</p>
            <p class="card-title">${phone.data.mainFeatures.memory}</p>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
}
