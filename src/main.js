/* eslint-disable import/extensions */
import { Carousel } from './carousel.js';

const firstCarousel = new Carousel([{
  picture: 'https://placebear.com/220/220',
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
  picture: 'https://placekitten.com/215/215',
  title: 'CAT #5',
  description: 'I wish i had a cat like this',
}], {
  rootRefId: 'placeForCarousel',
  dimension: 'X',
  visibleItems: 5,
  activeItems: 2,
  scrollSpeed: 2000,
  scrollPerClick: 5,
});

const testCarousel2 = new Carousel([{
  picture: 'https://placekitten.com/220/220',
  title: 'CAT #1',
  description: 'This cat is a nice one for sure ',
}, {
  picture: 'https://placekitten.com/202/202',
  title: 'CAT #2',
  description: 'Not bad at all',
}, {
  picture: 'https://placebear.com/205/205',
  title: 'CAT #3',
  description: 'Huge and dangerous',
}, {
  picture: 'https://placebear.com/208/208',
  title: 'CAT #4',
  description: 'Black and white, do u like it?',
}, {
  picture: 'https://placebear.com/215/215',
  title: 'CAT #5',
  description: 'I wish i had a cat like this',
}], {
  rootRefId: 'placeForCarousel2',
  dimension: 'Y',
  visibleItems: 4,
  activeItems: 4,
  scrollSpeed: 1000,
  scrollPerClick: 2,
});

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

// const testCarousel4 = new Carousel('alreadyWithElementsFixed', {
//   rootRefId: 'placeForCarousel3',
//   visibleItems: 4,
//   activeItems: 2,
// });

const testCarousel3 = new Carousel('alreadyWithElements', {
  rootRefId: 'placeForCarousel3',
  visibleItems: 4,
  activeItems: 2,
});
