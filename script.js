// script.js

const accessKey = '1iekASWJicj3q3IQ0t7Gaib-1UJmw8CONNAfWPEsnMs';

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.querySelector(".search-result"); // Use querySelector to select by class
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1){
            searchResult.innerHTML ="";
        }

        const results = data.results;
        results.forEach(result => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });
        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = ''; // Clear previous search results
    searchImages();
});

// Run searchImages() initially (optional)
// searchImages();
showMoreBtn.addEventListener("click",()=>{
    page++;
    searchImages();
})