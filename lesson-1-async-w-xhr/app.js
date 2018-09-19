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
        responseContainer.innerHTML=htmlcontent;
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
            addImageUnsplash(firstImage);
            console.log(`Got the correct response ${firstImage}`);
        };
        unsplashRequest.onerror=function(){
            console.log("Error");
        }
        unsplashRequest.send();
    }


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        //getImageUnsplash(searchedForText);    
        
    });
})();
