/*global $*/

function randomNumberGenerator(min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randomNumber;
}

function randomColorGenerator() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getStarted() {
    $("#close-info").removeClass("disabled");
    $("#close-info").prop("disabled", false);
    $("#close-info").text("Start");
}

function formatTweet(info) {
    var formattedTweet = encodeURIComponent(info);
    var shareLink = "https://twitter.com/intent/tweet?text=" + formattedTweet;
    window.open(shareLink, "newwindow", "width=533, height=388"); 
    
    return formattedTweet;   
}

$.getJSON("https://spreadsheets.google.com/feeds/list/1RsBx38ctnaIZFcTBi6jpcNtB5C1QF_57hrVGYpdmf9c/od6/public/basic?alt=json", function(data) {
    function goGreek() {
        for (var i = 0; i < 3; i++) {
            var j = randomNumberGenerator(0, 23);
            var letter = data.feed.entry[j]["title"]["$t"];
            var letterName = letter.replace("&", "");
            letterName = letterName.replace(";", "");

            $(".letters").append("<h2 class='animated hidden letter" + i + "'>" + letter + "</h2>");
            if (i != 2) {
                $(".description-text").append("<span class='text'>" + letterName + " ");
            } else {
                $(".description-text").append(letterName);
            }
            
            $(".letter" + i).delay(2000).removeClass("hidden").addClass("bounceIn");
            
        }
    }
    
    goGreek();
    
    $.getJSON("https://spreadsheets.google.com/feeds/list/1FCgjlBm1jL_Fvn0rlAgbwaVl0jv0aB67OEszwUVSNAo/od6/public/basic?alt=json", function(phrases) {
        function slogan() {
            var jsonLength = phrases.feed.entry.length;

            // Get two adjectives
            var j = randomNumberGenerator(0, jsonLength - 1);
            var adj1 = phrases.feed.entry[j]["title"]["$t"];

            var k = randomNumberGenerator(0, jsonLength - 1);
            var adj2 = phrases.feed.entry[k]["title"]["$t"];

            // Get two nouns
            var l = randomNumberGenerator(0, jsonLength - 1);
            var noun1 = phrases.feed.entry[l]["content"]["$t"];
            noun1 = noun1.slice(6, noun1.length);

            var m = randomNumberGenerator(0, jsonLength - 1);
            var noun2 = phrases.feed.entry[m]["content"]["$t"];
            noun2 = noun2.slice(6, noun2.length);

            // Make into a sentence
            $(".slogan").append("<h3>" + adj1 + " " + noun1 + ". " + adj2 + " " + noun2 + ".</h3>");
            
        }
        
        slogan();
        
        // Makes new Greek Chapter :)
        function reRoll() {
            $("h2").remove();
            $("h3").remove();
            $(".description-text").text("");
            
            goGreek();
            slogan();
            
            $(".container").css("background-color", randomColorGenerator());
        }
        
        // Make start button not available until JSON has been loaded
        getStarted();
        
        // Listeners
        
        // Make to new function to be called by close-info button too
        $("#reRoll").click(function() {
            reRoll();
        });
        
        $("#share").click(function() {
            var url = window.location.href;
            var newCharter = $(".description-text").text();
            var newSlogan = $(".slogan h3").text();
            
            var tweetString = "I just chartered " + newCharter + ": " + newSlogan + " Try for yourself at " + url;

            formatTweet(tweetString);
        });
        
        // Close out overlay
        $("#close-info").click(function() {
            $(".overlay").css("height", "0%"); 
            reRoll();
        });
        
        // Bring up info
        
    });

});