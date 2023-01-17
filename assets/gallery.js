handleFilters();
setupListeners();

function openModal(image) {
  const modal = document.querySelector(".gallery-modal");
  modal.showModal();
  modal.classList.remove("closed")
  modalDisplayImage(image);
}

function setupListeners() {
  const imageGallery = document.querySelectorAll(".gallery-item-container img");
  const modal = document.querySelector(".gallery-modal");
  const nextButton = document.querySelector(".modal-control-next");
  const prevButton = document.querySelector(".modal-control-prev");

  nextButton.addEventListener("click", () => {
    modalScrollThroughImage("next");
  });
  prevButton.addEventListener("click", () => {
    modalScrollThroughImage("prev");
  });

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.add("closed")
      setTimeout(()=>{modal.close()}, 300)
    }
  };

  imageGallery.forEach((image) => {
    image.addEventListener("click", () => {
      openModal(image);
    });
  });
}

function displayCategory(category) {
  const imageGallery = document.querySelectorAll(".gallery-item-container");
  const modal = document.querySelector(".gallery-modal");

  if (category === "all") {
    imageGallery.forEach((image) => {
      image.classList.remove("hidden");
      setTimeout(() => {
        image.classList.add("active");
      }, 10);
    });
    return;
  }

  imageGallery.forEach((image) => {
    // image.dataset.galleryTag === category ? image.classList.remove("hidden") : image.classList.add("hidden");
    if (image.dataset.galleryTag !== category) image.classList.remove("active");
    if (image.dataset.galleryTag === category) {
      image.classList.remove("hidden");
      setTimeout(() => {
        image.classList.add("active");
      }, 10);
    }

    setTimeout(() => {
      image.classList.remove("hide-transition");
      if (image.dataset.galleryTag !== category) image.classList.add("hidden");
    }, 500);
  });
}

function handleFilters() {
  const filters = document.querySelectorAll(".filter");
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      document.querySelector(".filter.active").classList.remove("active");
      filter.classList.add("active");
      displayCategory(filter.dataset.imagesToggle);
    });
  });
}

function modalScrollThroughImage(nextOrPrev) {
  const activeImages = document.querySelectorAll(".gallery-item-container.active img");
  const currentImage = document.querySelector(".modal-image");
  const currentId = currentImage.dataset.id;
  let currentIndex;

  activeImages.forEach((image, index) => {
    if (image.dataset.id === currentId) {
      currentIndex = index;
    }
  });

  if (nextOrPrev === "next") {
    const imageIsLast = currentIndex === activeImages.length - 1;
    imageIsLast ? modalDisplayImage(activeImages[0]) : modalDisplayImage(activeImages[currentIndex + 1]);
  }
  if (nextOrPrev === "prev") {
    const imageIsFirst = currentIndex === 0;
    imageIsFirst
      ? modalDisplayImage(activeImages[activeImages.length - 1])
      : modalDisplayImage(activeImages[currentIndex - 1]);
  }
}

function modalDisplayImage(image) {
  const modalImg = document.querySelector(".modal-image");
  modalImg.src = image.dataset.src;
  modalImg.alt = image.alt;
  modalImg.dataset.id = image.dataset.id;
}
