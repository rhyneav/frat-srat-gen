/*global $*/

function randomNumberGenerator(max) {
    var max = 23
    var min = 0;
    
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randomNumber;
}

$.getJSON("https://spreadsheets.google.com/feeds/list/1RsBx38ctnaIZFcTBi6jpcNtB5C1QF_57hrVGYpdmf9c/od6/public/basic?alt=json", function(data){
    for (var i = 0; i < 3; i++) {
        var j = randomNumberGenerator();
        var letter = data.feed.entry[j]["title"]["$t"];
        $(".letters").append("<h2>" + letter + "</h2>");
    }
});