import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImages } from './js/pixabay-api';
import { addImage } from './js/render-function';

const formElem = document.querySelector('.images-form');
const loader = document.querySelector('.loader');
const imagesList = document.querySelector('.js-images-container');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
const limit = 15; 
let totalPages = 0;

formElem.addEventListener('submit', async event => {
  event.preventDefault();
  imagesList.innerHTML = '';
  currentQuery = event.target.elements.query.value.trim();
  currentPage = 1;

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
    return;
  }

  showLoader();

  try {
    const data = await searchImages(currentQuery, currentPage, limit);
    if (data.hits.length > 0) {
      totalPages = Math.ceil(data.totalHits / limit);
      addImage(data.hits);
      checkLoadMoreBtn();
    } else {
      iziToast.warning({
        title: 'Warning',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  } finally {
    hideLoader();
  }

  formElem.reset();
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await searchImages(currentQuery, currentPage, limit);
    if (data.hits.length > 0) {
      addImage(data.hits);
      checkLoadMoreBtn();
      smoothScroll();
    } else {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  } finally {
    hideLoader();
  }
});

function checkLoadMoreBtn() {
  if (currentPage >= totalPages) {
    loadMoreButton.style.display = 'none';
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    loadMoreButton.style.display = 'block';
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.js-images-container')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}