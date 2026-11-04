// Entry point of the game. Run it with: node app.js
//
// This file should:
// 1. Import PromptSync (from 'prompt-sync') and create the `prompt` function.
// 2. Import the Riddle class, the Player class, and the array of all riddles (from riddles/index.js).
// 3. Show a welcome message and ask the player for their name, then create a Player object.
// 4. Loop over all riddles. For each riddle:
//    - save the start time (Date.now())
//    - create a Riddle object and call its ask() method
//    - save the end time (Date.now())
//    - save the time using player.recordTime()
// 5. After the loop, call player.showStats() to show total time and average time per riddle.
import PromptSync from 'prompt-sync';
import AllRiddles from './riddles/index.js';
import Player from './classes/Player.js';
import Riddle from './classes/Riddle.js';


const prompt = PromptSync();

console.log('welcome to Riddle games!')
let inputName = prompt(`wath's is your name?`)
const player1 = new Player(inputName)

let choice = '';


while (choice !== '0') {
    console.log('\n--- Main Menu ---');
    console.log('What do you want to do?');
    console.log('1. Play the game');
    console.log('2. Create a new riddle');
    console.log('3. Read all riddles');
    console.log('4. Update an existing riddle');
    console.log('5. Delete a riddle');
    console.log('6. View leaderboard');
    console.log('0. Exit');

    choice = prompt('Enter your choice (0-6): ').trim();

    switch (choice) {
        case '1':
            console.log('\n--> Starting the game...');
            break;
        case '2':
            console.log('\n--> Creating a new riddle...');
            break;
        case '3':
            console.log('\n--> Reading all riddles...');
            break;
        case '4':
            console.log('\n--> Updating an existing riddle...');
            break;
        case '5':
            console.log('\n--> Deleting a riddle...');
            const id = prompt('Enter riddle ID to delete: ');
            deleteRiddle(id);
            break;
        case '6':
            console.log('\n--> Viewing leaderboard...');
            break;
        case '0':
            console.log('\nExiting... Goodbye!');
            break;
        default:
            console.log('\nInvalid choice, please enter a number between 0 and 6.');
    }
}


const level = prompt('Choose difficulty:easy/medium/hard')

AllRiddles.forEach(riddle => {


    if (riddle.difficulty === level) {

        const newRiddle = new Riddle(riddle.id, riddle.name, riddle.taskDescription, riddle.correctAnswer, riddle.difficulty, riddle.timeLimit, riddle.hint)
        let startTime = Date.now();
        newRiddle.ask(prompt);
        let endTime = Date.now();
        if ((endTime - startTime) / 1000 > riddle.timeLimit) {
            riddle.penalty ? player1.recordTime(startTime / 1000, (endTime / 1000) + 15) : player1.recordTime(startTime / 1000, (endTime / 1000) + 5)
            console.log("Too slow! 5 seconds penalty applied")
        }
        else
            riddle.penalty ? player1.recordTime(startTime / 1000, (endTime / 1000) + 10) : player1.recordTime(startTime / 1000, endTime / 1000)

    }


});
for (let i = AllRiddles.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [AllRiddles[i], AllRiddles[j]] = [AllRiddles[j], AllRiddles[i]];
}
console.log(AllRiddles)
player1.showStats();



