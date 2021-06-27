const player = document.querySelector('.player')
const video = document.querySelector('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const speed = document.querySelector('.player-speed')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const fullscreenBtn = document.querySelector('.fullscreen')

let lastVolume = 1
let fullscreen = false

// play & pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
}

function togglePlay() {
    if (video.paused) {
        video.play()
        playBtn.classList.replace('fa-play', 'fa-pause')
        playBtn.setAttribute('title', 'Pause')
    } else {
        video.pause()
        showPlayIcon()
    }
}

// progress bar ---------------------------------- //
// prefix number with zero
function addZero(number) {
    return number > 9 ? `${number}` : `0${number}`
}

// calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${addZero(minutes)}:${addZero(seconds)}`
}

// update progress bar as video plays
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.width = `${percent}%`
    currentTime.textContent = displayTime(video.currentTime)
    duration.textContent = displayTime(video.duration)
}

// click to seek within the video
function setProgress(evt) {
    const newTime = evt.offsetX / progressRange.offsetWidth
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration
}

// volume controls --------------------------- //

// set volume icon
function setVolumeIcon(volume) {
    // change icon depending on volume
    volumeIcon.className = 'fas'
    if (volume > 0.7) {
        volumeIcon.classList.add('fa-volume-up')
    } else if (volume > 0 && volume <= 0.7) {
        volumeIcon.classList.add('fa-volume-down')
    } else if (volume <= 0) {
        volumeIcon.classList.add('fa-volume-off')
    }
}

// volume bar
function changeVolume(evt) {
    let volume = evt.offsetX / volumeRange.offsetWidth
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume
    setVolumeIcon(volume)
    lastVolume = volume
}

// mute / unmute
function toggleMute() {
    if (video.volume) {
        // lastVolume = video.volume
        video.volume = 0
        volumeBar.style.width = 0
        volumeIcon.setAttribute('title', 'Unmute')
        setVolumeIcon(0)
    } else {
        video.volume = lastVolume
        volumeBar.style.width = `${lastVolume * 100}%`
        volumeIcon.setAttribute('title', 'Mute')
        setVolumeIcon(lastVolume)
    }
}

// change playback speed -------------------- //
function changeSpeed(evt) {
    video.playbackRate = evt.target.value
}

// fullscreen ------------------------------- //

// view in fullscreen
function openInFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullscreen) {
        // firefox
        element.mozRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
        // chrome, safari and opera mini
        element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
        // ie / edge
        element.msRequestFullscreen()
    }
    video.classList.add('video-fullscreen')
}

// exit fullscreen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.moxCancelFullscreen) {
        // firefox
        document.mozCancelFullscreen()
    } else if (document.webkitExitFullscreen) {
        // chrome, safari and opera mini
        document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
        // ie / edge
        document.msExitFullscreen()
    }
    video.classList.remove('video-fullscreen')
}

//  toggle fullscreen
function toggleFullscreen() {
    if (fullscreen) {
        exitFullscreen()
    } else {
        openInFullscreen(player)
    }
    fullscreen = !fullscreen
}

// event listeners
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('ended', showPlayIcon)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeSpeed)
fullscreenBtn.addEventListener('click', toggleFullscreen)
