//context menu
var contextMenuItem = {
    "id": "saveWord",
    "title": "SaveWord",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

//listen to context menu click
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

//actions when saved words change
chrome.storage.onChanged.addListener(function(changes,storage){

    //show new words by badge on the icon
    chrome.browserAction.setBadgeText({"text":changes.words[words.length-1].toString()});
    
    //send message to content.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { todo: "markWords", savedWords: storage.words })
    });
});
