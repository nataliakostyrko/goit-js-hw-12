import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImages } from './js/pixabay-api.js';
import { addImage } from './js/render-function.js';


const formElem = document.querySelector('.images-form');
const loader = document.querySelector('.loader');
const imagesList = document.querySelector('.js-images-container');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let query;

loadMoreButton.addEventListener('click', handleUpdate);
formElem.addEventListener('submit', async event => {
    event.preventDefault();
    imagesList.innerHTML = '';
    
    const query = event.target.elements.query.value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query',
        });
        return;
    }
    loader.classList.remove('hidden');
    loader.classList.add('hidden');
    showLoader();
    
    try {
        const data = await searchImages(guery, currentPage);
   
        if (data.hits.length > 0) {
            addImage(data.hits);
            loadMoreButton.style.display = 'block';
        } else {
            iziToast.warning({
                title: 'Warning',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            }, 2000);
            hideLoader();
        }

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: error.message,
        });
    } finally {
         loader.classList.add('hidden');  
        
 } 
    formElem.reset();
   
});




function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

