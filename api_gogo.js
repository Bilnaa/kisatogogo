function getFile(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    if (request.status === 200) {
        return request.responseText;
    } else {
        return null;
    }
}

function ClipBoard(objButton) {
    console.log("pressed")
    var content = objButton;
    navigator.clipboard.writeText(content).then((function () {
        alert("Async: Copying to clipboard was successful!")
    }), (function (t) {
        alert("Async: Could not copy text: ", t)
    }));;
}



function toGogo(favorites) {
    var text = JSON.parse(favorites);
    var favorites = text.favorites;
    var newFavorites = [];
    for (favs of favorites) {
        if (favs.moduleID == "3489230942384712") {
            var title = favs.request.url.split('\/').pop().replace('---', '-').replace('dubbed', 'dub');
            if (title.length > 45) {
                title = title.split('-')[0] + '-' + title.split('-').pop();
            }
            var url = `https://gogoanime.herokuapp.com/search?keyw=${title}`;
            var json = getFile(url);
            var data = JSON.parse(json);
            for (var x = 0; x < data.length; x++) {
                var anime = data[x];
                var titleArray = favs.title.toLowerCase().split(" ");
                if (anime.animeId == title) {
                    favs.request.url = anime.animeUrl;
                    favs.image.url = encodeURI(anime.animeImg);
                    favs.urlIdentifier = favs.request.url;
                } else if (anime.animeId.includes('dub') && !title.includes('dub')) {
                    continue
                } else if (data.length == 1) {
                    favs.request.url = anime.animeUrl;
                    favs.image.url = encodeURI(anime.animeImg);
                    favs.urlIdentifier = favs.request.url;
                } else {
                    console.log('here')
                    for (word of titleArray) {
                        if (anime.animeId.includes(word)) {
                            favs.request.url = anime.animeUrl;
                            favs.image.url = encodeURI(anime.animeImg);
                            favs.urlIdentifier = favs.request.url;
                            break;
                        }
                    }
                    break;
                }
            }
            newFavorites.push(favs);
        } else {
            newFavorites.push(favs);
        }

        document.querySelector('.progress_p').innerText = ` Went through ${newFavorites.length} animes out of ${favorites.length}`;
    }
    favorites = newFavorites;
    document.querySelector('.new-favs').value = JSON.stringify(text);
}