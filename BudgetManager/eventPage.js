var contextMenuItem={
    "id":"spendMoney",
    "title":"SpendMoney",
    "contexts":["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value){
    return !isNaN(value)&&
        parseInt(Number(value))==value&&
        !isNaN(parseInt(value,10));
}