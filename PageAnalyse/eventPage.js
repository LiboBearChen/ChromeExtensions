var contextMenuItem = {
    "id": "saveWord",
    "title": "SaveWord",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "saveWord" && clickData.selectionText) {
        chrome.storage.sync.get(['words'], function (storage) {
            var newTotal = 0;
            if (storage.words) {
                newTotal += parseInt(budget.total);
            }
            newTotal += parseInt(clickData.selectionText);
            chrome.storage.sync.set({ 'total': newTotal }, function () {});
        });
    }
});

chrome.storage.onChanged.addListener(function(changes,storageName){
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
});