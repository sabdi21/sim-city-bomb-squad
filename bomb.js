
// GLOBAL VARIABLES
var time, interval;

// TEST IF THE DOM EVENTS WILL SHOW IN CONSOLE
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('reset').addEventListener('click', start);
});

function start() {
    // START THE SIREN SOUND and play
    document.getElementById('siren').play();
    document.getElementById('success').pause();
    //SET THE INITIAL TIME, DISPLAY TIME TO USER
    time = 30;
    document.getElementById('timer').style.color = 'chartreous';
    document.getElementById('timer').textContent = time;

    // change background image
    document.getElementsByTagName('body')[0].classList.remove('exploded');
    document.getElementsByTagName('body')[0].classList.add('unexploded');

    //CHANGE BUTTON TEXT TO "RESET GAME"
    this.textContent = 'Restart Game';
    // remove message
    document.getElementById('message').textContent = "Hurry Up!";
  
    clearInterval(interval); // stop old timer
    interval = setInterval(tick, 500); // START OUR TIMER
    // SET UP EVENT LISTENERS FOR WIRES
    
    removeWireListeners();
    addWireListeners();
}

// we the timer in the start function.
function tick() {
    // minus the time by 1
    time -= 1;
    document.getElementById('timer').textContent = time;
    if (time === 19) {
        document.getElementById('timer').style.color = 'goldenrod';
    }
    else if ( time === 9) {
        document.getElementById('timer').style.color = 'red';
    }
    else if ( time === 3) {
        document.getElementById('timer').style.color = 'purple';
    }
    else if (time <= 0) {
        // loose the game
       loseGame();
    }
}

function loseGame() {
    endGame();
    clearInterval(interval);
    // turn off siren
    document.getElementById('siren').pause();
    //play explosed sound
    document.getElementById('explode').play();
    //change background to explosed picture
    document.getElementsByTagName('body')[0].classList.remove('unexploded');
    document.getElementsByTagName('body')[0].classList.add('exploded');
    // give a snarky message
    document.getElementById('message').textContent = "🤬🤬🤬";
    // call remove listeners function
    // removeWireListeners();
    // 
    document.getElementById('reset').textContent = 'Play Again?'
}

function removeWireListeners() {
    var wireImages = document.querySelectorAll('#box img'); 
    for (var i = 0; i < wireImages.length; i++) {
        wireImages[i].removeEventListener('click', cutWire);
    }
}

function addWireListeners() {
    // grab all images we want to add listeners to
    var wireImages = document.querySelectorAll('#box img'); //select children of the box id that have image tag
   for (var i = 0; i < wireImages.length; i++) {
       //make sure each image is uncut (in case this is being called on the reset button)               
       wireImages[i].src = `./img/uncut-${wireImages[i].id}-wire.png`;
        // Assign (randomly) weither the wire should or should not cut
        var shouldBeCut = (Math.random() > 0.5).toString();
        wireImages[i].setAttribute('data-cut', shouldBeCut); //we each wire to 
        // add the click event listener
        wireImages[i].addEventListener('click', cutWire);
        //print it out (for cheat mode)
        console.log(wireImages[i]);
   }
    //All true cases
   if (checkWin()) {
       winGame();
   }
}

function cutWire() {
    // change the wire to the cut image (this. will refer to the thing that was clicked)
    this.src = `./img/cut-${this.id}-wire.png`;

    // remove the click event now that it's already been clicked
    this.removeEventListener('click', cutWire);

    // check if i was suppose to cut the wire or not;
    if(this.getAttribute('data-cut') === 'true'){
        // if true, yes i was suppose to cut it
        console.log('good job');
        document.getElementById('electricity').play();
        //change the data-cut to false
        this.setAttribute('data-cut', 'false');
        if (checkWin()) {
            winGame();
        }
    }
    else {
        // otherwise, no you werent suppose to cut
        endGame("You Killed Everyone!!!");
        loseGame();
    }

}
function checkWin() {
   // grab all images we want to add listeners to
   var wireImages = document.querySelectorAll('#box img'); //select children of the box id that have image tag
   
   for (var i = 0; i < wireImages.length; i++) {
    // IF THERE ARE ANY TRUE WIRES FOUND; I must keep playin
    if (wireImages[i].getAttribute('data-cut') === 'true') {
        return false;
        }
    }
    //  I went through all wire images and found no trues. I win!
    return true;
}

function winGame(){
    endGame("You win!!!");
    var yayCheer = document.getElementById('crowdYay');
    yayCheer.addEventListener('ended', function() {
        // this is the code that runs when the cheer should is done
        document.getElementById('success').play();
    });
    yayCheer.play();
}

function endGame(theMessage) {
    
    clearInterval(interval);
    // turn off siren
    document.getElementById('siren').pause();

    // call remove listeners function
    removeWireListeners();

    // give a snarky message
   document.getElementById('reset').textContent = 'Play Again?'

    //set winner message
    document.getElementById('message').textContent = theMessage;
}