document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const articleID = urlParams.get('articleID');    
        const response = await fetch(`/articlepage`);
        if (!response.ok) {
            throw new Error('Failed to fetch article data.');
        }
        const articleData = await response.json();
        console.log(articleID);
        console.log(articleData);
        const data=articleData[articleID];
        const articleTitleElement = document.getElementById('articleTitle');
        const articleAuthorElement = document.getElementById('articleAuthor');
        const articleDateElement = document.getElementById('articleDate');
        const articleContentElement = document.getElementById('articleContent');

        articleTitleElement.textContent = data.title;
        articleAuthorElement.textContent = `Author: ${data.author}`;
        articleDateElement.textContent = `Date: ${data.date}`;
        articleContentElement.innerHTML = data.content;
    } catch (error) {
        console.error('Error fetching or displaying article:', error);
    }
});