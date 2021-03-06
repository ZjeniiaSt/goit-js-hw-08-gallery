import gallery from "./app.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  image: document.querySelector(".lightbox__image"),
  button: document.querySelector('[data-action = "close-lightbox"]'),
  overlay: document.querySelector(".lightbox__overlay"),
};

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

//open/close
refs.gallery.addEventListener("click", onOpenImage);
refs.button.addEventListener("click", onCloseImage);
refs.overlay.addEventListener("click", onCloseImage);

function onOpenImage(event) {
  event.preventDefault();
  window.addEventListener("keydown", onEscapePress);
  document.addEventListener("keydown", onChangeImageKeyPress);
  refs.lightbox.classList.add("is-open");

  //setImageAttributer(refs.image, {
  // src: event.target.dataset.source,
  // alt: event.target.alt,
  // });

  Object.assign(refs.image, {
    src: event.target.dataset.source,
    alt: event.target.alt,
  });
}

function onCloseImage(event) {
  window.removeEventListener("keydown", onEscapePress);
  document.removeEventListener("keydown", onChangeImageKeyPress);
  refs.lightbox.classList.remove("is-open");

  //setImageAttributer(refs.image, {
  // src: "",
  // alt: "",
  //});

  Object.assign(refs.image, {
    src: "",
    alt: "",
  });
}

// function setImageAttributer(image, attributes) {
//   for (let key in attributes) {
//     image.setAttribute(key, attributes[key]);
//   }
// }

function onEscapePress(event) {
  if (event.keyCode === 27) {
    onCloseImage();
  }
}

//left/right
function onChangeImageKeyPress(event) {
  let currentIndex = gallery.findIndex((image) => {
    return image.original === refs.image.src;
  });

  let nextIndex = currentIndex + 1;
  let previousIndex = currentIndex - 1;

  if (event.keyCode === 39) {
    if (nextIndex >= gallery.length) {
      nextIndex = 0;
    }

    Object.assign(refs.image, {
      src: gallery[nextIndex].original,
      alt: gallery[nextIndex].description,
    });
  }
  if (event.keyCode === 37) {
    if (previousIndex < 0) {
      previousIndex = gallery.length - 1;
    }

    Object.assign(refs.image, {
      src: gallery[previousIndex].original,
      alt: gallery[previousIndex].description,
    });
  }
}
