document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('your-article-api');
        if (!response.ok) {
            throw new Error('Failed to fetch article data.');
        }

        const articleData = await response.json();
        const articleTitleElement = document.getElementById('articleTitle');
        const articleAuthorElement = document.getElementById('articleAuthor');
        const articleDateElement = document.getElementById('articleDate');
        const articleContentElement = document.getElementById('articleContent');

        articleTitleElement.textContent = articleData.title;
        articleAuthorElement.textContent = `Author: ${articleData.author}`;
        articleDateElement.textContent = `Date: ${articleData.date}`;
        articleContentElement.innerHTML = articleData.content;
    } catch (error) {
        console.error('Error fetching or displaying article:', error);
    }
});