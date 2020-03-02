# Carousel-widget
DESCRIPTION:
This library gives you an opportunity to create a carousel widget with listed functionality:
  - Widget is able to work in X or Y dimensions.
  - Widget is able to initialize with passed objects (pictureUrl, title, description) or could be applied on exact                  markup container.
  - Widget works well both on touch screens and with pointers.
  - Widget has got side arrow buttons for pointer interaction as well.
  - Widget is configurable:
    - Count of visible/active items
    - Speed of scroll
    - Count of scrollable items per arrow click
    - Infinitive scroll
    - Direction of scroll ( x / y )
  - All items, outside of the ‘active’ zone and still visible (partially opaque).
  - You can use multiple widgets on the same page.

To create a widget import Carousel from carousel.js : 
  
  import { Carousel } from './carousel.js';

Then create a carousel with values and settings:
  
  const firstCarousel = new Carousel(values, settings);

Where values is an array with values , settings is an object with settings. 
---------------------------------------------------------------------------
Values format: 
  const values = [{
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
}]

  Array of objects, each of them having picture, title and description fields.

Settings format: 
  const settings = {
  rootRefId: 'placeForCarousel',
  dimension: 'X',
  visibleItems: 5,
  activeItems: 3,
  scrollSpeed: 2000,
  scrollPerClick: 1,
});

  Object with fields: 
    "rootRefId" - required, Id of a dom element, where you want to inject the carousel
    "dimension" - "X" or "Y" , default - X (horizontal)
    "visibleItems" - number of visible items on a screen (default = 5)
    "activeItems" - number of non-opaque items on a screen (default = 3)
    "scrollSpeed" - time of a full slide of a carousel (default = 1000)
    "scrollPerClick" - number of scrolls per click (default = 1)

-----------------------------------------------------------

Also you can create a carousel from a template. You should provide an id of an element of a page, which you expect to get converted into a carousel.

How to use it: 
  const testCarousel4 = new Carousel('rootIdOfATemplate', settings);

We expect that a template contains a div with nested divs, where every div has next structure: 

  <div id="alreadyWithElementsFixed" class="container">
      <div>
        <img src="https://placebear.com/245/245" alt="">
        <h3>#1</h3>
        <p>this is a topic#1</p>
      </div>
      <div>
        <img src="https://placekitten.com/260/260" alt="">
        <h3>#2</h3>
        <p>this is a topic#2</p>
      </div>
      <div>
        <img src="https://placebear.com/270/270" alt="">
        <h3>#3</h3>
        <p>this is a topic#3</p>
      </div>
      <div>
        <img src="https://placekitten.com/299/299" alt="">
        <h3>#4</h3>
        <p>this is a topic#4</p>
      </div>
      <div>
        <img src="https://placebear.com/215/215" alt="">
        <h3>#5</h3>
        <p>this is a topic#5</p>
      </div>
    </div>

Div --> [ div with img, h3, p ]

If some settings are not valid, you will get an error in a console.
Gl, and feel free to contact me if something does not work
