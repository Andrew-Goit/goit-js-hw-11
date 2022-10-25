// import axios from 'axios';
// import Notiflix from 'notiflix';
// const URL_AND_KEY = 'https://pixabay.com/api/?key=30826874-2b839a0aa57b08568fdc96116';

// export async function fetchPictures () {
//     try {
//       const response = await axios.get(`${URL_AND_KEY}`, {
//         params:{
//           q: form.elements.searchQuery.value,
//           image_type: 'photo',
//           orientation: 'horizontal',
//           safesearch: 'true',
//           page: `${page}`,
//           per_page: '40'
//         }
//       });
//       return response;
//     } catch (error) {
//       Notiflix.Notify.failure('Oops, error!');
//     }
//   }