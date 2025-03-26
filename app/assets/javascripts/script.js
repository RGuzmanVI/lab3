function fetchNews() {
    const apiKey = "c78b4fe26192474eba25ffa8c29ef13c";
    const url = `https://newsapi.org/v2/top-headlines?category=technology&pageSize=10&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === "ok") {
                const articles = data.articles.slice(0, 10);
                const newsSection = document.getElementById("newsSection");
                newsSection.innerHTML = ""; 

                articles.forEach(article => {
                    const newsCard = document.createElement("div");
                    newsCard.className = "col-md-6 mb-3";
                    newsCard.innerHTML = `
                        <div class="card h-100">
                            <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="News Image">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description || "No description available."}</p>
                                <p class="text-muted">Source: ${article.source.name}</p>
                                <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
                            </div>
                        </div>
                    `;
                    newsSection.appendChild(newsCard);
                });
            } else {
                document.getElementById("newsSection").innerHTML = "<p class='text-danger'>Failed to fetch news.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching news:", error);
            document.getElementById("newsSection").innerHTML = "<p class='text-danger'>Error loading news.</p>";
        });
}

function updateText() {
    var input = document.getElementById("userInput").value;
    document.getElementById("dynamicSection").innerText = input;
}