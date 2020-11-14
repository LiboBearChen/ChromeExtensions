  
$(function(){

    //build saved words in popup page
    chrome.storage.sync.get(['words'],function(storage){
        var wordLines = document.getElementById("wordLines");
        ULTemplate(storage.words, wordLines);
    });

    //template for each word line
    function ULTemplate(items, element) {
        let resultsHTML = "";
    
        for (i = 0; i < items.length - 1; i++) {
                resultsHTML += "<li>" + items[i] + "<a > Remove/Add </a> </li>";
        }
        element.innerHTML = resultsHTML;
    }

    //
    


    $('#analyse').click(function(){
        chrome.storage.sync.get(['words'],function(storage){
            var words=storage.words;
            let resultsHTML = "";
            $('#result').innerHTML=resultsHTML;
        });
    });

});