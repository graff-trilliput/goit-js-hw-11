import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ApiPixabay } from './js/apiPixabay';
import { normalisedImages, checkLastPage, onScroll } from './js/utils';
import { createImagesItems } from './js/markup';

const apiPixabay = new ApiPixabay();
const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const btnLoadMoreRef = document.querySelector('.load-more');
formRef.addEventListener('submit', onFormSubmit);
btnLoadMoreRef.addEventListener('click', onBtnClick);
btnLoadMoreRef.disabled = true;

async function onFormSubmit(event) {
  event.preventDefault();
  apiPixabay.resetPage();
  btnLoadMoreRef.disabled = true;
  galleryRef.innerHTML = '';
  const value = event.target.elements.searchQuery.value.trim();
  if (!value) {
    return;
  }
  apiPixabay.setQuery(value);
  try {
    const {
      data: { totalHits, hits },
    } = await apiPixabay.getImages();
    if (!hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    apiPixabay.setTotalHits(totalHits);
    galleryRef.innerHTML = createImagesItems(normalisedImages(hits));
    lightbox.refresh();
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    if (checkLastPage(apiPixabay)) {
      btnLoadMoreRef.disabled = true;
    } else {
      btnLoadMoreRef.disabled = false;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function onBtnClick(event) {
  apiPixabay.incrementPage();
  try {
    const {
      data: { totalHits, hits },
    } = await apiPixabay.getImages();

    galleryRef.insertAdjacentHTML(
      'beforeend',
      createImagesItems(normalisedImages(hits))
    );
    lightbox.refresh();
    onScroll(galleryRef);
    if (checkLastPage(apiPixabay)) {
      btnLoadMoreRef.disabled = true;
    } else {
      btnLoadMoreRef.disabled = false;
    }
  } catch (error) {
    console.log(error.message);
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
