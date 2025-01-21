let secretNumber = 0;
let attempts = 0;
let maxAttempts = 3; // Maximum number of attempts allowed
let generatedNumbersList = [];
let maxNumber = 10;

function setElementText(element, text) {
    let htmlElement = document.querySelector(element);
    htmlElement.innerHTML = text;
    return;
}

function verifyGuess() {
    let userNumber = parseInt(document.getElementById('userInput').value);

    if (userNumber === secretNumber) {
        setElementText('#comment', `You guessed the number in ${attempts} ${(attempts === 1) ? 'try' : 'tries'}`);
        document.getElementById('new_game').removeAttribute('disabled');
        document.getElementById('userInput').setAttribute('disabled', true); // Disable input field
    } else {
        // The user didn't guess correctly.
        let remainingAttempts = maxAttempts - attempts;
        if (remainingAttempts > 0) {
            if (userNumber > secretNumber) {
                setElementText('#comment', `The secret number is lower. ${remainingAttempts} ${(remainingAttempts === 1) ? 'attempt' : 'attempts'} remaining.`);
            } else {
                setElementText('#comment', `The secret number is higher. ${remainingAttempts} ${(remainingAttempts === 1) ? 'attempt' : 'attempts'} remaining.`);
            }
            attempts++;
        } else {
            setElementText('#comment', `Game over! The secret number was ${secretNumber}.`);
            document.getElementById('new_game').removeAttribute('disabled');
            document.getElementById('userInput').setAttribute('disabled', true); // Disable input field
        }
        clearInput();
    }
    return;
}

function clearInput() {
    document.querySelector('#userInput').value = '';
}

function generateSecretNumber() {
    let generatedNumber = Math.floor(Math.random() * maxNumber) + 1;

    console.log(generatedNumber);
    console.log(generatedNumbersList);
    // If all possible numbers have been drawn
    if (generatedNumbersList.length == maxNumber) {
        setElementText('#title','Congratulations!')
        setElementText('#comment', 'All possible numbers have been drawn');
    } else {
        // If the generated number is already in the list
        if (generatedNumbersList.includes(generatedNumber)) {
            return generateSecretNumber();
        } else {
            generatedNumbersList.push(generatedNumber);
            return generatedNumber;
        }
    }
}

function initialConditions() {
    setElementText('#title', 'Secret Number Game!');
    setElementText('#comment', `Choose a number between 1 and ${maxNumber}. You have ${maxAttempts} attempts.`);
    secretNumber = generateSecretNumber();
    attempts = 1; // Reset attempts to 1
    document.getElementById('userInput').removeAttribute('disabled'); // Enable input field
    console.log(secretNumber);
}

function restartGame() {
    // Clear the input
    clearInput();
    // Reset the list of generated numbers
    //generatedNumbersList = [];
    // Set up initial conditions
    initialConditions();
    // Disable the new game button
    document.querySelector('#new_game').setAttribute('disabled', 'true');
}

initialConditions();