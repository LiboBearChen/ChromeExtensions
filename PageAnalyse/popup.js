
$(function () {

    let searchString = ''

    //build saved words in popup page at the beginning
    chrome.storage.sync.get(['words'], function (storage) {
        refreshSavedWords(storage.words);
    });

    //refresh the saved words section on the popup page
    function refreshSavedWords(words) {
        document.getElementById('copyStatus').style.opacity = 1;
        let wordLines = document.getElementById("wordLines");
        ULTemplate(words, wordLines);
        generateString(words);
    }

    // make and show a string consisting of words
    function generateString(words) {
        searchString = ''
        for (i in words) {
            searchString += words[i] + ' '
        }
        document.getElementById("string").innerHTML = searchString
    }

    //template for each word line
    function ULTemplate(items, element) {
        let resultsHTML = "";
        for (i = 0; i < items.length; i++) {
            resultsHTML += "<li>" + items[i] + `<a id='${i}' class='btn btn-outline-danger btn-sm float-right'> Remove </a> </li><hr>`;
        }

        element.innerHTML = resultsHTML;
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
    });

    //copy button clicked
    $('#copy').click(function () {
        //copy string to Clipboard
        const el = document.createElement('textarea');
        el.value = searchString;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        //show a copied indicator
        document.getElementById('copyStatus').style.opacity = 1;

        
    });

    //actions when saved words change
    chrome.storage.onChanged.addListener(function (changes) {
        refreshSavedWords(changes.words.newValue)

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