import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImages } from './js/pixabay-api';
import { addImage } from './js/render-function';

const formElem = document.querySelector('.images-form');
const loader = document.querySelector('.loader');
const imagesList = document.querySelector('.js-images-container');
const loadMoreBtn = document.querySelector('.load-more');



let currentPage = 1;
let currentQuery = '';
let totalPages = 0;

formElem.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideLoadMoreBtn();
  currentPage = 1;
  imagesList.innerHTML = '';
  currentQuery = event.target.elements.query.value.trim();
 

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
    
  }

 showLoader();
  try {
   
    const data = await searchImages(currentQuery, currentPage);
    if (data.hits.length > 0) {
      totalPages = Math.ceil(data.totalHits / 15);
      addImage(data.hits);
      checkLoadMoreBtn();
    
    } else {
      iziToast.warning({
        title: 'Warning',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
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

loadMoreBtn.addEventListener('click', async () => {
 
  showLoader();
  hideLoadMoreBtn();


  try {
     currentPage += 1;
    const data = await searchImages(currentQuery, currentPage);
    
    if (data.hits.length > 0) {
      addImage(data.hits);
      checkLoadMoreBtn();


    const { height: cardHeight } = document
        .querySelector('.js-images-container')
        .firstElementChild.getBoundingClientRect();

    } else {
       throw new Error("We're sorry, there are no more posts to load");
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
   hideLoadMoreBtn();
    if (totalPages > 0 && currentPage === totalPages) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } else {
    showLoadMoreBtn();
  }
}
  




function showLoader() {
  loader.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}