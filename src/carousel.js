class Carousel {
  constructor(values, {
    rootRefId, dimension = 'X', visibleItems = 5, activeItems = 3, scrollSpeed = 1000, scrollPerClick = 1,
  }) {
    // try{
    this.setValues(values);
    this.setSettings(rootRefId, dimension, visibleItems, activeItems, scrollSpeed, scrollPerClick);
    this.validateInitParams();
    this.init();
    // } catch (error) {
    //    console.log('Carousel creation is impossible with given attributes');
    // }
  }

  setValues = (values) => {
    if ((typeof (values)) === 'string') {
      this.values = parseValuesFromContainer(values);
    } else if ((typeof (values)) === 'object') {
      this.values = values;
    } else throw error;
  }

  setSettings = (rootRefId, dimension, visibleItems, activeItems, scrollSpeed, scrollPerClick) => {
    this.settings = {};
    this.settings.rootRefId = rootRefId;
    this.settings.dimension = dimension;
    this.settings.visibleItems = visibleItems;
    this.settings.activeItems = activeItems;
    this.settings.scrollSpeed = scrollSpeed;
    this.settings.scrollPerClick = scrollPerClick;
    if (this.initIsOver) {
      // this.updateSliderContainer(dimension);
      this.draw();
      // this.removeButtons();
      // this.drawButtons();
      this.addClickListeners();
    }
  }

  validateInitParams = () => {
    if (!this.settings.rootRefId
      || this.values.length === 0
      || this.settings.activeItems < 0
      || this.settings.visibleItems < 0
      || this.settings.scrollSpeed < 0
      || this.settings.scrollPerClick < 0) {
      throw new Error();
    }
  }

  init = () => {
    this.carouselId = Carousel.id + 1;
    Carousel.id += 1;

    this.translationComplete = true;
    this.index = 0;
    this.currTransl = [];

    // this.createSliderContainer();
    this.draw();

    for (let i = 0; i < this.values.length; i += 1) {
      this.currTransl[i] = 0;
      document.querySelector(`.slider${this.carouselId}`).querySelectorAll('.item')[i]
        .addEventListener('transitionend', this.transitionCompleted, true);
    }
    // this.drawButtons();
    this.addClickListeners();
    this.addSwipeListeners();
    this.initIsOver = true;
  }

  // disableButtons = () => {
  //   this.instanceRef.querySelector('.next').disabled = true;
  //   this.instanceRef.querySelector('.prev').disabled = true;
  // };

  // enableButtons = () => {
  //   this.instanceRef.querySelector('.next').disabled = false;
  //   this.instanceRef.querySelector('.prev').disabled = false;
  // };

  scroll = (direction) => {
    this.showAnimation();
    this.disableButtons();
    const timeToScroll = this.settings.scrollSpeed / this.settings.scrollPerClick;
    let scrollCount = 0;
    const obj = this;
    let timerId = setTimeout(function displayStep() {
      if (scrollCount === obj.settings.scrollPerClick) {
        obj.enableButtons();
        return;
      }
      scrollCount += 1;
      obj.offset += direction;
      obj.draw();
      timerId = setTimeout(displayStep, timeToScroll);
    }, timeToScroll);
  }

  // scrollNext = () => {
  //   this.scroll(-1);
  // };

  // scrollPrevious = () => {
  //   this.scroll(1);
  // };

  // showAnimation = () => {
  //   // const contentList = document.getElementById(this.settings.rootRefId).querySelectorAll('.content');
  //   // const contentArray = [...contentList];
  //   // contentArray.forEach((contentDiv) => {
  //   //   contentDiv.classList.add('animate');
  //   // });
  // };

  // formatIndexWithOffset = (indexWithOffset) => (indexWithOffset % this.values.length >= 0
  //   ? indexWithOffset % this.values.length
  //   : (indexWithOffset % this.values.length) + this.values.length);

  // isIndexItemActive = (index) => {
  //   const lastLowInactive = (this.settings.visibleItems - this.settings.activeItems) / 2 - 1;
  //   const firstHighInactive = (this.settings.visibleItems
  //      - (this.settings.visibleItems - this.settings.activeItems) / 2);
  //   return ((index > lastLowInactive) && (index < firstHighInactive));
  // };

  // getAllElementsMarkup = () => this.values
  //   .reduce((elementsMarkup, element, index, valuesArray) => {
  //     if (index < this.settings.visibleItems) {
  //       return (this.isIndexItemActive(index))
  //         ? `${elementsMarkup}<div class="content active">
  //       <img src="${valuesArray[this.formatIndexWithOffset(index + this.offset)].picture}" alt="">
  //       <h3>${valuesArray[this.formatIndexWithOffset(index + this.offset)].title}</h3>
  //       <p>${valuesArray[this.formatIndexWithOffset(index + this.offset)].description}</p>
  //     </div>`
  //         : `${elementsMarkup}<div class="content">
  //       <img src="${valuesArray[this.formatIndexWithOffset(index + this.offset)].picture}" alt="">
  //       <h3>${valuesArray[this.formatIndexWithOffset(index + this.offset)].title}</h3>
  //       <p>${valuesArray[this.formatIndexWithOffset(index + this.offset)].description}</p>
  //     </div>`;
  //     } return elementsMarkup;
  //   }, '');

  // getButtonsMarkup = () => `<div class="buttons">
  //   <button class="next">NEXT</button>
  //   <button class="prev">PREV</button>
  // </div>`;

  // createSliderContainer() {
  //   document.getElementById(this.settings.rootRefId).innerHTML = `<div class="slider${this.carouselId}"></div>`;
  //   // const slider = document.createElement('div');
  //   // slider.classList.add('slider');
  //   // slider.classList.add(`slider${this.carouselId}`);
  //   // if (this.settings.dimension === 'Y') {
  //   //   slider.classList.add('slider-y');
  //   // } else {
  //   //   slider.classList.add('slider-x');
  //   // }
  //   // document.getElementById(this.settings.rootRefId).appendChild(slider);
  // }

  // updateSliderContainer(newOrientation) {
  //   document.getElementById(this.settings.rootRefId).querySelector('.slider').classList.remove('slider-x', 'slider-y');
  //   document.getElementById(this.settings.rootRefId).querySelector('.slider').classList.add(`slider-${newOrientation.toLowerCase()}`);
  // }

  draw = () => {
    document.getElementById(this.settings.rootRefId).innerHTML += `<div class="container slider${this.carouselId}">
    <div class="visibleContainer">
      <div class="leftbox">
        <div class="rightbox">
          <div class="activeContainer animate">
            <div class="item animate">
              <img src="http://lorempixel.com/200/200/cats/1/" alt="">
              <h3>CAT #1</h3>
              <p>This cat is a nice one for sure </p>
            </div><div class="item animate">
              <img src="http://lorempixel.com/200/200/cats/2/" alt="">
              <h3>CAT #2</h3>
              <p>Not bad at all</p>
            </div><div class="item animate" >
              <img src="http://lorempixel.com/200/200/cats/3/" alt="">
              <h3>CAT #3</h3>
              <p>Huge and dangerous</p>
            </div><div class="item animate">
              <img src="http://lorempixel.com/200/200/cats/4/" alt="">
              <h3>CAT #5</h3>
              <p>Black and white, do u like it?</p>
            </div><div class="item animate">
              <img src="http://lorempixel.com/200/200/cats/5/" alt="">
              <h3>CAT #6</h3>
              <p>Black and white, do u like it?</p>
            </div><div class="item animate">
              <img src="https://placekitten.com/250/250" alt="">
              <h3>CAT #7</h3>
              <p>Black and white, do u like it?</p>
            </div><div class="item animate">
              <img src="https://placebear.com/240/240" alt="">
              <h3>CAT #8</h3>
              <p>Black and white, do u like it?</p>
            </div>
          </div>
        </div>
     </div>
    </div>
    <div class="buttons active">
      <button class="prev" id="prevSmooth">PREV</button>
      <button class="next" id="nextSmooth">NEXT</button>
    </div>
  </div>`;
  // this.instanceRef = document.querySelector(`.slider${this.carouselId}`);
    // this.slider = document.querySelector(`.slider${this.carouselId}`);
    // this.removeAllCarouselItems(slider);
    // slider.insertAdjacentHTML('afterbegin', this.getAllElementsMarkup());
  }

  // removeAllCarouselItems(slider) {
  //   while (slider.childNodes.length > 1) {
  //     slider.removeChild(slider.firstChild);
  //   }
  // }

  // drawButtons = () => {
  //   // this.instanceRef = document.querySelector(`.slider${this.carouselId}`);
  //   this.instanceRef.insertAdjacentHTML('beforeend', this.getButtonsMarkup());
  //   if (this.settings.dimension === 'Y') {
  //     this.instanceRef.querySelector('.next').classList.add('y');
  //     this.instanceRef.querySelector('.prev').classList.add('y');
  //   }
  // }

  // removeButtons() {
  //   this.instanceRef.removeChild(this.instanceRef.lastChild);
  // }

  addClickListeners = () => {
    document.querySelector(`.slider${this.carouselId}`).querySelector('#nextSmooth').addEventListener('click', this.scrollNext);
    document.querySelector(`.slider${this.carouselId}`).querySelector('#prevSmooth').addEventListener('click', this.scrollPrevious);
  }

  transitionCompleted = () => {
    this.translationComplete = true;
  }

  scrollNext = () => {
    if (this.translationComplete === true) {
      this.translationComplete = false;
      this.index -= 1;
      if (this.index === -1) {
        this.index = this.values.length - 1;
      }
      const outerIndex = (this.index) % this.values.length;
      for (let i = 0; i < this.values.length; i += 1) {
        const item = document.querySelector(`.slider${this.carouselId}`).querySelector('.activeContainer').getElementsByClassName('item')[i];
        item.style.opacity = '1';
        item.style.transform = `translate(${this.currTransl[i] + 200}px)`;
        this.currTransl[i] += 200;
      }
      const outerItem = document.querySelector(`.slider${this.carouselId}`).getElementsByClassName('item')[outerIndex];
      outerItem.style.transform = `translate(${this.currTransl[outerIndex] - 200 * (this.values.length)}px)`;
      outerItem.style.opacity = '0';
      this.currTransl[outerIndex] -= 200 * (this.values.length);
    }
  }

  scrollPrevious = () => {
    if (this.translationComplete === true) {
      this.translationComplete = false;
      this.index += 1;
      const outerIndex = (this.index - 1) % this.values.length;
      for (let i = 0; i < this.values.length; i += 1) {
        const item = document.querySelector(`.slider${this.carouselId}`).querySelector('.activeContainer').getElementsByClassName('item')[i];
        item.style.opacity = '1';
        item.style.transform = `translate(${this.currTransl[i] - 200}px)`;
        this.currTransl[i] -= 200;
      }
      const outerItem = document.querySelector(`.slider${this.carouselId}`).getElementsByClassName('item')[outerIndex];
      outerItem.style.opacity = '0';
      outerItem.style.transform = `translate(${this.currTransl[outerIndex] + 200 * (this.values.length)}px)`;
      this.currTransl[outerIndex] += 200 * (this.values.length);
    }
  }

  addSwipeListeners = () => {
    document.querySelector(`.slider${this.carouselId}`).addEventListener('touchstart', touchStartHandle, false);
    document.querySelector(`.slider${this.carouselId}`).addEventListener('touchmove', touchMoveHandle, false);

    let deltaX = null;
    let deltaY = null;

    function getTouches(event) {
      return event.touches || event.originalEvent.touches;
    }
    const obj = this;

    function touchStartHandle(event) {
      const firstTouch = getTouches(event)[0];
      deltaX = firstTouch.clientX;
      deltaY = firstTouch.clientY;
      event.preventDefault();
    }

    function touchMoveHandle(event) {
      if (!deltaX || !deltaY) {
        return;
      }

      const xUp = event.touches[0].clientX;
      const yUp = event.touches[0].clientY;

      const xDiff = deltaX - xUp;
      const yDiff = deltaY - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          if (obj.settings.dimension === 'X') {
            obj.scrollPrevious();
          }
          /* left swipe */
        } else {
          /* right swipe */
          if (obj.settings.dimension === 'X') {
            obj.scrollNext();
          }
        }
      } else if (yDiff > 0) {
        if (obj.settings.dimension === 'Y') {
          obj.scrollPrevious();
        }
        /* up swipe */
      } else {
        if (obj.settings.dimension === 'Y') {
          obj.scrollNext();
        }
        /* down swipe */
      }
      /* reset values */
      deltaX = null;
      deltaY = null;
    }
  }
}

function parseValuesFromContainer(values) {
  try {
    const element = document.getElementById(values);
    const childDivs = Array.from(element.getElementsByTagName('div'));

    return childDivs.reduce((valuesArray, currentDiv) => {
      const picture = currentDiv.getElementsByTagName('img')[0].getAttribute('src');
      const title = currentDiv.getElementsByTagName('h3')[0].innerHTML;
      const description = currentDiv.getElementsByTagName('p')[0].innerHTML;
      element.innerHTML = '';
      return [...valuesArray, { picture, title, description }];
    }, []);
  } catch (error) {
    console.log('We could not parse given template, try again');
    console.log(`${error.name} : ${error.message}`);
    throw error;
  }
}

Carousel.id = 0;

export { Carousel };
