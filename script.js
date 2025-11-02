// Timer variables for countdown functionality
let timeLeft = 300; // 5 minutes in seconds, used in updateDisplay() line 15
let timerInterval = null; // Stores interval ID, cleared in stopTimer() line 22

// Start the 5-minute countdown timer
function startTimer() {
    // Reset timer to 5 minutes, connects to timeLeft variable line 2
    timeLeft = 300;
    // Start countdown every second, calls updateDisplay() line 15
    timerInterval = setInterval(updateDisplay, 1000);
}

// Update the timer display every second
function updateDisplay() {
    // Calculate minutes from remaining seconds, shows in HTML line 12
    let minutes = Math.floor(timeLeft / 60);
    // Calculate remaining seconds, shows in HTML line 12  
    let seconds = timeLeft % 60;
    // Format display with leading zeros, updates HTML element line 12
    document.getElementById('display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Stop and reset the timer
function stopTimer() {
    // Stop the countdown interval, uses timerInterval from line 3
    clearInterval(timerInterval);
    // Reset timer back to 5 minutes, connects to timeLeft line 2
    timeLeft = 300;
    // Update display to show reset time, calls updateDisplay() line 15
    updateDisplay();
}