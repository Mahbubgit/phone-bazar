const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    // searchField.value = '';

    if (searchText == '') {
        // please write something to display
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
            .catch(error => displayError(error));
    }
}

searchMobile('phone');

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

//
const displaySearchResult = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    // console.log(searchResult);
    searchResult.textContent = '';
    if (phones == null) {
        const div = document.createElement('div');
        div.innerHTML = `
        <p class="text-center mx-auto">No result found!</p>
        `;
        searchResult.appendChild(div);
    }
    else {
        phones.forEach(phone => {
            // console.log(phone);
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
        })
    }
}

const loadPhoneDetail = id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data));
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-detail');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="card h-75 mt-2 p-2">
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
