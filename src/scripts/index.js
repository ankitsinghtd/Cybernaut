const themeToggle = document.getElementById('theme-toggle');
const themeStylesheet = document.getElementById('theme-stylesheet');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    themeStylesheet.href = currentTheme;
}

themeToggle.addEventListener('click', () => {
    console.log("click");
    if (themeStylesheet.href.endsWith('src/styles/index.css')) {
        themeStylesheet.href = 'src/styles/index-dark.css';
        localStorage.setItem('theme', 'src/styles/index-dark.css');
    } else {
        themeStylesheet.href = 'src/styles/index.css';
        localStorage.setItem('theme', 'src/styles/index.css');
    }
});
