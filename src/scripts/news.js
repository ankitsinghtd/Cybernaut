    const apiKey='f0005ff29d41416392b7921594b316fc';
    const apiUrl='https://newsapi.org/v2/everything?q=';

    window.addEventListener('load',()=>fetchnews("cybersecurity"));

    async function fetchnews(query){
        const data=await fetch(`${apiUrl}${query}&apiKey=${apiKey}`);
        const res=await data.json();
        bindData(res.articles);
    }
    function bindData(articles){
        const cardContainer=document.getElementById("cards-container");
        const newsTemplate=document.getElementById("template-news-card");
        cardContainer.innerHTML="";
        articles.forEach(articles => {
            if(!articles.urlToImage) return;
            const cardClone=newsTemplate.content.cloneNode(true);
            fillDatainCards(cardClone,articles);
            cardContainer.appendChild(cardClone);
        });
    }
    async function fillDatainCards(cardClone,articles){
        const newsImg=cardClone.querySelector("#news-image");
        const newsTitle=cardClone.querySelector("#news-title");
        const newsSrc=cardClone.querySelector("#news-source");
        const newsDesc=cardClone.querySelector("#news-desc");
        const newsLink=cardClone.querySelector("#news-link");
        
        newsImg.src=articles.urlToImage;
        newsTitle.innerHTML=articles.title;
        newsDesc.innerHTML=articles.description;
        newsLink.href=articles.url;

        const date=new Date(articles.publishedAt).toLocaleString("en-US",{
            timeZone: "Asia/Jakarta"
        })
        newsSrc.innerHTML=`${articles.source.name}, ${date}`;
    }
