//Array builder to make quickly make each array for the grid
function arrayBuilder(start, end, step = 1) {
  //Change from 10 too 100
  return Array.from(Array(100), (x, index) => start + index * step);
}

// //Test arrays of 10 numbers 
// const array1 = arrayBuilder(1, 10);
// const array2 = arrayBuilder(11, 20);
// const array3 = arrayBuilder(21, 30);
// const array4 = arrayBuilder(31, 40);
// const array5 = arrayBuilder(41, 50);
// const array6 = arrayBuilder(51, 60);
// const array7 = arrayBuilder(61, 70);
// const array8 = arrayBuilder(71, 80);
// const array9 = arrayBuilder(81, 90);
// const array10 = arrayBuilder(91, 100);

// //Test array of 10 by 10 grid to figure things out
// const grid = [
//   array1,
//   array2,
//   array3,
//   array4,
//   array5,
//   array6,
//   array7,
//   array8,
//   array9,
//   array10,
// ];
//Too slow to build 10000 grid this way

//Build 10,000 grid
const grid = [];
for (k = 1; k <= 10000; k=k+100) {
  grid.push(arrayBuilder(k, (k+100)));
};
//console.log(grid) surprisingly works, didn't kill my laptop this time

//Array of directions
const directions = ["North", "East", "South", "West"];

//First grid index - robot starts in square 1
let y = 0;
//Second grid index - robot starts in square 1
let x = 0;
//Direction index - robot starts facing South
let d = 2;
//Define movement variable
let i = 0;

//Robot start location
let robotLocation = grid[y][x];
//Robot start direction
let robotDirection = directions[d];
//Log starting position
//console.log(robotLocation, robotDirection);

//function to update position after changes to y, x and d
function updatePosition() {
  robotLocation = grid[y][x];
  robotDirection = directions[d];
  //console.log(robotLocation, robotDirection);
}

//Change 10 limit to 100 for bigger grid now
function checkValidMovement(i) {
  //Check direction is South and will not move out of bounds
  if ((d === 2) && ((y + i) < 100)) {
    return true;
  }
  //Check direction is East and will not move out of bounds
  else if ((d === 1) && ((x + i) < 100)) {
    return true;
  }
  //Check direction is North and will not move out of bounds
  else if ((d === 0) && ((y-i) >= 0)) {
    return true
  }
  //Check direction is West and will not move out of bounds
  else if ((d === 3) && ((x - i) >= 0)) {
    return true
  }
  else {
    console.log("Rover cannot move out of bounds");
    alert("Rover cannot move out of bounds!")
    //console.log(robotLocation, robotDirection);
    return false
  }
}


function move(robotDirection, i) {
  //move function kept breaking
  //console.log(typeof i) printed string
  i = Number(i);
  //function now works
  //Check direction is South then move i metres
  if (robotDirection === directions[2]) {
    if (checkValidMovement(i)) {
      y = y + i;
      //console.log(robotLocation, robotDirection);
    }
    
  }
  //Check direction is East then move i metres
  else if (robotDirection === directions[1]) {
    if (checkValidMovement(i)) {
      x = x + i;
      //console.log(robotLocation, robotDirection);
    }
    
  }
  //Check direction is North then move i metres
  else if (robotDirection === directions[0]) {
    if(checkValidMovement(i)) {
      y = y - i;
      //console.log(robotLocation, robotDirection);
    }
    
  }
  //Check direction is West and move i metres
  else if (robotDirection === directions[3]) {
    if(checkValidMovement(i)) {
      x = x - i;
      //console.log(robotLocation, robotDirection);
    }
    
  }
  //update position after movement
  updatePosition();
  //console.log(robotLocation, robotDirection);
}

/* These tests are from the 10 x 10 grid
//South test - already in starting position facing South so do not need to update position
move(robotDirection, 5);
//Prints 1 South 51 South
*/

/*
//East test
//Change direction to East
d = 1;
//Update position
updatePosition();
move(robotDirection, 5);
//Prints 1 South 1 East 6 East
*/

/*
//North test - needs to start lower down in the grid so can move North
y = 5;
x = 3;
//Change direction to North
d = 0;
//Update position
updatePosition();
move(robotDirection, 5);
//Prints 1 South 54 North 4 North
*/

/*
//West test - needs to start on the right of the grid so can move West
y = 0;
x = 5;
//Change direction to West
d = 3;
//Update position
updatePosition();
move(robotDirection, 5);
//Prints 1 South 6 West 1 West
*/

