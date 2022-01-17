const $content_display = document.getElementById("content_display");
const $first = document.getElementById("first");

function check(item) {
    if (item[2] == "image") {
        return 3;
    } else if (item[4]) {
        return 4
    } else {
        return 1
    }
}
chrome.storage.local.get(['content'], function (result) {
    try {
        if (result.content.length == 0) {
            throw 'No Element'
        }
        for (let i = result.content.length - 1; i >= 0; i--) {
            if (result.content[i][2] == "image") {
                $content_display.insertAdjacentHTML('beforeend', '<li><a href="/edit.html?num=' + i + check(result.content[i]) + '" class="cp_link"><img src="' + result.content[i][check(result.content[i])] + '" width="300" height="200"></a></li>');
            } else {
                $content_display.insertAdjacentHTML('beforeend', '<li><a href="/edit.html?num=' + i + check(result.content[i]) + '" class="cp_link">' + result.content[i][check(result.content[i])] + '</a></li>');
            }
        };
    } catch (e) {
        $first.insertAdjacentHTML('beforeend', '<div style="text-align: center;"><h2>右クリックしてメモ</h2></div>')
    };
});
