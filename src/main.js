import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImages } from './js/pixabay-api.js';
import { addImage } from './js/render-function.js';


const formElem = document.querySelector('.images-form');
const loader = document.querySelector('.loader');
const imagesList = document.querySelector('.js-images-container');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let query = '';
let totalPages = 0;



loadMoreButton.addEventListener('click', handleUpdate);
formElem.addEventListener('submit', async event => {
    event.preventDefault();
    hideloadMoreButton();
    imagesList.innerHTML = '';
    showLoader();
    
    const query = event.target.elements.query.value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query',
        });
        hideLoader();
        return;
    }
    
    
    
    try {
        currentPage = 1;
        const data = await searchImages(query, currentPage);
        if (data.hits.length > 0) {
            addImage(data.hits);
            totalPages = Math.ceil(data.totalHits / 15);
            checkloadMoreButton();
        
        } else {
                throw Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
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

async function handleUpdate() {
  showLoader();
  hideloadMoreButton();

    try {
    currentPage += 1;
    const data = await searchImages(query, currentPage);
    if (data.hits.length > 0) {
      addImage(data.hits);
        checkloadMoreButton();
     const cardHeight = document
    .querySelector('.js-images-container')
    .getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });   
     
        return
        
    } else {
        throw new Error("We're sorry, there are no more posts to load");
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}


  
function checkloadMoreButton() {
    if (totalPages > currentPage) {
        showloadMoreButton();
    } else {
        hideloadMoreButton();
        iziToast.error({
            title: 'Error',
            message: "We're sorry, but you've reached the end of search results.",
        });
    }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}



function showloadMoreButton() {
  loadMoreButton.classList.remove('hidden');
}

function hideloadMoreButton() {
    loadMoreButton.classList.add('hidden');
}


