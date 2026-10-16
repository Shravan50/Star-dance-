let videoCamera = null;
function updateTime() {
    var CurrentTime= new Date().toLocaleString();
    var timeText = document.querySelector("#TimeElement");
    timeText.innerHTML= CurrentTime;
            }
setInterval(updateTime,1000);
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("camera"));
dragElement(document.getElementById("Notes"));
dragElement(document.getElementById("calculator"));
dragElement(document.getElementById("browser"));
dragElement(document.getElementById("drawingpad"));
dragElement(document.getElementById("NASApictures"));
dragElement(document.getElementById("PomodoroTimer"), "TimerHeader");
function dragElement(element, headerId = element.id + "header") {

    var initialX=0;
    var initialY=0;
    var currentX=0;
    var currentY=0;

    const dragHandle = document.getElementById(headerId);
    if (dragHandle){
        dragHandle.onmousedown = startDragging;
    } else{
        element.onmousedown = startDragging;
  }

  
    function startDragging(e) {
        e=e || window.event;
        e.preventDefault();
        initialX = e.clientX
        initialY = e.clientY
        document.onmouseup = stopDragging;
        document.onmousemove = ElementDrag;
    }
    function ElementDrag(e) {
        e=e || window.event
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
     }

    }

function closeWindow(element) {
    element.style.display = "none"
}
function openWindow(element) {
  element.style.display = ""
}
function ToggleWindows(windowSelector, open, close) {
    var window = document.querySelector(windowSelector);
    var openButton = document.querySelector(open);
    var closeButton = document.querySelector(close);
    openButton.addEventListener("click", function() {
        openWindow(window);
    });
    closeButton.addEventListener("click", function() {
        closeWindow(window);
        stopCamera();
    });
}
ToggleWindows("#welcome", "#welcomeopen", "#welcomeclose");
ToggleWindows("#camera", "#cameraopen", "#cameraclose");
ToggleWindows("#Notes", "#Notesopen", "#Notesclose");
ToggleWindows("#calculator","#calculatoropen", "#calculatorclose");
ToggleWindows("#browser", "#browseropen", "#browserclose");
ToggleWindows("#drawingpad", "#drawingpadopen", "#drawingpadclose");
ToggleWindows("#NASApictures", "#NASApicturesopen", "#NASApicturesclose");
ToggleWindows("#PomodoroTimer", "#PomodoroTimeropen", "#PomodoroTimerclose");
function startCamera() {
    if (videoCamera) {
        return;
    }

    const startButton = document.getElementById("startbutton");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            videoCamera = stream;
            const video = document.getElementById("video");
            video.srcObject = stream;
            video.play().catch(function(error) {
                console.error("Unable to start camera preview:", error);
            });
            startButton.style.display = "none";
        })
        .catch(function(error) {
            console.error("Unable to access the camera:", error);
        }
    );
}

document.querySelector("#cameraopen").addEventListener("click", startCamera);
document.querySelector("#startbutton").addEventListener("click", startCamera);

var pictureButton = document.querySelector("#takepicture");
pictureButton.addEventListener("click", function() {
    const video = document.getElementById("video");
    if (!video.videoWidth || !video.videoHeight) {
        return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL("image/png");
    const imageElement = document.createElement("img");
    imageElement.src = imageDataUrl;
    imageElement.style.maxWidth = "100%";
    document.getElementById("camera").appendChild(imageElement);
    setTimeout(function() {
        imageElement.remove();
    }, 5000);
});
function stopCamera() {
    const video = document.getElementById("video");
    if (videoCamera) {
        videoCamera.getTracks().forEach(track => track.stop());
        videoCamera = null;
        video.srcObject = null;
    }
    if (video) {
        video.srcObject = null;
        document.getElementById("startbutton").style.display = "";
    };
}

document.getElementById("calculator").style.display = "none";
const display = document.getElementById("calculatordisplay");
const buttons = document.querySelectorAll(".calculator-button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "=") {
            
            try {
                if (display.value.trim() === "") return;
                
                // Using Function instead of eval for basic safety
                const result = new Function(`return ${display.value}`)();
                display.value = result;
            } catch (error) {
                display.value = "Error";
            }
        } else if (button.innerText.toLowerCase() === "AC" || value === "AC") {
            display.value = "";
        } else {
            if (display.value === "Error") {
                display.value = "";
            }
            // Append the clicked button value to the display
            display.value += value;
        }
    });
});


