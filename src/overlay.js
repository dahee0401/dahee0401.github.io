"use strict";

const overlay = document.querySelector("#overlay");
const bigPhotos = document.querySelectorAll(".gallery__big_photo");
const thumbnails = document.querySelectorAll(".gallery__thumbnail");
const body = document.querySelector("body");
const closeBtn = document.querySelector(".close");

function handleThumbnailClick(index) {
  return (e) => {
    e.preventDefault();
    body.classList.add("scroll_hidden");
    overlay.style.display = "block";
    const photo = thumbnails[index].querySelector("a").href;
    bigPhotos.forEach((photoElem) => {
      photoElem.src = photo;
    });

    closeBtn.addEventListener("click", closeOverlay);
  };
}

function closeOverlay() {
  overlay.style.display = "none";
  body.classList.remove("scroll_hidden");

  closeBtn.removeEventListener("click", closeOverlay);
}

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", handleThumbnailClick(index));
});

VanillaTilt.init(thumbnails, {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 1,
});
