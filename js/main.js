// assets/js/main.js

// smooth scroll untuk link navbar
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});


// Marquee certificates: ensure seamless, non-stuttering loop
document.addEventListener('DOMContentLoaded', () => {
  const marquee = document.querySelector('.cert-marquee');
  if (!marquee) return;
  const track = marquee.querySelector('.cert-track');
  if (!track) return;

  // wait for images to load so measurements are accurate
  const imgs = track.querySelectorAll('img');
  const imgPromises = Array.from(imgs).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => img.addEventListener('load', resolve));
  });

  Promise.all(imgPromises).then(initMarquee).catch(initMarquee);

  function initMarquee() {
    // duplicate content at least once (so we have two identical halves)
    const original = track.innerHTML;
    if (!original) return;
    // ensure enough content to cover continuous scroll
    track.innerHTML = original + original;

    // if still not wide enough, append more copies until large enough
    while (track.scrollWidth < marquee.clientWidth * 2) {
      track.innerHTML += original;
    }

    // compute exact scroll distance (half of the track's full scrollWidth)
    const distance = track.scrollWidth / 2;

    // set CSS variables used by the animation
    track.style.setProperty('--scroll-distance', `${distance}px`);

    // set duration dynamically for smoothness (pixels per second)
    const speed = 120; // px per second — tweak to desired speed
    const duration = Math.max(6, distance / speed); // minimum duration for stability
    track.style.setProperty('--marquee-duration', `${duration}s`);

    // make sure animation restarts cleanly
    track.style.animation = 'none';
    // force reflow then restore animation
    void track.offsetWidth;
    track.style.animation = '';
  }
});

// Wrap all images with a wrapper to show lightning OUTSIDE the image
function wrapAllImages() {
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    // skip images already inside a wrapper we control
    if (img.closest('.img-light') || img.closest('.cert-card')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'img-light';
    // preserve image layout by copying display/width styles if inline
    const parent = img.parentNode;
    parent.replaceChild(wrapper, img);
    wrapper.appendChild(img);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  wrapAllImages();
});

