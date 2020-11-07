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

chrome.storage.onChanged.addListener(function(changes,storageName){
    chrome.browserAction.setBadgeText({"text":changes.words[words.length-1].toString()});
});