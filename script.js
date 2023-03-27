let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let rotationInterval;

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        document.querySelector('.song-img').classList.remove('rotate');
    }
    else{
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        document.querySelector('.song-img').classList.add('rotate');
    }
}

function rotateImage() {
    let songImg = document.querySelector(".song-img");
    let rotationAngle = 0;
  
    rotationInterval = setInterval(() => {
      rotationAngle += 1; // crește unghiul cu 1 grad
      songImg.style.transform = "rotate(" + rotationAngle + "deg)";
    }, 200); // intervalul a fost crescut la 200ms (în loc de 100ms)
}

function stopRotation() {
  clearInterval(rotationInterval);
}

setInterval(() => {
    progress.value = song.currentTime;
}, 500);

progress.onchange = function() {
    song.currentTime = progress.value;
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
};

song.addEventListener("ended", function() {
  fadeInOut(this);
});

song.addEventListener("playing", function() {
  fadeInOut(this);
});

function fadeInOut(element) {
  let op = 0.1;  // opacitatea initiala
  element.volume = 0.1;  // volumul initial
  let fadeInOutInterval = setInterval(function () {
    if (op >= 1){
      clearInterval(fadeInOutInterval);
    }
    element.volume = op;
    element.style.opacity = op;
    op += 0.1;
  }, 200);  // intervalul pentru fade-in
  setTimeout(function() {
    let fadeOutInterval = setInterval(function () {
      if (op <= 0.1){
        clearInterval(fadeOutInterval);
        element.pause();
      }
      element.volume = op;
      element.style.opacity = op;
      op -= 0.1;
    }, 200);  // intervalul pentru fade-out
  }, element.duration * 1000 - 2000);  // timpul pentru fade-out
}

let bgColors = ["#1a1a1a", "#3f3f3f", "#616161", "#9e9e9e", "#bdbdbd", "#e0e0e0"];

song.addEventListener("playing", function() {
  let currentBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
  document.body.style.backgroundColor = currentBgColor;
});
