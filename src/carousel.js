class Carousel {
  constructor(values, {
    rootRefId, dimension = 'X', visibleItems = 5, activeItems = 3, scrollSpeed = 1000, scrollPerClick = 1,
  }) {
    // try{
    this.setValues(values);
    this.settings = {};
    this.setSettings({rootRefId, dimension, visibleItems, activeItems, scrollSpeed, scrollPerClick});
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

  setSettings = (newSettings) => {
    Object.keys(newSettings).forEach(key => this.settings[key] = newSettings[key]);
    if (this.initIsOver) {
      this.draw();
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

    this.draw();

    for (let i = 0; i < this.values.length; i += 1) {
      this.currTransl[i] = 0;
      document.querySelector(`.slider${this.carouselId}`).querySelectorAll('.item')[i]
        .addEventListener('transitionend', this.transitionCompleted, true);
    }
    this.addClickListeners();
    this.addSwipeListeners();
    this.initIsOver = true;
  }

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

  draw = () => {
    const itemsTemplate = this.values.reduce((carouselMarkup,element) => {
      return carouselMarkup + `<div class="item" style="transition: transform ${this.settings.scrollSpeed}ms, opacity 0s;">
      <img src="${element.picture}" alt="">
      <h3>${element.title}</h3>
      <p>${element.description}</p>
    </div>`;
    },'');

    document.getElementById(this.settings.rootRefId).innerHTML = `<div class="container slider${this.carouselId}">
    <div class="visibleContainer">
      <div class="leftbox">
        <div class="rightbox">
          <div class="activeContainer">${itemsTemplate}</div>
        </div>
       </div>
      </div>
      <div class="buttons">
        <button class="prev" id="prevSmooth">PREV</button>
        <button class="next" id="nextSmooth">NEXT</button>
      </div>
    </div>`;
    this.updateCarouselView();
  }

  updateCarouselView = () => {
  }

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