//More tests from 10 x 10 grid
//Out of bounds tests
//South
//move(robotDirection, 11);
//Prints 1 South Rover cannot move out of bounds 1 South
//East
// d = 1;
// updatePosition();
// move(robotDirection, 11);
//Prints 1 South 1 East Rover cannot move out of bounds 1 East
//North
// y = 5;
// x = 3;
// d = 0;
// updatePosition();
// move(robotDirection, 6);
//Prints 1 South 54 North Rover cannot move out of bounds 54 North
//West
// y = 0;
// x = 5;
// d = 3;
// updatePosition();
// move(robotDirection, 6);
//Prints 1 South 6 West Rover cannot move out of bounds 6 West



//function to check if turning left or right and change the direction
function turning(turn) {
  if (turn === "L") {
    // console.log(d);
    // console.log(robotDirection);
    d = d - 1;
    // console.log(d);
    // console.log(robotDirection);
    //make sure that directions[d] is not defined
    if (d < 0) {
      d = 3;
    }
    //console.log(robotDirection); //Position doesn't change
    //update position
    updatePosition();
    //Check
    //console.log(robotDirection);
  }
  if (turn === "R") {
    // console.log(d);
    // console.log(robotDirection);
    d = d + 1;
    // console.log(d);
    // console.log(robotDirection);
    //make sure that directions[d] is not defined
    if (d > 3) {
      d = 0;
    }
    //console.log(robotDirection); //Position doesn't change
    //update position
    updatePosition();
    //Check
    //console.log(robotDirection);
  }
}
//Check turning function
//turning("L");
//Prints 1 South 1 East
//turning("R");
//Prints 1 South 1 West

function displayRobotInfo() {
  const text = "<p>The Rover is current in square " + robotLocation + " and is facing " + robotDirection + ".<p>"
  document.getElementById("roverLocation").innerHTML = text;
  //autofocus back into userInput1 box
  document.getElementById("userInput1").focus();
}

function startRover() {
  d = 2;
  y = 0;
  x = 0;

  displayRobotInfo();

  //Get the 5 commands by waiting for the submit button to be clicked
  document.getElementById("submit").addEventListener("click", function(){
    const command1 = document.getElementById("userInput1").value;
    //console.log(command1);
    const command2 = document.getElementById("userInput2").value;
    const command3 = document.getElementById("userInput3").value;
    const command4 = document.getElementById("userInput4").value;
    const command5 = document.getElementById("userInput5").value;

    function commandValidation(command) {
      //Check for null first if a command has been left blank as following checks don't like null
      //Not all 5 commands need to be filled in
      if (command === null) {
        
      }
      //Check for a not a number
      else if (isNaN(command)) {
        //Make text all uppercase
        command = command.toUpperCase();
        //Added cases for LEFT and RIGHT as my test user refuses to read what are valid inputs
        //Change a command of LEFT to L
        if (command === "LEFT") {
          command = "L";
          turning(command);
        }
        //Change a command of RIGHT to R
        else if (command === "RIGHT") {
          command = "R";
          turning(command);
        }
        //Check for L or R
        else if ((command === "L" || command === "R")) {
          //Turn Rover
          turning(command);
        }
        //Other not a number cases must error
        else {
          alert("Command is not valid! Please enter L, R or a number between 1 and 99");
        }
      }
      //Check for a number   
      else if (!isNaN(command)) {
        //console.log(command);
        i = command;
        //console.log(i);
        //Move Rover
        move(robotDirection, i);
        //console.log(robotLocation, robotDirection);
      }
      //Everything else needs to error
      else {
        alert("Command is not valid! Please enter L, R or a number between 1 and 99");
      }
    }

    //Check and run the 5 commands
    commandValidation(command1);
    commandValidation(command2);
    commandValidation(command3);
    commandValidation(command4);
    commandValidation(command5);

    //Send final location and direction back to roverLocation in the HTML
    displayRobotInfo();

    //Clear input boxes
    document.getElementById("userInput1").value = "";
    document.getElementById("userInput2").value = "";
    document.getElementById("userInput3").value = "";
    document.getElementById("userInput4").value = "";
    document.getElementById("userInput5").value = "";
  })

}

//Start function to display starting position and listen out for the event of the submit button being clicked
startRover();
