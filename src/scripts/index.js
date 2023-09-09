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

const sliderItems = [
    {
        id: 1,
        img: './src/images/cyber.jpg',
        subtitle: 'Network Analysis',
        title: 'Network Analysis',
        content: 'Analyse your network',
    },
    {
        id: 2,
        img: './src/images/attack.png',
        subtitle: 'Subtitle 2',
        title: 'Title 2',
        content: 'Content 2',
    },
    {
        id: 3,
        img: './src/images/killchain.jpg',
        subtitle: 'Subtitle 3',
        title: 'Title 3',
        content: 'Content 3',
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
