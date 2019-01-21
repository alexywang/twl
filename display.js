//Parse the text from one attribute of the nested objects in wasteJson
function parseHTML(text){
    /* Replace as follows:
    &lt; = '<'
    &gt; = '>'
    &amp; = delete
    nbsp; = ' '
    \ = delete
    &quot; = '"'
    */
    if(!text.includes('&lt;')){
        return text;
    }
    var parser = new DOMParser;
    var dom = parser.parseFromString(
        '<!doctype html><body>' + text,
        'text/html');
    var parsedText = dom.body.textContent;
    return parsedText;
    // text.replace(/&lt;/g, '<');
    // text.replace(/&gt;/g, '>');
    // text.replace(/&amp;/g, '');
    // text.replace(/&nbsp;/g, ' ');
    // // text.replace(/\\/g, '');
    // text.replace(/&quot;/, '"');

}

//Get the title of a single item from the overall wasteJson array
function getTitleCode(nested){
    return nested.title;
}
//Get the description of a single item from the overall wasteJson array
function getBodyCode(nested){
    return parseHTML(nested.body);
}
//Get the code for a favourite or unfavourite button given a single item from wasteJson
function getButtonCode(nested){
    //Generate differnet buttons depending on if the item has been favourite already or not
    var favouriteButton = `
        <button type="button" class="${nested.id}" onclick="addFavourite('${nested.id}')">
            <span class="span-${nested.id}" style="color:gray;">
                <i class="fas fa-star"></i>
            </span>
        </button>
    `
    var unfavouriteButton = `
        <button type="button" class="span-${nested.id}" onclick="removeFavourite('${nested.id}')">
            <span class="span-${nested.id}" style="color:green ;">
                <i class="fas fa-star"></i>
            </span>
        </button>
    `
    
    if(localStorage.getItem(nested.id)){
        return unfavouriteButton;
    }else{
        return favouriteButton;
    }
}



//Display an array of matches to the html page. 
function displayResults(matches, divName){
    var numResults = matches.length;
    var divs = new Array(numResults);
    var resultDiv = document.getElementById(divName);
    resultDiv.innerHTML = ""; //Reset the html in the results divider

    //Populate html text for each div and post to page
    for(var i = 0; i < numResults; i++){
        divs[i] =
        `
            <table class="searchresult">
            <tr>
                <td class = button-${matches[i].id}>${getButtonCode(matches[i])}</td>
                <td class = title-${matches[i].id}>${getTitleCode(matches[i])}</td>
                <td class = body-${matches[i].id}>${getBodyCode(matches[i])}</td>
            </tr>
            </table>
        `
        resultDiv.innerHTML += divs[i];

    }
}


