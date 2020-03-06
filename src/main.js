/* eslint-disable import/extensions */
import { Carousel } from './carousel.js';

const firstCarousel = new Carousel([{
  picture: 'http://lorempixel.com/200/200/cats/1/',
  title: 'CAT #1',
  description: 'This cat is a nice one for sure ',
}, {
  picture: 'https://placebear.com/202/202',
  title: 'CAT #2',
  description: 'Not bad at all',
}, {
  picture: 'https://placekitten.com/280/280',
  title: 'CAT #3',
  description: 'Huge and dangerous',
}, {
  picture: 'https://placekitten.com/208/208',
  title: 'CAT #4',
  description: 'Black and white, do u like it?',
}, {
  picture: 'http://lorempixel.com/200/200/cats/2/',
  title: 'CAT #5',
  description: 'I wish i had a cat like this',
}, {
  picture: 'http://lorempixel.com/200/200/cats/3/',
  title: 'CAT #6',
  description: 'I wish i had a cat like this',
}, {
  picture: 'http://lorempixel.com/200/200/cats/4/',
  title: 'CAT #7',
  description: 'I wish i had a cat like this',
}], {
  rootRefId: 'placeForCarousel',
  dimension: 'X',
  visibleItems: 5,
  activeItems: 3,
  scrollSpeed: 2000,
  scrollPerClick: 1,
});

// setTimeout(() => {
//   firstCarousel.setSettings({
//     scrollSpeed: 3000, scrollPerClick: 1,
//   });
// }, 3000);


// const testCarousel2 = new Carousel([{
//   picture: 'https://placekitten.com/220/220',
//   title: 'CAT #1',
//   description: 'This cat is a nice one for sure ',
// }, {
//   picture: 'https://placekitten.com/202/202',
//   title: 'CAT #2',
//   description: 'Not bad at all',
// }, {
//   picture: 'https://placebear.com/205/205',
//   title: 'CAT #3',
//   description: 'Huge and dangerous',
// }, {
//   picture: 'https://placebear.com/208/208',
//   title: 'CAT #4',
//   description: 'Black and white, do u like it?',
// }, {
//   picture: 'https://placebear.com/215/215',
//   title: 'CAT #5',
//   description: 'I wish i had a cat like this',
// }], {
//   rootRefId: 'placeForCarousel2',
//   dimension: 'X',
//   visibleItems: 4,
//   activeItems: 2,
//   scrollSpeed: 1000,
//   scrollPerClick: 2,
// });

// const failCarousel = new Carousel([{
//   picture: 'https://placebear.com/220/220',
//   title: 'CAT #1',
//   description: 'This cat is a nice one for sure ',
// }, {
//   picture: 'https://placebear.com/202/202',
//   title: 'CAT #2',
//   description: 'Not bad at all',
// }, {
//   picture: 'https://placekitten.com/280/280',
//   title: 'CAT #3',
//   description: 'Huge and dangerous',
// }, {
//   picture: 'https://placekitten.com/208/208',
//   title: 'CAT #4',
//   description: 'Black and white, do u like it?',
// }, {
//   picture: 'https://placekitten.com/215/215',
//   title: 'CAT #5',
//   description: 'I wish i had a cat like this',
// }], {
//   rootRefId: 'placeForCarousel2',
//   dimension: 'X',
//   visibleItems: -5,
//   activeItems: -1,
//   scrollSpeed: 1000,
//   scrollPerClick: 2,
// });

// const testCarousel = new Carousel([{
//   picture: 'https://placebear.com/220/220',
//   title: 'CAT #1',
//   description: 'This cat is a nice one for sure ',
// }, {
//   picture: 'https://placebear.com/202/202',
//   title: 'CAT #2',
//   description: 'Not bad at all',
// }, {
//   picture: 'https://placekitten.com/280/280',
//   title: 'CAT #3',
//   description: 'Huge and dangerous',
// }, {
//   picture: 'https://placekitten.com/208/208',
//   title: 'CAT #4',
//   description: 'Black and white, do u like it?',
// }, {
//   picture: 'https://placekitten.com/215/215',
//   title: 'CAT #5',
//   description: 'I wish i had a cat like this',
// }], {
//   rootRefId: 'placeForCarousel',
//   dimension: 'X',
//   visibleItems: 5,
//   activeItems: 3,
//   scrollSpeed: 5000,
//   scrollPerClick: 5,
// });

const testCarousel4 = new Carousel('alreadyWithElementsFixed', {
  rootRefId: 'placeForCarousel3',
  visibleItems: 4,
  activeItems: 2,
});

// const testCarousel3 = new Carousel('alreadyWithElements', {
//   rootRefId: 'placeForCarousel3',
//   visibleItems: 4,
//   activeItems: 2,
// });
