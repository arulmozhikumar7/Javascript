let apiKey = "";  
let page = 1;
const pageSize = 6;
const newsContainer = document.getElementById("news-container");
const loadingIndicator = document.getElementById("loading");
let isFetching = false; 

async function loadEnv() {
    try {
        const response = await fetch("env.json");
        const env = await response.json();
        apiKey = env.NEWS_API_KEY;
        fetchNews(); 
    } catch (error) {
        console.error("Error loading env.json:", error);
    }
}

async function fetchNews() {
    if (!apiKey || isFetching) return;
    isFetching = true;  
    loadingIndicator.style.display = "block";

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=ronaldo&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);
        const data = await response.json();
        
        if (data.articles.length === 0) {
            loadingIndicator.innerText = "✅ No more news available.";
            return;
        }

        displayNews(data.articles);
        page++;
    } catch (error) {
        console.error("Error fetching news:", error);
    } finally {
        isFetching = false;
        loadingIndicator.style.display = "none";
    }
}

function displayNews(articles) {
    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        newsCard.innerHTML = `
            <img src="${article.urlToImage}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
        `;

        newsContainer.appendChild(newsCard);
    });
}

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !isFetching) {
        fetchNews();
    }
}

function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

window.addEventListener("scroll", throttle(handleScroll, 500));

loadEnv();