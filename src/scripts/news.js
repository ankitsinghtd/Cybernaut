const apiKey = '_REDACTED_';
const apiUrl = 'https://newsapi.org/v2/everything?q=';
const loadingIndicator = document.getElementById("loading-indicator");
const loader = document.querySelector(".loader");
const cardContainer = document.getElementById("cards-container");

window.addEventListener('load', () => {
    showLoadingIndicator();
    fetchNews("cybersecurity");
});

async function fetchNews(query) {
    try {
        const response = await fetch(`${apiUrl}${query}&apiKey=${apiKey}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok (status: ${response.status})`);
        }

        const data = await response.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        hideLoadingIndicator();
        displayErrorMessage();
    }
}

function showLoadingIndicator() {
    loadingIndicator.style.display = "block";
    loader.style.display = "flex";
    cardContainer.style.display = "none";
}

function hideLoadingIndicator() {
    loadingIndicator.style.display = "none";
    loader.style.display = "none";
}

function displayErrorMessage() {
    cardContainer.innerHTML = "<p>An error occurred while fetching news. Please try again later.</p>";
}

function bindData(articles) {
    hideLoadingIndicator();
    cardContainer.style.display = "flex";
    const newsTemplate = document.getElementById("template-news-card");
    cardContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsTemplate.content.cloneNode(true);
        fillDatainCards(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

async function fillDatainCards(cardClone, articles) {
    const newsImg = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSrc = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    const newsLink = cardClone.querySelector("#news-link");
    const newsHlink = cardClone.querySelector("#news-h-link");

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;
    newsLink.href = articles.url;
    newsHlink.href = articles.url;

    const date = new Date(articles.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    newsSrc.innerHTML = `${articles.source.name}, ${date}`;
}
