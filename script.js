// Timer variables for countdown functionality
let timeLeft = 300; // Default 5 minutes in seconds, used in updateDisplay() line 52
let timerInterval = null; // Stores interval ID, cleared in stopTimer() line 86
let totalTime = 300; // Total timer duration, used for progress calculation line 57
let displayMode = 'text'; // Current display mode, changed in changeDisplayMode() line 77

// Validate time inputs to ensure correct values
function validateInputs() {
    // Get minutes input element, connects to HTML input line 15
    let minutesEl = document.getElementById('minutesInput');
    // Get seconds input element, connects to HTML input line 17
    let secondsEl = document.getElementById('secondsInput');
    // Ensure minutes are between 0-59
    if (minutesEl.value > 59) minutesEl.value = 59;
    if (minutesEl.value < 0) minutesEl.value = 0;
    // Ensure seconds are between 0-59
    if (secondsEl.value > 59) secondsEl.value = 59;
    if (secondsEl.value < 0) secondsEl.value = 0;
}

// Start countdown timer with custom time
function startTimer() {
    // Validate inputs first, calls validateInputs() line 6
    validateInputs();
    // Stop any existing timer first, prevents multiple timers
    clearInterval(timerInterval);
    // Get minutes from input field, connects to HTML input line 15
    let minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    // Get seconds from input field, connects to HTML input line 17
    let seconds = parseInt(document.getElementById('secondsInput').value) || 0;
    // Check if any time is set, prevent starting with 0:00
    if (minutes === 0 && seconds === 0) {
        alert('Bitte eine Zeit größer als 0:00 eingeben!');
        return;
    }
    // Convert to total seconds, used in countdown() line 42
    timeLeft = (minutes * 60) + seconds;
    // Store total time for progress calculation, used in updateDisplay() line 52
    totalTime = timeLeft;
    // Start countdown every second, calls countdown() line 42
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

// Update the timer display in all modes
function updateDisplay() {
    // Calculate minutes from remaining seconds, used in all display modes
    let minutes = Math.floor(timeLeft / 60);
    // Calculate remaining seconds, used in all display modes  
    let seconds = timeLeft % 60;
    // Format time string with leading zeros
    let timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update text display mode, connects to HTML textDisplay line 18
    document.getElementById('textDisplay').textContent = timeString;
    
    // Update progress bar display, connects to HTML barDisplay line 21
    let progress = ((totalTime - timeLeft) / totalTime) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('barTime').textContent = timeString;
    
    // Update circle display, connects to HTML circleDisplay line 28  
    let circumference = 2 * Math.PI * 90;
    let offset = circumference - (progress / 100) * circumference;
    document.getElementById('circleProgress').style.strokeDashoffset = offset;
    document.getElementById('circleTime').textContent = timeString;
}

// Change display mode between text, bar, and circle
function changeDisplayMode(mode) {
    // Set current display mode, connects to displayMode variable line 4
    displayMode = mode;
    // Hide all display modes first, affects HTML elements line 18,21,28
    document.getElementById('textDisplay').classList.add('hidden');
    document.getElementById('barDisplay').classList.add('hidden');
    document.getElementById('circleDisplay').classList.add('hidden');
    // Remove active class from all mode buttons, affects HTML line 16
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    // Show selected display mode, connects to HTML elements
    if (mode === 'text') {
        document.getElementById('textDisplay').classList.remove('hidden');
        document.getElementById('textBtn').classList.add('active');
    } else if (mode === 'bar') {
        document.getElementById('barDisplay').classList.remove('hidden');
        document.getElementById('barBtn').classList.add('active');
    } else if (mode === 'circle') {
        document.getElementById('circleDisplay').classList.remove('hidden');
        document.getElementById('circleBtn').classList.add('active');
    }
}

// Stop and reset the timer
function stopTimer() {
    // Stop the countdown interval, uses timerInterval from line 3
    clearInterval(timerInterval);
    // Clear timer reference to prevent conflicts
    timerInterval = null;
    // Get current minutes value for reset, connects to HTML input line 15
    let minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    // Get current seconds value for reset, connects to HTML input line 17
    let seconds = parseInt(document.getElementById('secondsInput').value) || 0;
    // Reset timer to input values, connects to timeLeft line 2
    timeLeft = (minutes * 60) + seconds;
    // Reset total time for progress calculation
    totalTime = timeLeft;
    // Update display to show reset time, calls updateDisplay() line 35
    updateDisplay();
}

// Initialize timer when page loads
window.onload = function() {
    // Set initial display, calls updateDisplay() line 33
    updateDisplay();
    // Initialize circle progress display, connects to HTML circleProgress line 32
    let circumference = 2 * Math.PI * 90;
    document.getElementById('circleProgress').style.strokeDasharray = circumference;
    document.getElementById('circleProgress').style.strokeDashoffset = circumference;
    // Update display when minutes input changes, connects to HTML input line 15
    document.getElementById('minutesInput').addEventListener('input', function() {
        // Update timer when input changes, calls stopTimer() line 74
        if (!timerInterval) stopTimer();
    });
    // Update display when seconds input changes, connects to HTML input line 17
    document.getElementById('secondsInput').addEventListener('input', function() {
        // Update timer when input changes, calls stopTimer() line 74
        if (!timerInterval) stopTimer();
    });
}