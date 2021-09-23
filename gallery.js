import gallery from "./app.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  image: document.querySelector(".lightbox__image"),
  button: document.querySelector('[data-action = "close-lightbox"]'),
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

//open modal

refs.gallery.addEventListener("click", onImageClickOpen);

function onImageClickOpen(event) {
  event.preventDefault();
  refs.lightbox.classList.add("is-open");
  refs.image.src = event.target.getAttribute("data-source");
  refs.image.alt = event.target.alt;
}

//close modal
refs.button.addEventListener("click", onBtnClickClose);

function onBtnClickClose(event) {
  event.preventDefault();
  refs.lightbox.classList.remove("is-open");
  refs.image.src = "";
  refs.image.alt = "";
}
