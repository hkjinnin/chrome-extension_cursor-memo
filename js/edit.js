const $edit_area = document.getElementById("edit_area");
const $c_date = document.getElementById("c_date");
let query = location.search.split('=');
let value = query[1];

function set_link(list) {
    const $link = document.getElementById("link");
    $link.insertAdjacentHTML('beforeend', '<a id="link_b" href="#" class="btn btn--blue">リンク</a>');
    document.getElementById("link_b").onclick = function () {
        chrome.tabs.create({url: list[4]});
    };
    $edit_area.value = list[1];
}
chrome.storage.local.get(['content'], function (result) {
    if (value[1] == 4) {
        set_link(result.content[value[0]])
    } else {
        $edit_area.value = result.content[value[0]][value[1]];
    }
    $c_date.textContent = result.content[value[0]][0]
    function edit() {
        result.content[value[0]][value[1]] = $edit_area.value;
        chrome.storage.local.set(result);
    }
    function c_delete() {
        result.content.splice(value[0], 1);
        chrome.storage.local.set(result);
    }
    document.getElementById("c_delete").addEventListener('click', c_delete);
    document.getElementById("change").addEventListener('click', edit);
});


