//Execute a search based on the query in the search bar
function search(){
    var url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";
    var wasteJson; //Data from api call

    var query = document.getElementById("searchbar").value;

    var apiPromise = apiCall(url);

    //Make api call
    apiPromise.then(function(results){
        matches = getMatches(query, results); //Get entries with at least 1 matching keyword
        displayResults(matches, "searchresults"); //Print the matching results to the screen. 

    });

}

//Checks if a nested json contains a matching keyword
function keywordMatch(key, nested){
    var matches;
    var keywords = nested["keywords"].split(",");


    for(var i = 0; i < keywords.length; i++){
        var kw = keywords[i].split(" ");
        for(var j = 0; j < kw.length; j ++){
            if(key === kw[j] || calcSim(key, kw[j]) >= 0.7){
                return true;
            }
        }
    }
    return false;
}

//Return a wasteJson that only contain indices with a matching keyword
function getMatches(key, wasteJson){
    var matches = new Array();

    for(var i = 0; i < wasteJson.length; i++){
        if(keywordMatch(key, wasteJson[i])){
            matches.push(wasteJson[i]);
        }
    }

    return matches;
}


//Generic edit cost algorithm for find close matches
function calcSim(s1, s2) {
    var long = s1;
    var short = s2;
    if (s1.length < s2.length) {
        long = s2;
        short = s1;
    }
    var longLength = long.length;
    if (longLength == 0) {
        return 1.0;
    }
    return (longLength - editCost(long, short)) / parseFloat(longLength);
}
function editCost(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var last = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0){
                costs[j] = j;
            } else {
                if (j > 0) {
                    var newVal = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newVal = Math.min(Math.min(newVal, last),costs[j]) + 1;
                        costs[j - 1] = last;
                        last = newVal;
                }
             }
        }   
        if (i > 0)
        costs[s2.length] = last;
    }
    return costs[s2.length];
}
