/*global $*/

$.getJSON("https://spreadsheets.google.com/feeds/list/1RsBx38ctnaIZFcTBi6jpcNtB5C1QF_57hrVGYpdmf9c/od6/public/basic?alt=json", function(data){
    var i = 0;
    for (i in data.feed.entry) {
        var letter = data.feed.entry[i]["title"]["$t"];
        $(".letters").append("<h2>" + letter + "</h2>");
    }
});