var allFavouritesID = "twl-allfavourites";
function addFavourite(itemID){
    console.log("added")
    var buttons = document.getElementsByClassName(itemID);
    var colorings = document.getElementsByClassName("span-"+itemID);
    var titleSource = document.getElementsByClassName("title-"+itemID)
    var bodySource = document.getElementsByClassName("body-"+itemID);

    var item = {};
    console.log(colorings);
    item.id = itemID;
    item.title = titleSource[0].innerHTML;
    item.body = bodySource[0].innerHTML;

    //Store item locally
    var allFavourites = [];
    localStorage.setItem(itemID, JSON.stringify(item));
    //Store record of all favourite ID's
    if(localStorage.getItem(allFavouritesID)){
        allFavourites = JSON.parse(localStorage.getItem(allFavouritesID));
        allFavourites.push(item);
        localStorage.setItem(allFavouritesID, JSON.stringify(allFavourites));
    }else{
        allFavourites.push(item);
        localStorage.setItem(allFavouritesID, JSON.stringify(allFavourites));
    }

    //Change to unfavourite button
    for(var i = 0; i < buttons.length; i++){
        buttons[i].setAttribute("onclick", `removeFavourite('${itemID}')`);
    }
    for(var i = 0; i < colorings.length; i++){
        colorings[i].style.color = "green"
    }

    console.log(JSON.parse(localStorage.getItem(allFavouritesID)));
    showFavourites();

}

function removeFavourite(itemID){
    console.log("removed");
    var buttons = document.getElementsByClassName(itemID);
    var colorings = document.getElementsByClassName("span-"+itemID);

    //Remove item locally
    localStorage.removeItem(itemID);
    //Remove from record of all faovurite ID's
    var allFavourites = JSON.parse(localStorage.getItem(allFavouritesID));
    for(var i = 0; i < allFavourites.length; i++){
        if(allFavourites[i].id === itemID){
            allFavourites.splice(i,i);
        }
    }
    if(allFavourites === undefined){
        localStorage.removeItem(allFavouritesID);
    }else{
        localStorage.setItem(allFavouritesID, JSON.stringify(allFavourites));
    }

    //Change to unfavourite button
    for(var i = 0; i < buttons.length; i++){
        buttons[i].setAttribute("onclick", `addFavourite('${itemID}')`);
    }
    for(var i = 0; i < colorings.length; i++){
        colorings[i].style.color = "grey"
    }

    showFavourites();

}

function showFavourites(){
    console.log(localStorage.getItem(allFavouritesID))
    if(localStorage.getItem(allFavouritesID)){
        var allFavourites = JSON.parse(localStorage.getItem(allFavouritesID));
        displayResults(allFavourites, "favourites");
    }else{
        return -1; 
    }
}
