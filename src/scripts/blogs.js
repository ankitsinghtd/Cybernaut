// Add this JavaScript code to your blogs.html file or a separate JS file
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitArticle');

    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const articleTitle = document.getElementById('articleTitle').value;
        const articleDesc = document.getElementById('articleDesc').value;
        const articleContent = document.getElementById('articleContent').value;

        const articleData = {
            title: articleTitle,
            description: articleDesc,
            content: articleContent,
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
                // Article submitted successfully
                alert('Article submitted successfully.');
                // You can also close the modal or redirect the user.
            } else {
                // Handle any errors here
                alert('Error submitting article. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting article:', error);
        }
    });
});
