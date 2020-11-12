  
$(function(){

    chrome.storage.sync.get(['words'],function(storage){
        var wordLines = document.getElementById("wordLines");
        ULTemplate(storage.words, wordLines);
    });

    //build saved words in popup page
    function ULTemplate(items, element) {
        let resultsHTML = "";
    
        for (i = 0; i < items.length - 1; i++) {
                resultsHTML += "<li>" + items[i] + "<a > Remove </a> </li>";
        }
    
        element.innerHTML = resultsHTML;
    }

});