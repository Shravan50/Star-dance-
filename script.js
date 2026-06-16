function updateTime() {
    var CurrentTime= new Date().toLocaleString();
    var timeText = document.querySelector("#TimeElement");
    timeText.innerHTML= CurrentTime;
            }
setInterval(updateTime,1000);
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("camera"));
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
        srcObject = null;
    });
}
ToggleWindows("#welcome", "#welcomeopen", "#welcomeclose");
ToggleWindows("#camera", "#cameraopen", "#cameraclose");
var button=document.querySelector("#startbutton")

button.addEventListener("click", function() {
    document.getElementById("startbutton").style.display = "none";
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            const video = document.getElementById("video");
            video.srcObject = stream;
            
        }
    );
});