/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// ###################

// Function to initialize the carousel functionality for each work__box
function initializeCarousel(workBox) {
  let currentSlide = 0;
  const slides = workBox.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  function showSlide(index) {
      // Remove the 'active' class from all slides
      slides.forEach((slide) => slide.classList.remove('active'));

      // Update the currentSlide index
      if (index >= totalSlides) {
          currentSlide = 0;
      } else if (index < 0) {
          currentSlide = totalSlides - 1;
      } else {
          currentSlide = index;
      }

      // Add the 'active' class to the current slide
      slides[currentSlide].classList.add('active');

      // Adjust the transform based on the active slide
      const offset = -currentSlide * 100;
      workBox.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
      showSlide(currentSlide + 1);
  }

  function prevSlide() {
      showSlide(currentSlide - 1);
  }

  // Attach event listeners for the controls
  workBox.querySelector('.next').addEventListener('click', nextSlide);
  workBox.querySelector('.prev').addEventListener('click', prevSlide);

  // Initialize the first slide as active
  showSlide(currentSlide);

  // Modal functionality
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');

  const carouselImages = workBox.querySelectorAll('.carousel-item img');
  carouselImages.forEach(img => {
      img.addEventListener('click', () => {
          modal.style.display = 'flex';
          modalImg.src = img.src;
          captionText.innerHTML = img.alt;
      });
  });

  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.onclick = function () {
      modal.style.display = 'none';
  };

  window.onclick = function (event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  };
}

// Initialize all carousels on the page
document.querySelectorAll('.work__box').forEach(initializeCarousel);