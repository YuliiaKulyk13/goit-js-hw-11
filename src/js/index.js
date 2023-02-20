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

function onSearch(e) {
  e.preventDefault();

  // if (PixabayApiService.query !== searchInput.value.trim()) {
  //   console.log(PixabayApiService.query !== searchInput.value.trim());
  //   PixabayApiService.resetPage();
  // }

  PixabayApiService.query = searchInput.value;

  if (PixabayApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    PixabayApiService.resetPage();
    clearContainer();
    return;
  } else {
    PixabayApiService.fetchPictures().then(appendImagesMarkup);
    appendImagesMarkup(hits);
    PixabayApiService.resetPage();
    PixabayApiService.incrementPage();
    observer.observe(sentinel);

    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }

  // PixabayApiService.fetchPictures().then(hits => {
  //   clearContainer();
  //   appendImagesMarkup(hits);
}

// if (!PixabayApiService.query) {
//   return;
// }
//   PixabayApiService.resetPage();
//   PixabayApiService.fetchPictures().then(data => {
//     if (data.length === 0 || PixabayApiService.query === '') {
//
//       PixabayApiService.resetPage();
//       clearContainer();
//       return;
//
//

function appendImagesMarkup(hits) {
  const galleryItem = hits
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
      console.log('Loading more');
      PixabayApiService.incrementPage();
      PixabayApiService.fetchPictures().then(appendImagesMarkup);
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
