// Timer variables for countdown functionality
let timeLeft = 300; // Default 5 minutes in seconds, used in updateDisplay() line 17
let timerInterval = null; // Stores interval ID, cleared in stopTimer() line 30

// Start countdown timer with custom minutes
function startTimer() {
    // Stop any existing timer first, prevents multiple timers
    clearInterval(timerInterval);
    // Get minutes from input field, connects to HTML input line 13
    let minutes = parseInt(document.getElementById('minutesInput').value) || 5;
    // Convert minutes to seconds, used in countdown() line 26
    timeLeft = minutes * 60;
    // Start countdown every second, calls countdown() line 26
    timerInterval = setInterval(countdown, 1000);
}

// Count down one second and update display
function countdown() {
    // Reduce time by one second, connects to timeLeft line 2
    timeLeft--;
    // Update display with new time, calls updateDisplay() line 18
    updateDisplay();
    // Debug output to console to verify countdown works
    console.log('Timer: ' + timeLeft + ' seconds remaining');
    // Check if timer finished, stops at zero
    if (timeLeft <= 0) {
        // Stop timer when reaching zero, calls stopTimer() line 32
        stopTimer();
        // Alert user that timer is finished
        alert('Timer beendet!');
    }
}

// Update the timer display format
function updateDisplay() {
    // Calculate minutes from remaining seconds, shows in HTML line 14
    let minutes = Math.floor(timeLeft / 60);
    // Calculate remaining seconds, shows in HTML line 14
    let seconds = timeLeft % 60;
    // Format display with leading zeros, updates HTML element line 14
    document.getElementById('display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Stop and reset the timer
function stopTimer() {
    // Stop the countdown interval, uses timerInterval from line 3
    clearInterval(timerInterval);
    // Clear timer reference to prevent conflicts
    timerInterval = null;
    // Get current input value for reset, connects to HTML input line 13
    let minutes = parseInt(document.getElementById('minutesInput').value) || 5;
    // Reset timer to input value, connects to timeLeft line 2
    timeLeft = minutes * 60;
    // Update display to show reset time, calls updateDisplay() line 18
    updateDisplay();
}

// Initialize timer when page loads
window.onload = function() {
    // Set initial display, calls updateDisplay() line 17
    updateDisplay();
    // Update display when input changes, connects to HTML input line 13
    document.getElementById('minutesInput').addEventListener('input', function() {
        // Update timer when input changes, calls stopTimer() line 30
        if (!timerInterval) stopTimer();
    });
}