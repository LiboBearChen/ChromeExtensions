
$(function () {

    //build saved words in popup page at the beginning
    chrome.storage.sync.get(['words'], function (storage) {
        refreshSavedWords(storage.words);
    });

    //refresh the saved words section on the popup page
    function refreshSavedWords(words) {
        let wordLines = document.getElementById("wordLines");
        ULTemplate(words, wordLines);
    }

    //template for each word line
    function ULTemplate(items, element) {
        let resultsHTML = "";
        for (i = 0; i < items.length; i++) {
            resultsHTML += "<li>" + items[i] + `<a id='${i}' class='btn btn-outline-danger btn-sm float-right'> Remove </a> </li><hr>`;
        }

        element.innerHTML = resultsHTML;

        for (i = 0; i < items.length; i++) {
            let wordAnchor = document.getElementById(i);
            wordAnchor.index = i;
        }
    }

    //remove one word
    $("ul").on("click", "a", function () {
        let index = $(this).attr('id');
        let newWords = [];
        chrome.storage.sync.get(['words'], function (storage) {
            newWords = storage.words;
            newWords.splice(index, 1);
            chrome.storage.sync.set({ 'words': newWords }, function () { });
        });
    });

    //clear all button clicked
    $('#clear').click(function () {
        let newWords = [];
        chrome.storage.sync.set({ 'words': newWords }, function () { });
        refreshSavedWords(newWords);
    });

    //analyse button clicked
    $('#analyse').click(function () {
        chrome.storage.sync.get(['words'], function (storage) {
            let words = storage.words;
            let resultsHTML = "";
            $('#result').innerHTML = resultsHTML;
        });
    });

    //actions when saved words change
    chrome.storage.onChanged.addListener(function (changes, storage) {

        let wordLines = document.getElementById("wordLines");
        ULTemplate(changes.words, wordLines);
        //show the last word by badge on the icon
        // chrome.browserAction.setBadgeText({ "text": changes.words[words.length - 1].toString() });

        //send message to content.js
        /* chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { todo: "markWords", savedWords: storage.words })
        }); */
    });

});

$("selector").click({ param1: "dwqd", param2: "wqdwq" }, move);

function move(event) {
    alert(event.data.param1);
    alert(event.data.param2);
}

$("p").on({
    mouseover: function () {
        $("body").css("background-color", "lightgray");
    },
    mouseout: function () {
        $("body").css("background-color", "lightblue");
    },
    click: function () {
        $("body").css("background-color", "yellow");
    }
});