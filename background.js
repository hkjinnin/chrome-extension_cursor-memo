const now_date = () => {
    let now = new Date();
    n_d = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " : " + now.getHours() + "時" + now.getMinutes() + "分" + now.getSeconds() + "秒"
    return n_d
}
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        type: 'normal',
        id: "memo",
        title: 'メモ',
        contexts: ['selection', 'image', 'link'],
    });
    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId == "memo") {
            now = now_date();
            text = info.selectionText
            media = info.mediaType
            src = info.srcUrl
            link = info.linkUrl
            content = [now, text, media, src, link]
            chrome.storage.local.get(function (result) {
                result["content"] = result["content"] || [];
                result["content"].push(content);
                chrome.storage.local.set(result);
            });
        }
    });
});



