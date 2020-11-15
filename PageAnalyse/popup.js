
$(function () {

    //build saved words in popup page at the beginning
    chrome.storage.sync.get(['words'], function (storage) {
        RefreshSavedWords(storage.words);
    });

    //refresh the saved words section on the popup page
    function RefreshSavedWords(words) {
        var wordLines = document.getElementById("wordLines");
        ULTemplate(words, wordLines);
    }

    //template for each word line
    function ULTemplate(items, element) {
        let resultsHTML = "";
        for (i = 0; i < items.length; i++) {
            resultsHTML += "<li>" + items[i] + "<a href='#' onclick='loadBook()'> Remove </a> </li>";
        }
        element.innerHTML = resultsHTML;
    }

    //remove one word
    $('#analyse').click(function () {
        var newWords = [];
        chrome.storage.sync.get(['words'], function (storage) {
            newWords=storage.words;
        });
        newWords
        chrome.storage.sync.set({ 'words': newWords }, function () { });
        RefreshSavedWords(newWords);
    });

    //clear all button clicked
    $('#analyse').click(function () {
        var newWords = [];
        chrome.storage.sync.set({ 'words': newWords }, function () { });
        RefreshSavedWords(newWords);
    });

    //analyse button clicked
    $('#analyse').click(function () {
        chrome.storage.sync.get(['words'], function (storage) {
            var words = storage.words;
            let resultsHTML = "";
            $('#result').innerHTML = resultsHTML;
        });
    });

    //actions when saved words change
    chrome.storage.onChanged.addListener(function (changes, storage) {

        //show the last word by badge on the icon
        chrome.browserAction.setBadgeText({ "text": changes.words[words.length - 1].toString() });

        //send message to content.js
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { todo: "markWords", savedWords: storage.words })
        });
    });

});