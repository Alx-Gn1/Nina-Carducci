setupListeners();

function setupListeners() {
  setInterval(showNextSlide, 5000);

  const nextButton = document.querySelector(".carousel-control-next");
  const prevButton = document.querySelector(".carousel-control-prev");
  nextButton.addEventListener("click", showNextSlide);
  prevButton.addEventListener("click", showPrevSlide);

  const selectSlideButtons = document.querySelectorAll(".carousel-indicators button");
  selectSlideButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showSlide(index);
    });
  });
}

function showNextSlide() {
  const slides = document.querySelectorAll(".carousel-item");
  const activeSlide = document.querySelector(".carousel-item.active");
  const activeId = Number(activeSlide.dataset.id);

  if (activeId < slides.length - 1) {
    showSlide(activeId + 1, "from right");
  } else {
    showSlide(0, "from right");
  }
}

function showPrevSlide() {
  const slides = document.querySelectorAll(".carousel-item");
  const activeSlide = document.querySelector(".carousel-item.active");
  const activeId = Number(activeSlide.dataset.id);

  if (activeId > 0) {
    showSlide(activeId - 1, "from left");
  } else {
    showSlide(slides.length - 1, "from left");
  }
}

function showSlide(number, fromDirection) {
  const activeSlide = document.querySelector(".carousel-item.active");
  const activeId = Number(activeSlide.dataset.id);
  if (number === activeId) return;

  const slides = document.querySelectorAll(".carousel-item");
  const selectSlideButtons = document.querySelectorAll(".carousel-indicators button");

  slides.forEach((slide, index) => {
    // Slide to select
    if (index === number) {
      fromDirection === "from right" || (fromDirection === undefined && activeId < number)
        ? (slide.style.transform = "translateX(100%)")
        : (slide.style.transform = "translateX(-100%)");
      slide.classList.add("active");
      setTimeout(() => {
        slide.style.transform = "translateX(0%)";
      }, 1);
    }
    // Former selected slide
    if (index === activeId) {
      slide.style.transform = "translateX(0%)";
      fromDirection === "from left" || (fromDirection === undefined && activeId > number)
        ? setTimeout(() => {
            slide.style.transform = "translateX(100%)";
          }, 1)
        : setTimeout(() => {
            slide.style.transform = "translateX(-100%)";
          }, 1);
      setTimeout(() => {
        slide.classList.remove("active");
      }, 500);
    }
  });
  selectSlideButtons.forEach((button, index) => {
    if (index === number) {
      button.classList.add("active");
    }
    if (index === activeId) {
      button.classList.remove("active");
    }
  });
}
