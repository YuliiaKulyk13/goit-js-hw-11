import PixabayApiServise from './pixabay-service';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/style.css';

const PixabayApiService = new PixabayApiServise();
const lightbox = new SimpleLightbox('.gallery a');

console.log(PixabayApiService);

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const galleryList = document.querySelector('.gallery');
const sentinel = document.querySelector('#sentinel');

let totalHits = 0;

function onSearch(e) {
  e.preventDefault();

  observer.observe(sentinel);
  PixabayApiService.resetPage();
  clearContainer();

  PixabayApiService.query = searchInput.value;

  if (PixabayApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    PixabayApiService.resetPage();
    clearContainer();
    return;
  } else {
    PixabayApiService.fetchPictures()
      .then(images => {
        totalHits = images.totalHits;
        appendImagesMarkup(images.hits);
        PixabayApiService.incrementPage();
        PixabayApiService.resetPage();

        observer.observe(sentinel);

        Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
      })
      .catch(() => {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      });
  }
}

function appendImagesMarkup(images) {
  const galleryItem = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
        <div class="photo-card">
    <a href ="${largeImageURL}">
  <img src="${webformatURL}" alt=${tags} loading="lazy" width='281' height = '180'>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', galleryItem);
  lightbox.refresh();
  smoothScroll();
}

function clearContainer() {
  galleryList.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && PixabayApiService.query !== '') {
      PixabayApiService.incrementPage();
      PixabayApiService.fetchPictures().then(images => {
        appendImagesMarkup(images.hits);

        if (images.hits.length === images.total) {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );

          observer.unobserve(sentinel);
        }
      });
    }
  });
};

const options = {
  rootMargin: '150px',
};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(sentinel);

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

searchForm.addEventListener('submit', onSearch);
