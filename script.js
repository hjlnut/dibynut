
const pages = document.querySelectorAll(".page");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

// GANTI HALAMAN
function goToPage(number) {
    pages.forEach(page => {
        page.classList.remove("active");
    });

    const currentPage = document.getElementById("page" + number);
    currentPage.classList.add("active");

    // Putar video sesuai halaman
    const videos = document.querySelectorAll(".page video");

    videos.forEach(video => {
        video.pause();
    });

    const deferredFrame = currentPage.querySelector("iframe[data-src]");
    if (deferredFrame) {
        deferredFrame.src = deferredFrame.dataset.src;
        deferredFrame.removeAttribute("data-src");
    }

    const currentVideo = document.querySelector(
        "#page" + number + " video"
    );

    if (currentVideo) {
        const deferredPoster = currentVideo.dataset.poster;
        if (deferredPoster) {
            currentVideo.poster = deferredPoster;
            currentVideo.removeAttribute("data-poster");
        }

        const deferredSource = currentVideo.querySelector("source[data-src]");
        if (deferredSource) {
            deferredSource.src = deferredSource.dataset.src;
            deferredSource.removeAttribute("data-src");
            currentVideo.load();
        }

        if (currentVideo.readyState > 0) {
            currentVideo.currentTime = 0;
        }
        currentVideo.play().catch(error => {
            if (error.name !== "AbortError") {
                console.warn("Video playback failed:", error);
            }
        });
    }

    // Musik mulai saat undangan dibuka
    if (number === 2 && music.paused) {
        music.play().then(() => {
            musicToggle.textContent = "♪ ON";
        }).catch(error => {
            if (error.name !== "AbortError") {
                console.warn("Music playback failed:", error);
            }
        });
    }
}

// MUSIK ON / OFF
musicToggle.addEventListener("click", () => {
    if (music.paused) {
        music.play().then(() => {
            musicToggle.textContent = "♪ ON";
        }).catch(error => {
            if (error.name !== "AbortError") {
                console.warn("Music playback failed:", error);
            }
        });
    } else {
        music.pause();
        musicToggle.textContent = "♪ OFF";
    }
});

// NAMA TAMU DARI URL
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
    document.getElementById("guestName").textContent =
        decodeURIComponent(guest.replace(/\+/g, " "));
}
