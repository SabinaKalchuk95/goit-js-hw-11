import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';


const formData = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.disabled = input.value.trim() === '';

input.addEventListener('input', () => {
    submitBtn.disabled = input.value.trim() === '';
});



formData.addEventListener('submit', ev => {
  ev.preventDefault();
    const query = input.value.trim();
    if (query === '') {
        submitBtn.disabled = true; 
        return;
    }
    clearGallery();
    showLoader(); 
  getImagesByQuery(query)
      .then(data => {
          hideLoader();
          if (data.hits && data.hits.length > 0) {
              createGallery(data.hits);
          } else {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
          }

    })
      .catch(error => {
          iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight'
        });
          console.error(error);
          hideLoader();
        } );
});
hideLoader();