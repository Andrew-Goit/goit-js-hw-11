import card from './templates/card.hbs'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import {fetchPictures} from "./fetchPictures.js"
const axios = require('axios').default;
const gallery = document.querySelector('.gallery');
const btnMore=document.querySelector('[type="button"]')
const form = document.querySelector('.search-form');
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
const URL_AND_KEY = 'https://pixabay.com/api/?key=30826874-2b839a0aa57b08568fdc96116';

let page = 1;

form.addEventListener('submit', onSubmitBtnClick);
btnMore.addEventListener('click', onBtnMoreClick);
 
async function fetchPictures() {
  try {
    const response = await axios.get(`${URL_AND_KEY}`, {
      params:{
        q: form.elements.searchQuery.value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: `${page}`,
        per_page: '40'
      }
    });
    return response;
  } catch (error) {
    Notiflix.Notify.failure('Oops, error!');
  }
}
   
function createGallery(response) {
  gallery.insertAdjacentHTML('beforeend', response.data.hits.map(card).join(''));
  lightbox.refresh();
    if (response.data.hits.length < 40 && response.data.hits.length !== 0||page===13) {
      btnMore.classList.replace('load-more', 'visually-hidden');
      setTimeout(() => {
        Notiflix.Notify.info("Were sorry, but you've reached the end of search results.");
      }, 1000);
    }
}

function checkAndAddImg (response) {
  if (response.data.totalHits === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } else {
      Notiflix.Notify.success(`SHooray! We found ${response.data.totalHits} images.`);
      btnMore.classList.replace('visually-hidden', 'load-more');
    };
  createGallery(response)
}
  
function morePages(response) {
  createGallery(response)
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}
  
function onSubmitBtnClick(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  
  btnMore.classList.replace('load-more', 'visually-hidden');
  page = 1;
  if (form.elements.searchQuery.value.trim() === '') {
    return;
  }
  fetchPictures().then(response => checkAndAddImg(response))
  .catch(error => console.log(error))
}

function onBtnMoreClick () {
  page +=1;
  fetchPictures().then(response => morePages(response))
  .catch(error => console.log(error)) 
}


