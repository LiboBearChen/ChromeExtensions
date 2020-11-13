var contextMenuItem = {
    "id": "saveWord",
    "title": "SaveWord",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "saveWord" && clickData.selectionText) {
        chrome.storage.sync.get(['words'], function (storage) {
            var newWords = [];
            if (storage.words) {
                newWords=storage.words;
            }

            //avoid duplicate words
            var saved=false;
            for(word in newWords){
                if(word===clickData.selectionText){
                    chrome.browserAction.setBadgeText({"text":"Already Saved"});
                    saved=true;
                }
            }
            if(!saved){
                newWords.push(clickData.selectionText);
                chrome.storage.sync.set({ 'words': newWords }, function () {});
            }
        });
    }
});

//show badge on the icon
chrome.storage.onChanged.addListener(function(changes,storageName){
    chrome.browserAction.setBadgeText({"text":changes.words[words.length-1].toString()});
    performMark();
});

//mark words on pages
function performMark() {
    var keyword = document.getElementById("keyword").value;
    var display = document.getElementById("fileContent");

    var newcontent = "";

    let spans = document.querySelectorAll('mark');

    for (var i = 0; i < spans.length; i++) {
        spans[i].outerHTML = spans[i].innerHTML;
    }

    var re = new RegExp(keyword, "gi");
    var replaceText = "<mark id='markme'>$&</mark>";
    var bookContent = display.innerHTML;

    newcontent = bookContent.replace(re, replaceText);

    display.innerHTML = newcontent;
    var count = document.querySelectorAll('mark').length;
    document.getElementById("searchstat").innerHTML = "found " + count + " matches";

    if (count > 0) {
        var element = document.getElementById("markme");
        element.scrollIntoView();
    }
}