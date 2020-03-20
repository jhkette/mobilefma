// 

$(document).bind('mobileinit', function () {
    $.mobile.page.prototype.options.theme = "a";
    $.get("../data/houses.json", function (result, status) {
            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("result", JSON.stringify(result));
            } else {
                console.log('error')
            }
        })
        .fail(function () {
            console.log("error");
        })


});