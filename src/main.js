/* eslint-disable import/extensions */
import { Carousel } from './carousel.js';

const testCarousel = new Carousel([{
  picture: 'https://placebear.com/220/220',
  title: 'CAT #1',
  description: 'This cat is a nice one for sure ',
}, {
  picture: 'https://placebear.com/202/202',
  title: 'CAT #2',
  description: 'Not bad at all',
}, {
  picture: 'https://placekitten.com/205/205',
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
  visibleItems: 3,
  activeItems: 1,
  scrollSpeed: 1000,
  scrollPerClick: 1,
});

// const testCarousel2 = new Carousel([], {
//   rootRefId: 'placeForCarousel#2',
//   dimension: 'X',
//   visibleItems: 3,
//   activeItems: 1,
//   scrollSpeed: 1000,
//   scrollPerClick: 1,
// });
