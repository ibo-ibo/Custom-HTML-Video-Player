"use strict";

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const speedButtons = player.querySelectorAll(".speed_button");
const ranges = player.querySelectorAll(".player__slider");
const fullScreenButton = player.querySelector(".fullScreenBtn");

const togglePlayer = function (e) {
  const action = video.paused ? "play" : "pause";
  if (e || e.key === "Space") {
    video[action]();
  }
  const icon = action === "pause" ? "►" : "❚ ❚";
  toggle.textContent = icon;
};

const skip = function (e) {
  video.currentTime += parseFloat(e.target.dataset.skip);
};

const handleRangeUpdate = function (e) {
  video.volume = e.target.value;
};

const handleSpeedUpdate = function (e) {
  video.playbackRate = e.target.dataset.value;
  speedButtons.forEach((btn) => (btn.style.color = "#fff"));
  e.target.style.color = "#ffc600";
};

const handleProgress = function () {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
};

const handleProgressClick = function (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const handleFullScreen = function () {
  video.requestFullscreen();
};

video.addEventListener("click", togglePlayer);
toggle.addEventListener("click", togglePlayer);
skipButtons.forEach((btn) => btn.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
speedButtons.forEach((btn) => btn.addEventListener("click", handleSpeedUpdate));
video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", handleProgressClick);
fullScreenButton.addEventListener("click", handleFullScreen);
