import gallery from "./app.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  image: document.querySelector(".lightbox__image"),
  button: document.querySelector('[data-action = "close-lightbox"]'),
  overlay: document.querySelector(".lightbox__overlay"),
};

console.log(refs.modal);
console.log(refs.image);

//create gallerry
const galleryItemRef = createGalleryMarkUp(gallery);

function createGalleryMarkUp(images) {
  return images.map(
    ({ original, preview, description }) => `<li class = "gallery__item">
    <a
  class="gallery__link"
  href=${original}
>
  <img
    class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description}
  />
</a>
</li>`
  );
}

refs.gallery.innerHTML = galleryItemRef.join("");
console.log(refs.gallery);

refs.gallery.addEventListener("click", onOpenImage);
refs.button.addEventListener("click", onCloseImage);
refs.overlay.addEventListener("click", onCloseImage);

function onOpenImage(event) {
  event.preventDefault();
  window.addEventListener("keydown", onEscapePress);
  refs.lightbox.classList.add("is-open");
  refs.image.src = event.target.getAttribute("data-source");
  refs.image.alt = event.target.alt;
}

function onCloseImage(event) {
  event.preventDefault();
  window.removeEventListener("keydown", onEscapePress);
  refs.lightbox.classList.remove("is-open");
  refs.image.src = "";
  refs.image.alt = "";
}

function onEscapePress(event) {
  if (event.code === "Escape") {
    onCloseImage();
  }
}
