function apiCall(url){
    //Promise for json returned from url
    return new Promise(function(resolve, reject){
        var wasteJson;
        var request = new XMLHttpRequest();

        request.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                wasteJson = JSON.parse(request.responseText);
                resolve(wasteJson);
            }
        };

        request.open("GET", url, true);
        request.send();
    });
}


window.onload = function(){
    showFavourites();
}
