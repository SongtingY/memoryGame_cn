var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var start = true;

// detect the keydown
$(document).keydown(function(){
    if (start){
        $("#level-title").text("Level"+level);
        nextSequence();
        start = false;
    };
})

// nextSequence function
function nextSequence( ) {
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level"+level)
    // chose random color
    var randomVariable = Math.floor(Math.random() * 3)+1;
    var randomChosenColour = buttonColours[randomVariable];
    gamePattern.push(randomChosenColour);
    // flash Animation
    $("#" +randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
    // play sounds
    playSound(randomChosenColour);
}

// user click Storage
$('.btn').click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// play playSound
function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

// Animation
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
};

// checkAnswer if right continue if wrong restart
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
    }} else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

// restart the game
function startOver(){
    level = 0;
    gamePattern = [];
    start = true;
}