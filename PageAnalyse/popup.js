  
$(function(){

    chrome.storage.sync.get(['words'],function(storage){
        $('#total').text(storage.words);
        $('#limit').text(budget.limit);
    });

    function ULTemplate(items, element) {
        let resultsHTML = "";
    
        for (i = 0; i < items.length - 1; i++) {
                resultsHTML += "<li>" + items[i] + <a > Remove </a> </li>";
        }
    
        element.innerHTML = resultsHTML;
    }

});