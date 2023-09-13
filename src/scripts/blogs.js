// Add this JavaScript code to your blogs.html file or a separate JS file
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitArticle');

    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const articleTitle = document.getElementById('articleTitle').value;
        const articleAuthor=document.getElementById('authorName').value;
        const articleDesc = document.getElementById('articleDesc').value;
        const articleContent = document.getElementById('articleContent').value;
        const curdate=(new Date()).toDateString();
        const articleData = {
            title: articleTitle,
            author:articleAuthor,
            description: articleDesc,
            content: articleContent,
            date:curdate.toString()
        };

        try {
            const response = await fetch('/submit-article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
            });

            if (response.ok) {
                
                alert('Article submitted successfully.');
            } else {
                alert('Error submitting article. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting article:', error);
        }
    });
});
async function displayFeaturedArticles() {
    const articlesContainer = document.querySelector('.home-articles');

    try {
        const response = await fetch('/featured-articles'); // Replace with the correct endpoint on your server
        const featuredArticles = await response.json();
        //console.log(featuredArticles);
        featuredArticles.forEach((articleData) => {
            const articleElement = createArticleElement(articleData); // Create HTML element for each article
            articlesContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Error fetching featured articles:', error);
    }
}

function createArticleElement(articleData) {
    const articleContainer = document.createElement('div');
    articleContainer.classList.add('home-article'); 

    const articleContent = document.createElement('div');
    articleContent.classList.add('home-article-content', 'font1');

    const articleLink = document.createElement('a');
    articleLink.href = './articles/articles.html'; 
    articleLink.innerHTML = `<h3>${articleData.title}</h3>`;
    articleContent.appendChild(articleLink);

    const Desc = document.createElement('div');
    Desc.textContent = articleData.description;
    articleContent.appendChild(Desc); 

    const articleInfo = document.createElement('span');
    articleInfo.textContent = `${articleData.author} | ${articleData.date}`;
    articleContent.appendChild(articleInfo); 

    articleContainer.appendChild(articleContent);

    return articleContainer;
}
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedArticles();
});
