function parseValuesFromContainer(values){
  try{
    const element = document.getElementById(values);
    const childDivs = Array.from(element.getElementsByTagName('div'));

    return childDivs.reduce((valuesArray,currentDiv) => {
      const picture = currentDiv.getElementsByTagName('img')[0].getAttribute('src');
      const title = currentDiv.getElementsByTagName('h3')[0].innerHTML;
      const description = currentDiv.getElementsByTagName('p')[0].innerHTML;
      element.innerHTML = '';
      return [...valuesArray,{picture,title,description}];
    },[])
  } catch(error) {
      console.log('We could not parse given template, try again');
      console.log(`${error.name} : ${error.message}`);
      throw error;
  }
}

class Carousel{
  static id = 0;
  constructor(values, {rootRefId,dimension = 'X',visibleItems = 5, activeItems = 3, scrollSpeed = 1000, scrollPerClick = 1}){
    try{
      this.setValues(values);
      this.setSettings(rootRefId,dimension,visibleItems,activeItems,scrollSpeed,scrollPerClick);
      this.validateInitParams();
      this.init();
    } catch (error) {
       console.log('Carousel creation is impossible with given attributes');
    }
  }

  setValues = (values) => {
    if ((typeof (values)) === 'string') {
      this.values = parseValuesFromContainer(values);
    } else if ((typeof (values)) === 'object') {
      this.values = values;
    } else throw error;
  };

  setSettings = (rootRefId, dimension, visibleItems, activeItems, scrollSpeed, scrollPerClick) => {
    this.settings = {};
    this.settings.rootRefId = rootRefId;
    this.settings.dimension = dimension;
    this.settings.visibleItems = visibleItems;
    this.settings.activeItems = activeItems;
    this.settings.scrollSpeed = scrollSpeed;
    this.settings.scrollPerClick = scrollPerClick;
    if (this.initIsOver) {
      this.updateSliderContainer(dimension);
      this.draw();
      this.removeButtons();
      this.drawButtons();
      this.addClickListeners();
    }
  };

  validateInitParams = () => {
    if (!this.settings.rootRefId
      || this.values.length === 0
      || this.settings.activeItems < 0
      || this.settings.visibleItems < 0
      || this.settings.scrollSpeed < 0
      || this.settings.scrollPerClick < 0) {
      throw new Error();
    }
  };

  init(){
    this.carouselId = Carousel.id + 1;
    Carousel.id += 1;
    this.offset = 0;

    this.createSliderContainer();
    this.draw();
    this.drawButtons();
    this.addClickListeners();
    this.addSwipeListeners();
    this.initIsOver = true;
  }

  disableButtons = () => {
    this.instanceRef.querySelector('.next').disabled = true;
    this.instanceRef.querySelector('.prev').disabled = true;
  };

  enableButtons = () => {
    this.instanceRef.querySelector('.next').disabled = false;
    this.instanceRef.querySelector('.prev').disabled = false;
  };

  scroll = (direction) => {
    this.disableButtons();
    const timeToScroll = this.settings.scrollSpeed / this.settings.scrollPerClick;
    let scrollCount = 0;
    const obj = this;
    let timerId = setTimeout(function displayStep() {
      if (scrollCount === obj.settings.scrollPerClick) {
        obj.enableButtons();
        return;
      }
      obj.showAnimation();
      scrollCount += 1;
      obj.offset += direction;
      obj.draw();
      timerId = setTimeout(displayStep, timeToScroll);
    }, timeToScroll);
  };

  scrollNext = () => {
    this.scroll(-1);
  };

  scrollPrevious = () => {
    this.scroll(1);
  };

  showAnimation = () => {
    const contentList = document.getElementById(this.settings.rootRefId).querySelectorAll('.content');
    const contentArray = [...contentList];
    contentArray.forEach((contentDiv) => {
      contentDiv.classList.toggle('clicked');
    });
  };

  formatIndexWithOffset = (indexWithOffset) => (indexWithOffset % this.values.length >= 0
    ? indexWithOffset % this.values.length
    : (indexWithOffset % this.values.length) + this.values.length);

  isIndexItemActive = (index) => {
    const lastLowInactive = (this.settings.visibleItems - this.settings.activeItems) / 2 - 1;
    const firstHighInactive = (this.settings.visibleItems
       - (this.settings.visibleItems - this.settings.activeItems) / 2);
    return ((index > lastLowInactive) && (index < firstHighInactive));
  };

  getAllElementsMarkup = () => this.values
    .reduce((elementsMarkup, element, index, valuesArray) => {
      if (index < this.settings.visibleItems) {
        return (this.isIndexItemActive(index))
          ? `${elementsMarkup}<div class="content active">
        <img src="${valuesArray[this.formatIndexWithOffset(index + this.offset)].picture}" alt="">
        <h3>${valuesArray[this.formatIndexWithOffset(index + this.offset)].title}</h3>
        <p>${valuesArray[this.formatIndexWithOffset(index + this.offset)].description}</p>
      </div>`
          : `${elementsMarkup}<div class="content">
        <img src="${valuesArray[this.formatIndexWithOffset(index + this.offset)].picture}" alt="">
        <h3>${valuesArray[this.formatIndexWithOffset(index + this.offset)].title}</h3>
        <p>${valuesArray[this.formatIndexWithOffset(index + this.offset)].description}</p>
      </div>`;
      } return elementsMarkup;
    }, '');

  getButtonsMarkup = () => `<div class="buttons">
    <button class="next">NEXT</button>
    <button class="prev">PREV</button>
  </div>`;

  createSliderContainer() {
    const slider = document.createElement('div');
    slider.classList.add('slider');
    slider.classList.add(`slider${this.carouselId}`);
    if (this.settings.dimension === 'Y') {
      slider.classList.add('slider-y');
    } else {
      slider.classList.add('slider-x');
    }
    document.getElementById(this.settings.rootRefId).appendChild(slider);
  }

  updateSliderContainer(newOrientation) {
    document.getElementById(this.settings.rootRefId).querySelector('.slider').classList.remove('slider-x', 'slider-y');
    document.getElementById(this.settings.rootRefId).querySelector('.slider').classList.add(`slider-${newOrientation.toLowerCase()}`);
  }

  draw() {
    const slider = document.querySelector(`.slider${this.carouselId}`);
    this.removeAllCarouselItems(slider);
    slider.insertAdjacentHTML('afterbegin', this.getAllElementsMarkup());
  }

  removeAllCarouselItems(slider) {
    while (slider.childNodes.length > 1) {
      slider.removeChild(slider.firstChild);
    }
  }

  drawButtons() {
    this.instanceRef = document.querySelector(`.slider${this.carouselId}`);
    this.instanceRef.insertAdjacentHTML('beforeend', this.getButtonsMarkup());
    if (this.settings.dimension === 'Y') {
      this.instanceRef.querySelector('.next').classList.add('y');
      this.instanceRef.querySelector('.prev').classList.add('y');
    }
  }

  removeButtons() {
    this.instanceRef.removeChild(this.instanceRef.lastChild);
  }

  addClickListeners() {
    this.instanceRef.querySelector('.next').addEventListener('click', this.scrollNext);
    this.instanceRef.querySelector('.prev').addEventListener('click', this.scrollPrevious);
  }

  addSwipeListeners = () => {
    this.instanceRef.addEventListener('touchstart', touchStartHandle, false);
    this.instanceRef.addEventListener('touchmove', touchMoveHandle, false);

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
  };
}

export { Carousel };
