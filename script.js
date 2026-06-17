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
function dragElement(element) {

    var initialX=0;
    var initialY=0;
    var currentX=0;
    var currentY=0;

    if (document.getElementById(element.id + "header")){
        document.getElementById(element.id + "header").onmousedown = startDragging;
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
var button=document.querySelector("#startbutton")

button.addEventListener("click", function() {
    document.getElementById("startbutton").style.display = "none";
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            videoCamera = stream;
            const video = document.getElementById("video");
            video.srcObject = stream;
           
            
        }
    );
});
function stopCamera() {
    const video = document.getElementById("video");
    if (videoCamera) {
        videoCamera.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    if (video) {
        video.srcObject = null;
    };
}
button.addEventListener("click", function() {
    document.getElementById("calculatorbutton").style.display = "none";
    document.getElementById("calculator").style.display = "";
    
});

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

// Fix the button behavior from your script where clicking start button hid something else
var calcAppOpen = document.querySelector("#calculatoropen");
calcAppOpen.addEventListener("click", function() {
    document.getElementById("calculator").style.display = "";
});
var submitButton = document.getElementById("submitbutton");
submitButton.addEventListener("click", function() {
    var nameInput = document.getElementById("nameinput").value;
    document.getElementById("nameDisplay").innerText = nameInput;
});