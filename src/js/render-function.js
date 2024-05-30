import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imagesList = document.querySelector('.js-images-container');


let lightbox;

function imageTemplate(image) {
  return `<li class='image-gallery'>
    <a href="${image.largeImageURL}" class="gallery-list">
      <img src="${image.webformatURL}" 
           alt="${image.tags}" loading="lazy"
           class="gallery-link"/>
           </a>
      <div class="info-list">
        <p class="info-item"><b class info-title>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b class info-title>Views:</b> ${image.views}</p>
        <p class="info-item"><b class info-title>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b class info-title>Downloads:</b> ${image.downloads}</p>
      </div>
      </li>
      `;
}

function imagesTemplate(arr) {
  return arr.map(imageTemplate).join('');
}


export function addImage(images) {
  const createMarkup = imagesTemplate(images);
  imagesList.insertAdjacentHTML('beforeend', createMarkup);
 let lightbox = new SimpleLightbox('.gallery, a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}