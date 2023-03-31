import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const btnLoadMoreRef = document.querySelector('.load-more');
formRef.addEventListener('submit', onFormSubmit);
btnLoadMoreRef.addEventListener('click', onBtnClick);

function onFormSubmit(event) {
  event.preventDefault();
  const value = event.targert.elements.searchQuery.value.trim();
  if (!value) {
    return;
  }
}

function onBtnClick(event) {}
