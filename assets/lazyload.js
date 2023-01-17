window.onload = () => {
  lazyload();
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);

  const lazyImages = document.querySelectorAll("img.lazy");
  lazyImages.forEach((image, index) => {
    const timeoutTime = 1000 + index * 500;
    setTimeout(() => {
      image.classList.remove("lazy");
      image.src = image.dataset.src;
    }, timeoutTime);
  });
};

function lazyload() {
  const lazyImages = document.querySelectorAll("img.lazy");
  let lazyloadThrottleTimeout;
  if (lazyloadThrottleTimeout) {
    clearTimeout(lazyloadThrottleTimeout);
  }

  lazyloadThrottleTimeout = setTimeout(function () {
    const scrollTop = window.pageYOffset;
    lazyImages.forEach((img) => {
      if (img.offsetTop < window.innerHeight + scrollTop + window.innerHeight / 2) {
        img.classList.remove("lazy");
        img.src = img.dataset.src;
      }
    });
    if (lazyImages.length == 0) {
      document.removeEventListener("scroll", lazyload);
      window.removeEventListener("resize", lazyload);
      window.removeEventListener("orientationChange", lazyload);
    }
  }, 20);
}