var submitButton = document.getElementById("submitbutton");
submitButton.addEventListener("click", function() {
    var nameInput = document.getElementById("nameinput").value;
    document.getElementById("nameDisplay").innerText = nameInput;
    document.getElementById("welcomemessage").innerText = "Welcome, "+nameInput+"!";
});

var drawingPadCanvas = document.getElementById("drawingpadcanvas");
var drawingPadContext = drawingPadCanvas.getContext("2d");
var isDrawing = false;

drawingPadContext.strokeStyle = "#00f2fe"; 
drawingPadContext.lineWidth = 3;
drawingPadContext.lineCap = "round";
drawingPadContext.lineJoin = "round";

drawingPadCanvas.addEventListener("mousedown", function(e) {
    isDrawing = true;
    drawingPadContext.beginPath();
    drawingPadContext.moveTo(e.offsetX, e.offsetY);
});

drawingPadCanvas.addEventListener("mousemove", function(e) {
    if (isDrawing) {
        drawingPadContext.lineTo(e.offsetX, e.offsetY);
        drawingPadContext.stroke();
    }
});

drawingPadCanvas.addEventListener("mouseup", function() {
    isDrawing = false;
});

drawingPadCanvas.addEventListener("mouseleave", function() {
    isDrawing = false;
});

// NASA Pictures functionality
const nasaPictureButton = document.getElementById("NASApicturebutton");
const nasaPictureImg = document.getElementById("NASApicture");
const nasaApiKey = "DEMO_KEY";
const nasaFirstApodDate = new Date("1995-06-16T00:00:00Z");
const nasaFallbackImage = "https://www.nasa.gov/wp-content/uploads/2023/04/nasa-logo-web-rgb.png";

function getRandomApodDate() {
    const today = new Date();
    const availableDays = Math.floor(
        (today - nasaFirstApodDate) / (1000 * 60 * 60 * 24)
    );
    const randomDay = Math.floor(Math.random() * (availableDays + 1));
    const randomDate = new Date(nasaFirstApodDate);
    randomDate.setUTCDate(randomDate.getUTCDate() + randomDay);
    return randomDate.toISOString().slice(0, 10);
}

if (nasaPictureButton && nasaPictureImg) {
    nasaPictureButton.addEventListener("click", function() {
        nasaPictureButton.disabled = true;
        nasaPictureButton.textContent = "Please wait...";

        fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${getRandomApodDate()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`NASA request failed: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.media_type === "image" && data.url) {
                    nasaPictureImg.onerror = function() {
                        nasaPictureImg.onerror = null;
                        nasaPictureImg.src = nasaFallbackImage;
                    };
                    nasaPictureImg.src = data.url;
                } else {
                    nasaPictureImg.src = nasaFallbackImage;
                }
            })
            .catch(error => {
                console.error("Unable to load a random NASA picture:", error);
                nasaPictureImg.src = nasaFallbackImage;
            })
            .finally(() => {
                nasaPictureButton.disabled = false;
                nasaPictureButton.textContent = "Get Random NASA Picture";
            });
    });
}
// fullscreen functionality
const fullscreenButton = document.getElementById("fullscreen");
if (fullscreenButton) {
    fullscreenButton.addEventListener("click", function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    });
}
// Pomodoro Timer functionality
let timerDuration = 25 * 60; // 25 minutes in seconds
let timerRemaining = timerDuration;
let timerInterval = null;

const timerDisplay = document.getElementById("TimerDisplay");
const startButton = document.getElementById("startTimer");
const pauseButton = document.getElementById("pauseTimer");
const resetButton = document.getElementById("resetTimer");

function updateTimerDisplay() {
    const minutes = Math.floor(timerRemaining / 60);
    const seconds = timerRemaining % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals
    timerInterval = setInterval(() => {
        if (timerRemaining > 0) {
            timerRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up!");
        }
    }, 1000);
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    pauseTimer();
    timerRemaining = timerDuration;
    updateTimerDisplay();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Initialize the timer display
updateTimerDisplay();