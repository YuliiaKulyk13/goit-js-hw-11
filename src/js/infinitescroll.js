const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry);
    }
  });
};

const options = {
  // rootMargin: '100px',
  // threshold: 0,
};

const observer = new IntersectionObserver(callback, options);

const sentinel = document.querySelector('#sentinel');
observer.observe(sentinel);
