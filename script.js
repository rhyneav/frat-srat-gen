/*global $*/

function randomNumberGenerator() {
    var max = 23;
    var min = 0;
    
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randomNumber;
}

$.getJSON("https://spreadsheets.google.com/feeds/list/1RsBx38ctnaIZFcTBi6jpcNtB5C1QF_57hrVGYpdmf9c/od6/public/basic?alt=json", function(data){
    function goGreek () {
        for (var i = 0; i < 3; i++) {
            var j = randomNumberGenerator();
            var letter = data.feed.entry[j]["title"]["$t"];
            var letterName = letter.replace("&", "");
            letterName = letterName.replace(";", "");
            
            console.log(data.feed.entry)
            
            $(".letters").append("<h2 class='animated hidden letter" + i + "'>" + letter + "</h2>");
            if (i != 2) {
                $(".description-text").append("<span class='text'>" + letterName + ", ");
            } else {
                $(".description-text").append(letterName);
            }
            
            $(".letter" + i).delay(2000).removeClass("hidden").addClass("bounceIn");
            
        }
    }
    goGreek()
    
    $("#reRoll").click(function() {
        $("h2").remove();
        $(".description-text").text("");
        goGreek();
    });

});

// Listeners
