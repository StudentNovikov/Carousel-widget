/* eslint-disable import/extensions */
import { Carousel } from './carousel.js';

const testCarousel = new Carousel([{
  picture: 'https://placekitten.com/200/200',
  title: 'CAT #1',
  description: 'This cat is a nice one for sure',
}, {
  picture: 'https://placekitten.com/202/202',
  title: 'CAT #2',
  description: 'Not bad at all',
}, {
  picture: 'https://placekitten.com/205/205',
  title: 'CAT #3',
  description: 'Huge and dangerous',
}, {
  picture: 'https://placekitten.com/207/207',
  title: 'CAT #4',
  description: 'Black and white, do u like it?',
}, {
  picture: 'https://placekitten.com/210/210',
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

const testCarousel2 = new Carousel([], {
  rootRefId: 'placeForCarousel#2',
  dimension: 'X',
  visibleItems: 3,
  activeItems: 1,
  scrollSpeed: 1000,
  scrollPerClick: 1,
});

document.addEventListener('DOMContentLoaded', alert('On the top is an example of a carousel, on the bottom in dotted border is the current realisation ( both super weak atm)!'));
