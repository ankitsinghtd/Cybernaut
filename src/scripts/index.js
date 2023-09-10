document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    let currentTheme = localStorage.getItem('theme-preference') || 'light';

    // Function to toggle the theme
    function toggleTheme() {
        if (currentTheme === 'light') {
            currentTheme = 'dark';
        } else {
            currentTheme = 'light';
        }

        themeStylesheet.href = `/src/styles/index-${currentTheme}.css`;
        localStorage.setItem('theme-preference', currentTheme);
    }

    // Set the initial theme
    themeStylesheet.href = `/src/styles/index-${currentTheme}.css`;

    // Attach the event listener to the button
    themeToggle.addEventListener('click', toggleTheme);

});


const sliderItems = [
    {
        id: 1,
        img: './src/images/cyber.jpg',
        subtitle: 'Tools',
        title: 'Domain Analysis',
        content: 'Unlock insights into website security with our Domain Analysis tools',
        link:'./src/pages/netanalysis.html'
    },
    {
        id: 2,
        img: './src/images/news.jpg',
        subtitle: 'News',
        title: 'Catch up on the last news related to cyber-security',
        content: 'Stay informed and safeguard your digital world! Visit our News page to catch up on the latest cyber security updates and insights. Your online safety matters.',
        link:'./src/pages/news.html'
    },
    {
        id: 3,
        img: './src/images/community.png',
        subtitle: 'Blogs',
        title: 'Cyber Insights: Explore Our Informative Blogs',
        content: 'Dive into our expertly curated blogs for valuable cyber insights, tips, and updates to enhance your online security',
        link:'./src/pages/blog.html'
    },
];

const container = document.querySelector('.container');
const sliderWrapper = document.getElementById('slider-wrapper');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

let slideIndex = 0;

function renderSlider() {
    sliderWrapper.innerHTML = '';
    sliderItems.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.img})`;

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');

        const subtitle = document.createElement('div');
        subtitle.classList.add('subtitle');
        subtitle.textContent = item.subtitle;

        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = item.title;

        const content = document.createElement('p');
        content.classList.add('content');
        content.textContent = item.content;

        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = 'Get Started Now!';
        button.addEventListener('click',()=>{
            window.location.href=item.link;
        })

        infoContainer.appendChild(subtitle);
        infoContainer.appendChild(title);
        infoContainer.appendChild(content);
        infoContainer.appendChild(button);

        slide.appendChild(infoContainer);
        sliderWrapper.appendChild(slide);
    });

    sliderWrapper.style.transform = `translateX(${slideIndex * -100}vw)`;
}

function handleClick(direction) {
    if (direction === 'left') {
        slideIndex = slideIndex > 0 ? slideIndex - 1 : 2;
    } else {
        slideIndex = slideIndex < 2 ? slideIndex + 1 : 0;
    }

    sliderWrapper.style.transform = `translateX(${slideIndex * -100}vw)`;
}

leftArrow.addEventListener('click', () => handleClick('left'));
rightArrow.addEventListener('click', () => handleClick('right'));

renderSlider();

setInterval(() => {
    slideIndex = slideIndex < 2 ? slideIndex + 1 : 0;
    sliderWrapper.style.transform = `translateX(${slideIndex * -100}vw)`;
}, 4000);
