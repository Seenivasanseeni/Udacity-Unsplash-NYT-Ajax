(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    var addImageUnsplash=function(image){
        let htmlcontent='';
        htmlcontent=`
        <figure>
            <img src="${image.urls.regular}" alt="${image.description}">
            <figcaption> By ${image.user.name} </figcaption>
        </figure>
        `;
        responseContainer.insertAdjacentHTML('afterbegin',htmlcontent);
    }

    const resetresponseContainer=function(){
        responseContainer.innerHTML="";
    }

    var getImageUnsplash=function(searchText){
        const unsplashRequest=new XMLHttpRequest();
        unsplashRequest.open("GET", `https://api.unsplash.com/search/photos?page=1&query=${searchText}`);
        unsplashRequest.setRequestHeader("Authorization","Client-ID b25e01fd6798d936b5c91ce26e4b3e984bb34f7aaf7d8ef91c8e77d20e35b1cf");
        unsplashRequest.onload=function(){
            let htmlContent='';
            const data=JSON.parse(this.response);
            const firstImage=data.results[0];
            if(firstImage)
                addImageUnsplash(firstImage);
            else {
                resetresponseContainer.insertAdjacentHTML("beforeend","<h1>No Relevant Articles Found</h1>");
            }
        };
        console.log("Error in receiving unsplash images");
            unsplashRequest.onerror=function(){
        }
        unsplashRequest.send();
    }
    
    var addArticles=function(docs){
        let articleList="<ul>"+docs.map(article=>{
            return `<li class="article"><h2><a href="${article.web_url}"> ${article.headline.main}</a></h2>
            <p> ${article.snippet}</p>
            <li>`
        }).join(' ')+"</ul>";
        responseContainer.insertAdjacentHTML('beforeend',articleList);
    }
    var getArticles=function(searchText){
        const nytRequest=new XMLHttpRequest();
        nytRequest.open("GET",`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchText}&api-key=af82619a936b4f43a41b6060d3816671`);
        nytRequest.onload=function(){
            const data=JSON.parse(nytRequest.responseText);
            if(data.response && data.response.docs && data.response.docs.length>0)
                addArticles(data.response.docs);
            else {
                resetresponseContainer.insertAdjacentHTML("beforeend","<h1>No Relevant Articles Found</h1>");
            }
            console.log("Sucess");
        }
        nytRequest.onerror=function(){
            console.log("Error in receiving new york articles");
        }
        nytRequest.send();
    
    }


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        getImageUnsplash(searchedForText);    
        getArticles(searchedForText);
    });
})();
